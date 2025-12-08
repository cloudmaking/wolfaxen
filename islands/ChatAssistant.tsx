import { useEffect, useRef, useState } from "preact/hooks";

interface SubmittedData {
  name: string;
  email: string;
  company: string;
  challenges?: string;
}

interface UserContext {
  name?: string;
  email?: string;
  company?: string;
  userId?: string;
}

interface Message {
  role: "user" | "model";
  text: string;
}

interface ChatHistoryItem {
  role: "user" | "model";
  parts: { text: string }[];
}

export default function ChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userContext, setUserContext] = useState<UserContext | null>(null);
  const [draftData, setDraftData] = useState<SubmittedData | null>(null);
  const [submittedData, setSubmittedData] = useState<SubmittedData | null>(
    null,
  );
  const [hasSubmittedBefore, setHasSubmittedBefore] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Chat history for the API (includes system prompt context implicitly via first message modification on server if needed,
  // but strictly we just maintain the conversation turns here)
  const [history, setHistory] = useState<ChatHistoryItem[]>([]);

  useEffect(() => {
    // Check for previous submission
    if (localStorage.getItem("wolfaxen_inquiry_submitted") === "true") {
      setHasSubmittedBefore(true);
    }
    loadUserContext();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, draftData, submittedData, isRecording]);

  const loadUserContext = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (!res.ok) return;
      const data = await res.json();
      const profile = data.profile || {};
      const session = data.session || {};
      const ctx: UserContext = {
        name: profile.full_name || profile.name || session.user?.email,
        email: profile.email || session.user?.email,
        company: (profile as any).company || "",
        userId: session.user?.id,
      };
      setUserContext(ctx);
    } catch (err) {
      console.warn("User context fetch failed", err);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        await handleTranscription(audioBlob);

        // Stop all tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      // Optional: show error toast
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsTranscribing(true);
    }
  };

  const handleTranscription = async (audioBlob: Blob) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64Audio = (reader.result as string).split(",")[1];

        const response = await fetch("/api/transcribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ audio: base64Audio }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.text) {
            setInput((prev) =>
              (prev ? prev + " " + data.text : data.text).trim()
            );
          }
        } else {
          console.error("Transcription failed");
        }
        setIsTranscribing(false);
        if (inputRef.current) inputRef.current.focus();
      };
    } catch (err) {
      console.error("Error processing audio:", err);
      setIsTranscribing(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    setIsLoading(true);

    const newMessages: Message[] = [...messages, {
      role: "user",
      text: userMsg,
    }];
    setMessages(newMessages);

    // Prepare history for API
    // We send the current history PLUS the new user message is handled by the API usually,
    // but here we are sending the *past* history and the *new* message separately or combined.
    // The API implementation at /api/chat expects body: { history, message, userContext }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          history: history,
          message: userMsg,
          userContext: messages.length === 0 ? userContext : undefined, // Only send context on first turn to avoid repetition
        }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Update history with the response (API returns updated history or we reconstruct it)
      // The API returns { text, functionCalls, history }

      if (data.history) {
        setHistory(data.history);
      }

      // Add model response to UI
      const modelText = data.text || "";
      if (modelText) {
        setMessages((prev) => [...prev, { role: "model", text: modelText }]);
      }

      // Handle function calls
      if (data.functionCalls && data.functionCalls.length > 0) {
        for (const call of data.functionCalls) {
          const { name, args } = call;
          if (name === "previewInquiry") {
            setDraftData(args as SubmittedData);
          } else if (name === "submitInquiry") {
            handleFinalSubmission(args);
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((
        prev,
      ) => [...prev, {
        role: "model",
        text: "Sorry, I encountered an error. Please try again.",
      }]);
    } finally {
      setIsLoading(false);
      // focus input again
      if (inputRef.current) inputRef.current.focus();
    }
  };

  const handleFinalSubmission = async (args: any) => {
    try {
      const payload = {
        source: "chat_ai_assistant",
        name: args.name,
        email: args.email,
        company: args.company,
        message: args.challenges,
        transcript: args.transcript,
        summary: args.summary,
        user_id: userContext?.userId || null,
      };

      const response = await fetch("/api/leads/unqualified", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmittedData(args);
        localStorage.setItem("wolfaxen_inquiry_submitted", "true");
        // Best effort profile update
        if (userContext?.userId && args.company) {
          try {
            await fetch("/api/profile/update", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: args.name,
                company: args.company,
                email: args.email,
              }),
            });
          } catch { /* ignore */ }
        }
      } else {
        // Handle error (e.g. existing map)
        const errorText = await response.text();
        try {
          const errorJson = JSON.parse(errorText);
          if (errorJson.code === "EXISTING_MAP") {
            setHasSubmittedBefore(true);
            setMessages((
              prev,
            ) => [...prev, {
              role: "model",
              text:
                "It seems you already have a process map! Please check your dashboard or email support.",
            }]);
            return;
          }
        } catch {}
        setMessages((
          prev,
        ) => [...prev, {
          role: "model",
          text: "There was an issue submitting your inquiry. Please try again.",
        }]);
      }
    } catch (e) {
      console.error("Submission error", e);
      setMessages((
        prev,
      ) => [...prev, {
        role: "model",
        text: "Network error during submission.",
      }]);
    }
  };

  const handleConfirm = () => {
    // Simulate user saying "Yes" to trigger the submission logic in the AI flow
    // But actually, since we are in a custom flow, we can just send "Yes, looks good" to the chat API
    // to let the AI trigger the 'submitInquiry' tool.
    setInput("Yes, looks good.");
    // We manually call handleSend after state update would require a useEffect or just calling logic directly.
    // Easiest is to just call the API with the message manually.
    handleSendDirect("Yes, looks good.");
  };

  const handleEdit = () => {
    setInput("I need to change something.");
    if (inputRef.current) inputRef.current.focus();
  };

  const handleSendDirect = async (msg: string) => {
    setIsLoading(true);
    const newMessages: Message[] = [...messages, { role: "user", text: msg }];
    setMessages(newMessages);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          history: history,
          message: msg,
        }),
      });
      const data = await res.json();
      if (data.history) setHistory(data.history);
      if (data.text) {
        setMessages((prev) => [...prev, { role: "model", text: data.text }]);
      }
      if (data.functionCalls) {
        for (const call of data.functionCalls) {
          if (call.name === "previewInquiry") {
            setDraftData(call.args as SubmittedData);
          } else if (call.name === "submitInquiry") {
            handleFinalSubmission(call.args);
          }
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  if (submittedData) {
    return (
      <div class="w-full max-w-2xl mx-auto bg-deep-olive/10 border border-deep-olive/30 rounded-2xl p-8 text-center animate-fade-in">
        <div class="w-16 h-16 bg-deep-olive/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-deep-olive/30">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="text-light-gold w-8 h-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </div>
        <h3 class="text-2xl font-display font-bold text-warm-beige mb-2">
          Inquiry Received
        </h3>
        <p class="text-warm-beige/70 mb-6 max-w-md mx-auto">
          Thanks, {submittedData.name}. We've noted your challenges at{" "}
          <span class="text-white">{submittedData.company}</span>{" "}
          and will send a preliminary strategy to{" "}
          <span class="text-white">{submittedData.email}</span> shortly.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmittedData(null);
            setMessages([]);
            setHistory([]);
            setDraftData(null);
          }}
          class="text-sm font-medium text-muted-gold hover:text-light-gold transition-colors uppercase tracking-wider"
        >
          Start New Chat
        </button>
      </div>
    );
  }

  if (hasSubmittedBefore && !submittedData) {
    return (
      <div class="w-full max-w-2xl mx-auto text-center animate-fade-in py-12">
        <div class="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 text-muted-gold border border-white/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-10 h-10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>
        <h4 class="text-xl font-display font-bold text-warm-beige mb-3">
          We've received your inquiry.
        </h4>
        <p class="text-warm-beige/60 mb-6 max-w-sm mx-auto leading-relaxed">
          To follow up or provide more details, please email us directly.
        </p>
        <a
          href="mailto:info@wolfaxen.com"
          class="text-muted-gold hover:text-white font-bold underline decoration-muted-gold/50 hover:decoration-white transition-all"
        >
          info@wolfaxen.com
        </a>
        <button
          onClick={() => setHasSubmittedBefore(false)}
          class="block mx-auto mt-6 text-xs text-white/30 hover:text-white transition-colors"
        >
          Start a new chat anyway
        </button>
      </div>
    );
  }

  return (
    <div class="w-full max-w-2xl mx-auto bg-white/5 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/10 font-sans relative flex flex-col h-[600px]">
      {/* Header */}
      <div class="bg-oreo-black/80 p-4 flex justify-between items-center border-b border-white/5 relative z-10">
        <div>
          <h3 class="text-lg font-display font-bold text-warm-beige flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse">
            </span>
            Wolfaxen AI Assistant
          </h3>
          <p class="text-warm-beige/60 text-xs mt-0.5">
            Discuss your automation needs
          </p>
        </div>
      </div>

      {/* Messages Area */}
      <div class="flex-1 overflow-y-auto p-6 space-y-4" ref={scrollRef}>
        {messages.length === 0 && (
          <div class="text-center text-warm-beige/40 text-sm mt-20">
            <p>
              Hello! I'm Flow. I can help you map your processes and find
              bottlenecks.
            </p>
            <p class="mt-2">
              What is the biggest challenge in your workflow right now?
            </p>
            <div class="mt-4 text-xs opacity-60">
              <p>
                Tip: You can use the microphone button below to speak your mind.
              </p>
            </div>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            class={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              class={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-muted-gold/20 text-warm-beige rounded-br-none border border-muted-gold/10"
                  : "bg-white/5 text-warm-beige/90 rounded-bl-none border border-white/10"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isLoading && (
          <div class="flex justify-start">
            <div class="bg-white/5 text-warm-beige/90 rounded-2xl rounded-bl-none px-4 py-3 border border-white/10">
              <div class="flex gap-1">
                <span
                  class="w-1.5 h-1.5 bg-warm-beige/40 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                >
                </span>
                <span
                  class="w-1.5 h-1.5 bg-warm-beige/40 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                >
                </span>
                <span
                  class="w-1.5 h-1.5 bg-warm-beige/40 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                >
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Card (Draft Data) */}
        {!submittedData && draftData && (
          <div class="bg-white/5 border border-white/10 rounded-2xl p-5 mt-4 mx-4 animate-fade-in group hover:border-muted-gold/30 transition-colors">
            <h4 class="text-muted-gold font-display font-bold mb-3 flex items-center gap-2 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              Please Confirm Inquiry Details
            </h4>
            <div class="space-y-2 text-xs">
              <div class="grid grid-cols-[80px_1fr] gap-2">
                <span class="text-warm-beige/60">Name:</span>
                <span class="text-white font-medium">{draftData.name}</span>
              </div>
              <div class="grid grid-cols-[80px_1fr] gap-2">
                <span class="text-warm-beige/60">Company:</span>
                <span class="text-white font-medium">{draftData.company}</span>
              </div>
              <div class="grid grid-cols-[80px_1fr] gap-2">
                <span class="text-warm-beige/60">Email:</span>
                <span class="text-white font-medium">{draftData.email}</span>
              </div>
              <div class="grid grid-cols-[80px_1fr] gap-2">
                <span class="text-warm-beige/60">Challenges:</span>
                <span class="text-white/90 italic">
                  "{draftData.challenges}"
                </span>
              </div>
            </div>
            <div class="flex gap-3 mt-4">
              <button
                onClick={handleConfirm}
                class="flex-1 bg-muted-gold hover:bg-light-gold text-oreo-black font-bold py-2 px-4 rounded-lg text-xs transition-colors"
              >
                Confirm & Submit
              </button>
              <button
                onClick={handleEdit}
                class="flex-1 bg-white/5 hover:bg-white/10 text-warm-beige font-medium py-2 px-4 rounded-lg text-xs border border-white/10 transition-colors"
              >
                Edit
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Overlay for Recording */}
      {isRecording && (
        <div class="absolute bottom-20 left-4 right-4 bg-oreo-black/90 backdrop-blur-md rounded-2xl p-4 border border-muted-gold/30 flex items-center justify-between animate-fade-in z-20">
          <div class="flex items-center gap-3">
            <div class="relative w-3 h-3">
              <span class="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping">
              </span>
              <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500">
              </span>
            </div>
            <span class="text-white text-sm font-mono animate-pulse">
              Recording...
            </span>
          </div>
          {/* Fake visualizer bars */}
          <div class="flex items-end gap-0.5 h-6">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                class="w-1 bg-muted-gold rounded-t animate-pulse"
                style={{
                  height: `${Math.random() * 100}%`,
                  animationDuration: `${200 + Math.random() * 300}ms`,
                }}
              >
              </div>
            ))}
          </div>
          <button
            onClick={stopRecording}
            class="bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1.5 rounded-lg transition-colors"
          >
            Stop & Transcribe
          </button>
        </div>
      )}

      {/* Input Area */}
      <div class="p-4 bg-oreo-black/50 border-t border-white/5 backdrop-blur-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          class="flex gap-2 items-end"
        >
          {/* Mic Button */}
          <button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isLoading || isTranscribing}
            class={`p-3 rounded-xl border transition-all ${
              isRecording
                ? "bg-red-500/20 text-red-500 border-red-500/50 animate-pulse"
                : "bg-white/5 text-warm-beige/60 border-white/10 hover:bg-white/10 hover:text-muted-gold"
            } ${isTranscribing ? "opacity-50 cursor-not-allowed" : ""}`}
            title="Voice to Text"
          >
            {isTranscribing
              ? (
                <svg
                  class="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  >
                  </circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  >
                  </path>
                </svg>
              )
              : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z">
                  </path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" y1="19" x2="12" y2="23"></line>
                  <line x1="8" y1="23" x2="16" y2="23"></line>
                </svg>
              )}
          </button>

          <input
            ref={inputRef}
            type="text"
            value={input}
            onInput={(e) => setInput(e.currentTarget.value)}
            placeholder={isTranscribing
              ? "Transcribing..."
              : "Type your message..."}
            disabled={isLoading || isTranscribing}
            class="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-warm-beige placeholder-warm-beige/30 focus:outline-none focus:border-muted-gold/50 transition-colors text-sm"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim() || isTranscribing}
            class="bg-muted-gold/10 hover:bg-muted-gold/20 text-muted-gold disabled:opacity-50 disabled:cursor-not-allowed border border-muted-gold/20 rounded-xl px-4 py-3 transition-colors h-[46px] flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
