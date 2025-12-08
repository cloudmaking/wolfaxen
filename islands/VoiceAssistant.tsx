import { useEffect, useRef, useState } from "preact/hooks";
import { createPCM16Blob, decode, decodeAudioData } from "../utils/audio.ts";

interface SubmittedData {
  name: string;
  email: string;
  company: string;
}

interface UserContext {
  name?: string;
  email?: string;
  company?: string;
  userId?: string;
}

// We need to define types locally since we are using CDN imports
interface ToolCall {
  functionCalls: {
    id: string;
    name: string;
    args: Record<string, unknown>;
  }[];
}

interface LiveServerMessage {
  toolCall?: ToolCall;
  serverContent?: {
    modelTurn?: {
      parts?: {
        inlineData?: {
          data: string;
        };
      }[];
    };
    interrupted?: boolean;
    toolCall?: ToolCall;
  };
}

export default function VoiceAssistant() {
  const [connectionState, setConnectionState] = useState<
    "DISCONNECTED" | "CONNECTING" | "CONNECTED" | "ERROR"
  >("DISCONNECTED");
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const isMutedRef = useRef(false);
  const [userContext, setUserContext] = useState<UserContext | null>(null);
  const [hasSubmittedBefore, setHasSubmittedBefore] = useState(false);

  useEffect(() => {
    isMutedRef.current = isMuted;
    // Check for previous submission
    if (localStorage.getItem("wolfaxen_inquiry_submitted") === "true") {
      setHasSubmittedBefore(true);
    }
  }, [isMuted]);

  const [errorMessage, setErrorMessage] = useState("");
  const [submittedData, setSubmittedData] = useState<SubmittedData | null>(
    null,
  );
  const [draftData, setDraftData] = useState<SubmittedData | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const audioSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const loadUserContext = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (!res.ok) {
        setUserContext(null);
        return null;
      }
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
      return ctx;
    } catch (err) {
      console.warn("User context fetch failed", err);
      setUserContext(null);
      return null;
    }
  };

  const buildSystemInstruction = (ctx: UserContext | null) => {
    if (ctx && (ctx.name || ctx.email)) {
      const knownName = ctx.name || ctx.email || "there";
      const knownCompany = ctx.company || "";
      const knownEmail = ctx.email || "";
      const missingName = ctx.name ? "no" : "yes";
      const missingCompany = ctx.company ? "no" : "yes";
      return `You are "Flow", a professional, friendly, and efficient business process consultant for Wolfaxen.
The user is signed in. Known details:
- Name: ${knownName}
- Company: ${knownCompany || "(missing)"}
- Email: ${knownEmail || "unknown"}
Missing fields:
- Name missing? ${missingName}
- Company missing? ${missingCompany}

Instructions:
1. Greet them by name and acknowledge their company.
2. Do NOT ask for their email unless it is missing; use the known email when calling tools.
3. If name is missing, ask for it once. If company is missing, ask for it once. Otherwise, do not re-ask unless they correct you.
4. Focus on what help they need right now (e.g., follow-up after using the Process Mapper, specific automation needs, or bottlenecks they found).
5. Ask concise follow-up questions to understand the specific pain point and desired outcome.
6. When calling previewInquiry/submitInquiry, prefill known name, company, and email; only gather missing pieces from the user. Always include the known user id if provided by the client.
7. Keep responses concise and conversational.`;
    }

    return `You are "Flow", a professional, friendly, and efficient business process consultant for Wolfaxen. 
Your goal is to briefly interview the potential client to understand their business inefficiencies. 
1. Introduce yourself briefly as Flow, Wolfaxen's AI consultant.
2. Ask for their name and company.
3. Ask about their main operational bottleneck or "pain point".
4. Ask for their email.
5. Once you have Name, Company, Challenges, and Email, you MUST call the 'previewInquiry' tool to show the user what you have captured.
6. Ask the user to confirm if the details are correct.
7. If the user corrects anything, call 'previewInquiry' again with the updated details.
8. ONLY when the user explicitly confirms (e.g., "yes", "looks good"), call the 'submitInquiry' tool.
9. When calling 'submitInquiry', you MUST generate two things:
   a) 'transcript': A detailed, word-for-word transcript of the conversation.
   b) 'summary': A concise summary of their pain points and business context.
10. After the 'submitInquiry' tool call is successful, say "I've submitted your inquiry. To be helpful, I've sent you a sign-in link straight to your email. You can use it to access our free Process Mapper on the dashboard immediately. It will visualize exactly where you're losing money."
11. Then say goodbye.
Keep responses concise and conversational.`;
  };

  const connect = async () => {
    try {
      setConnectionState("CONNECTING");
      setErrorMessage("");
      setSubmittedData(null);
      const ctx = await loadUserContext();

      // Audio Setup
      // @ts-ignore: webkitAudioContext
      const AudioContextClass = globalThis.AudioContext ||
        (globalThis as any).webkitAudioContext;
      inputAudioContextRef.current = new AudioContextClass({
        sampleRate: 16000,
      });
      outputAudioContextRef.current = new AudioContextClass({
        sampleRate: 24000,
      });

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // WebSocket Connection to Gemini Live (Multimodal Live API) via Relay
      const protocol = globalThis.location.protocol === "https:"
        ? "wss:"
        : "ws:";
      const url = `${protocol}//${globalThis.location.host}/api/voice`;

      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        setConnectionState("CONNECTED");

        // Send Initial Setup Message
        const systemInstruction = buildSystemInstruction(ctx);
        const setupMsg = {
          setup: {
            model: "models/gemini-2.0-flash-exp",
            generationConfig: {
              responseModalities: ["AUDIO"],
              speechConfig: {
                voiceConfig: { prebuiltVoiceConfig: { voiceName: "Kore" } },
              },
            },
            systemInstruction: {
              parts: [
                {
                  text: systemInstruction,
                },
              ],
            },
            tools: [
              {
                functionDeclarations: [
                  {
                    name: "previewInquiry",
                    description:
                      "Show the gathered inquiry details to the user for confirmation before submission.",
                    parameters: {
                      type: "OBJECT",
                      properties: {
                        name: { type: "STRING" },
                        company: { type: "STRING" },
                        email: { type: "STRING" },
                        challenges: { type: "STRING" },
                        transcript: {
                          type: "STRING",
                          description: "A detailed word-for-word transcript.",
                        },
                        summary: {
                          type: "STRING",
                          description:
                            "A concise summary of the business pain points.",
                        },
                      },
                      required: [
                        "name",
                        "company",
                        "email",
                        "challenges",
                        "transcript",
                        "summary",
                      ],
                    },
                  },
                  {
                    name: "submitInquiry",
                    description:
                      "Submit the user inquiry after gathering necessary information.",
                    parameters: {
                      type: "OBJECT",
                      properties: {
                        name: { type: "STRING" },
                        company: { type: "STRING" },
                        email: { type: "STRING" },
                        challenges: { type: "STRING" },
                        transcript: {
                          type: "STRING",
                          description:
                            "A summary transcript of the conversation.",
                        },
                      },
                      required: [
                        "name",
                        "company",
                        "email",
                        "challenges",
                        "transcript",
                      ],
                    },
                  },
                ],
              },
            ],
          },
        };
        ws.send(JSON.stringify(setupMsg));

        // Start Audio Recording
        if (!inputAudioContextRef.current || !streamRef.current) return;
        const source = inputAudioContextRef.current.createMediaStreamSource(
          streamRef.current,
        );
        sourceRef.current = source;
        const processor = inputAudioContextRef.current.createScriptProcessor(
          4096,
          1,
          1,
        );
        processorRef.current = processor;

        processor.onaudioprocess = (e) => {
          if (isMutedRef.current) return;
          const inputData = e.inputBuffer.getChannelData(0);

          // Volume meter
          let sum = 0;
          for (let i = 0; i < inputData.length; i++) {
            sum += inputData[i] * inputData[i];
          }
          setVolumeLevel(
            Math.min(100, Math.sqrt(sum / inputData.length) * 400),
          );

          // Send Audio
          const pcmData = createPCM16Blob(inputData);
          const audioMsg = {
            realtimeInput: {
              mediaChunks: [
                {
                  mimeType: "audio/pcm;rate=16000",
                  data: pcmData.data,
                },
              ],
            },
          };
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(audioMsg));
          }
        };

        source.connect(processor);
        processor.connect(inputAudioContextRef.current.destination);
      };

      ws.onmessage = async (event) => {
        let messageData = event.data;
        if (messageData instanceof Blob) {
          messageData = await messageData.text();
        }
        const message = JSON.parse(messageData);

        // Debug: Log every message from server to see structure
        // console.log("📩 Received:", message);

        if (message.error) {
          console.error("Server Error:", message.error);
          setErrorMessage(message.error);
          setConnectionState("ERROR");
          return;
        }

        // Handle Tool Calls
        // Check both top-level toolCall and serverContent.toolCall just in case
        const toolCall = message.toolCall || message.serverContent?.toolCall;

        if (toolCall) {
          console.log("🛠️ Tool Call Detected:", toolCall);
          const fc = toolCall.functionCalls[0];

          if (fc.name === "previewInquiry") {
            console.log("👀 Previewing Inquiry:", fc.args);
            setDraftData(fc.args as unknown as SubmittedData);

            // Send success response to AI so it knows the preview is shown
            const toolResponse = {
              toolResponse: {
                functionResponses: [
                  {
                    id: fc.id,
                    name: fc.name,
                    response: {
                      result: {
                        status: "success",
                        message: "Details displayed to user",
                      },
                    },
                  },
                ],
              },
            };
            ws.send(JSON.stringify(toolResponse));
          } else if (fc.name === "submitInquiry") {
            console.log("✅ Executing submitInquiry:", fc.args);

            // 1. Stop Microphone immediately so user cannot interrupt the "Goodbye"
            if (streamRef.current) {
              streamRef.current.getTracks().forEach((track) => track.stop());
            }
            if (processorRef.current) {
              processorRef.current.disconnect();
            }
            if (sourceRef.current) {
              sourceRef.current.disconnect();
            }

            // 2. Call the backend API
            try {
              console.log("Submitting to API...");

              const payload = {
                source: "voice_ai_assistant",
                name: fc.args.name,
                email: fc.args.email,
                company: fc.args.company,
                message: fc.args.challenges,
                transcript: fc.args.transcript,
                summary: fc.args.summary,
                user_id: userContext?.userId || null,
              };

              const response = await fetch("/api/leads/unqualified", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
              });

              console.log("API Response Status:", response.status);

              if (response.ok) {
                setSubmittedData(fc.args);
                localStorage.setItem("wolfaxen_inquiry_submitted", "true");
                // Best effort: update profile with any new info (name/company/email)
                if (userContext?.userId) {
                  try {
                    await fetch("/api/profile/update", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        name: fc.args.name,
                        company: fc.args.company,
                        email: fc.args.email,
                      }),
                    });
                  } catch (e) {
                    console.warn("Profile update from voice failed", e);
                  }
                }
                // Send success response to AI so it can say goodbye
                const toolResponse = {
                  toolResponse: {
                    functionResponses: [
                      {
                        id: fc.id,
                        name: fc.name,
                        response: { result: { status: "success" } },
                      },
                    ],
                  },
                };
                ws.send(JSON.stringify(toolResponse));
              } else {
                const errorText = await response.text();
                console.error("API Submission Failed", errorText);

                // Check for "EXISTING_MAP" error
                try {
                  const errorJson = JSON.parse(errorText);
                  if (errorJson.code === "EXISTING_MAP") {
                    setHasSubmittedBefore(true); // Re-use the "Email us" UI

                    const toolResponse = {
                      toolResponse: {
                        functionResponses: [
                          {
                            id: fc.id,
                            name: fc.name,
                            response: {
                              result: {
                                status: "error",
                                error:
                                  "User already has a process map. Please email support.",
                              },
                            },
                          },
                        ],
                      },
                    };
                    ws.send(JSON.stringify(toolResponse));
                    return;
                  }
                } catch (e) {
                  // Ignore JSON parse error
                }

                // Generic Error Handling
                const toolResponse = {
                  toolResponse: {
                    functionResponses: [
                      {
                        id: fc.id,
                        name: fc.name,
                        response: {
                          result: {
                            status: "error",
                            error: "Backend submission failed",
                          },
                        },
                      },
                    ],
                  },
                };
                ws.send(JSON.stringify(toolResponse));
              }
            } catch (e) {
              console.error("Network Error", e);
            }
          }
        }

        // Handle Audio Output
        if (message.serverContent?.modelTurn?.parts?.[0]?.inlineData) {
          const base64Audio =
            message.serverContent.modelTurn.parts[0].inlineData.data;
          if (outputAudioContextRef.current) {
            const ctx = outputAudioContextRef.current;
            nextStartTimeRef.current = Math.max(
              nextStartTimeRef.current,
              ctx.currentTime,
            );
            const audioBuffer = await decodeAudioData(
              decode(base64Audio),
              ctx,
              24000,
              1,
            );
            const source = ctx.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(ctx.destination);
            source.start(nextStartTimeRef.current);
            nextStartTimeRef.current += audioBuffer.duration;
            audioSourcesRef.current.add(source);
            source.onended = () => audioSourcesRef.current.delete(source);
          }
        }

        // Handle Interruption
        if (message.serverContent?.interrupted) {
          audioSourcesRef.current.forEach((s) => {
            try {
              s.stop();
            } catch {
              // Ignore errors when stopping already stopped sources
            }
          });
          audioSourcesRef.current.clear();
          nextStartTimeRef.current = 0;
        }
      };

      ws.onerror = (e) => {
        console.error("WebSocket Error", e);
        setErrorMessage("Connection failed. Please try again.");
        setConnectionState("ERROR");
      };

      ws.onclose = (event) => {
        console.log("WebSocket Closed", event.code, event.reason);
        if (connectionState !== "ERROR") {
          if (event.code !== 1000) {
            setErrorMessage(`Connection closed: ${event.code} ${event.reason}`);
            setConnectionState("ERROR");
          } else {
            setConnectionState("DISCONNECTED");
          }
        }
      };
    } catch (err: unknown) {
      console.error("Connection Failed", err);
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Could not access microphone. Please allow permissions.",
      );
      setConnectionState("ERROR");
    }
  };
  const toggleMute = () => {
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const cleanupAudio = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (sourceRef.current) {
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }
    if (inputAudioContextRef.current) {
      inputAudioContextRef.current.close();
      inputAudioContextRef.current = null;
    }
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setConnectionState("DISCONNECTED");
    setIsMuted(false);
  };

  useEffect(() => {
    return () => cleanupAudio();
  }, []);

  return (
    <div class="w-full max-w-2xl mx-auto bg-white/5 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/10 font-sans relative group">
      {/* Ambient Glow */}
      <div class="absolute inset-0 bg-gradient-to-br from-muted-gold/5 to-transparent opacity-50 pointer-events-none">
      </div>

      {/* Header */}
      <div class="bg-oreo-black/80 p-6 flex justify-between items-center border-b border-white/5 relative z-10">
        <div>
          <h3 class="text-xl font-display font-bold text-warm-beige flex items-center gap-3">
            <span
              class={`w-2 h-2 rounded-full ${
                connectionState === "CONNECTED"
                  ? "bg-green-500 animate-pulse"
                  : "bg-white/20"
              }`}
            >
            </span>
            Wolfaxen AI Consultant
          </h3>
          <p class="text-warm-beige/60 text-sm mt-1">
            Describe your business issues naturally.
          </p>
        </div>
        {connectionState === "CONNECTED" && (
          <div class="flex items-center gap-1">
            <div class="h-8 flex items-end gap-1">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  class="w-1 bg-muted-gold rounded-t transition-all duration-75"
                  style={{
                    height: `${Math.max(20, Math.random() * volumeLevel)}%`,
                    opacity: 0.5 + (Math.random() * 0.5),
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div class="p-8 relative z-10 min-h-[350px] flex flex-col justify-center">
        {!submittedData && draftData && (
          <div class="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 animate-fade-in">
            <h4 class="text-muted-gold font-display font-bold mb-4 flex items-center gap-2">
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
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              Confirm Details
            </h4>
            <div class="space-y-3 text-sm">
              <div class="grid grid-cols-[100px_1fr] gap-2">
                <span class="text-warm-beige/60">Name:</span>
                <span class="text-white font-medium">{draftData.name}</span>
              </div>
              <div class="grid grid-cols-[100px_1fr] gap-2">
                <span class="text-warm-beige/60">Company:</span>
                <span class="text-white font-medium">{draftData.company}</span>
              </div>
              <div class="grid grid-cols-[100px_1fr] gap-2">
                <span class="text-warm-beige/60">Email:</span>
                <span class="text-white font-medium">{draftData.email}</span>
              </div>
              <div class="grid grid-cols-[100px_1fr] gap-2">
                <span class="text-warm-beige/60">Challenges:</span>
                <span class="text-white/90 italic">
                  "{draftData.challenges || (draftData as any).message}"
                </span>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-white/10 text-xs text-warm-beige/50 text-center">
              Say "Yes" to submit or tell me what to change.
            </div>
          </div>
        )}

        {submittedData
          ? (
            <div class="bg-deep-olive/10 border border-deep-olive/30 rounded-2xl p-8 text-center animate-fade-in">
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
                Thanks, {submittedData.name}. We've noted your challenges at
                {" "}
                <span class="text-white">{submittedData.company}</span>{" "}
                and will send a preliminary strategy to{" "}
                <span class="text-white">{submittedData.email}</span> shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmittedData(null);
                  cleanupAudio();
                }}
                class="text-sm font-medium text-muted-gold hover:text-light-gold transition-colors uppercase tracking-wider"
              >
                Start New Session
              </button>
            </div>
          )
          : (
            <div class="flex flex-col items-center justify-center">
              {hasSubmittedBefore
                ? (
                  <div class="text-center animate-fade-in">
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
                      To follow up or provide more details, please email us
                      directly.
                    </p>
                    <a
                      href="mailto:info@wolfaxen.com"
                      class="text-muted-gold hover:text-white font-bold underline decoration-muted-gold/50 hover:decoration-white transition-all"
                    >
                      info@wolfaxen.com
                    </a>
                  </div>
                )
                : (
                  <>
                    {connectionState === "DISCONNECTED" && (
                      <div class="text-center">
                        <div class="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 text-muted-gold border border-white/10 group-hover:border-muted-gold/30 transition-colors duration-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-10 h-10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                            <line x1="12" x2="12" y1="19" y2="22" />
                          </svg>
                        </div>
                        <h4 class="text-xl font-display font-bold text-warm-beige mb-3">
                          Ready to optimize?
                        </h4>
                        <p class="text-warm-beige/60 mb-10 max-w-sm mx-auto leading-relaxed">
                          Click below to start a voice conversation. Our AI will
                          analyze your needs in real-time.
                        </p>
                        <button
                          type="button"
                          onClick={connect}
                          class="bg-muted-gold hover:bg-light-gold text-oreo-black font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-[0_0_20px_-5px_rgba(185,176,123,0.3)] hover:shadow-[0_0_30px_-5px_rgba(185,176,123,0.5)] hover:scale-105 flex items-center gap-3 mx-auto"
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
                            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                            <line x1="12" x2="12" y1="19" y2="22" />
                          </svg>
                          Start Conversation
                        </button>
                      </div>
                    )}

                    {connectionState === "CONNECTING" && (
                      <div class="flex flex-col items-center text-warm-beige/60">
                        <div class="w-16 h-16 border-2 border-muted-gold/30 border-t-muted-gold rounded-full animate-spin mb-6">
                        </div>
                        <p class="tracking-widest uppercase text-xs font-medium">
                          Connecting to Neural Network...
                        </p>
                      </div>
                    )}

                    {connectionState === "CONNECTED" && (
                      <div class="w-full flex flex-col items-center">
                        <div class="relative w-40 h-40 mb-10 flex items-center justify-center">
                          <div class="absolute inset-0 bg-muted-gold rounded-full opacity-10 animate-ping duration-[2000ms]">
                          </div>
                          <div class="absolute inset-4 bg-muted-gold rounded-full opacity-20 animate-pulse duration-[1500ms]">
                          </div>
                          <div class="relative z-10 bg-gradient-to-br from-muted-gold to-deep-olive p-1 rounded-full shadow-[0_0_40px_-10px_rgba(185,176,123,0.4)]">
                            <div class="w-full h-full rounded-full bg-oreo-black flex items-center justify-center p-6">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="text-white w-10 h-10"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                <line x1="12" x2="12" y1="19" y2="22" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        <p class="text-warm-beige font-medium mb-10 text-center animate-pulse tracking-wide">
                          Listening... Speak naturally.
                        </p>

                        <div class="flex gap-6">
                          <button
                            type="button"
                            onClick={toggleMute}
                            class={`p-5 rounded-full border transition-all duration-300 ${
                              isMuted
                                ? "border-oxide-red text-oxide-red bg-oxide-red/10"
                                : "border-white/10 text-warm-beige/60 hover:border-muted-gold hover:text-muted-gold hover:bg-white/5"
                            }`}
                          >
                            {isMuted
                              ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="w-6 h-6"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <line x1="2" x2="22" y1="2" y2="22" />
                                  <path d="M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" />
                                  <path d="M5 10v2a7 7 0 0 0 12 5" />
                                  <path d="M15 9.34V5a3 3 0 0 0-5.68-1.33" />
                                  <path d="M9 9v3a3 3 0 0 0 5.12 2.13" />
                                  <line x1="12" x2="12" y1="19" y2="22" />
                                </svg>
                              )
                              : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="w-6 h-6"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                  <line x1="12" x2="12" y1="19" y2="22" />
                                </svg>
                              )}
                          </button>
                          <button
                            type="button"
                            onClick={cleanupAudio}
                            class="p-5 rounded-full border border-oxide-red/50 text-oxide-red hover:bg-oxide-red/10 hover:border-oxide-red transition-all duration-300"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="w-6 h-6"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <rect x="9" y="9" width="6" height="6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}

              {connectionState === "ERROR" && (
                <div class="text-center">
                  <div class="text-oxide-red mb-4 bg-oxide-red/10 p-4 rounded-xl border border-oxide-red/20">
                    <p class="font-medium">
                      {errorMessage || "Connection failed."}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={connect}
                    class="text-muted-gold hover:text-light-gold underline transition-colors"
                  >
                    Retry Conversation Connection
                  </button>
                </div>
              )}
            </div>
          )}
      </div>
    </div>
  );
}
