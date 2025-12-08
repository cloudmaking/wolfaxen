import { useState } from "preact/hooks";

interface Node {
  id: string;
  label: string;
  type: string;
  description?: string;
}

interface Edge {
  from: string;
  to: string;
  label?: string;
}

interface Graph {
  nodes: Node[];
  edges: Edge[];
}

interface Insights {
  bottlenecks: string[];
  manual_steps: string[];
  automation_opportunities: string[];
}

interface Question {
  id: string;
  text: string;
  category: string;
}

interface ProcessMap {
  id: string;
  raw_input: string;
  graph_json: Graph;
  insights_json: Insights;
  version?: number;
}

export default function ProcessMapper(
  {
    initialMaps = [],
    prefill,
  }: { initialMaps?: ProcessMap[]; prefill?: string },
) {
  const [input, setInput] = useState(prefill || "");
  const [loading, setLoading] = useState(false);
  const [currentMap, setCurrentMap] = useState<ProcessMap | null>(
    initialMaps[0] || null,
  );
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showHelp, setShowHelp] = useState(false);
  const [helpMessage, setHelpMessage] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);

  const handleAuthOrUpgrade = (status: number, bodyText: string) => {
    if (status === 401) {
      window.location.href = "/login";
      return true;
    }
    if (status === 402) {
      alert(
        bodyText ||
          "Free limit reached. Please upgrade to continue generating maps.",
      );
      window.location.href = "/pricing";
      return true;
    }
    return false;
  };

  const generateMap = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/process-mapper/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ raw_input: input }),
      });

      if (!res.ok) {
        const text = await res.text();
        if (handleAuthOrUpgrade(res.status, text)) return;
        alert(`Error: ${text}`);
        return;
      }

      const data = await res.json();
      if (data.process_map_id) {
        setCurrentMap({
          id: data.process_map_id,
          raw_input: input,
          graph_json: data.graph,
          insights_json: data.insights,
        });
        setQuestions(data.followup_questions || []);
        setSessionId(data.followup_session_id);
      }
    } catch (e) {
      console.error(e);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const refineMap = async () => {
    if (!currentMap) return;
    setLoading(true);
    try {
      const res = await fetch("/api/process-mapper/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          process_map_id: currentMap.id,
          followup_session_id: sessionId,
          answers: answers["general"] || "",
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        if (handleAuthOrUpgrade(res.status, text)) return;
        alert(`Error: ${text}`);
        return;
      }
      const data = await res.json();

      setCurrentMap((prev) =>
        prev
          ? ({
            ...prev,
            graph_json: data.graph || prev.graph_json,
            insights_json: data.insights || prev.insights_json,
          })
          : null
      );

      if (data.followup) {
        setQuestions(data.followup.questions || []);
        setSessionId(data.followup.session_id);
      }
      setAnswers({}); // Reset answers

      if (data.help_offer?.suggested) {
        setShowHelp(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const submitHelp = async () => {
    if (!currentMap) return;
    await fetch("/api/process-mapper/request-help", {
      method: "POST",
      body: JSON.stringify({
        process_map_id: currentMap.id,
        message: helpMessage,
      }),
    });
    setShowHelp(false);
    alert("Help request sent!");
  };

  return (
    <div class="flex h-screen overflow-hidden">
      {/* Sidebar / Input */}
      <div class="w-1/3 bg-gray-900 border-r border-gray-800 p-6 flex flex-col overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-white">Process Input</h2>
          {currentMap && initialMaps.length === 0 && (
            <button
              onClick={() => {
                setCurrentMap(null);
                setInput("");
                setQuestions([]);
                setAnswers({});
                setShowHelp(false);
              }}
              class="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-2 py-1 rounded border border-gray-700 transition-colors"
            >
              + New Map
            </button>
          )}
        </div>

        {!currentMap
          ? (
            <div class="space-y-4">
              <div class="bg-indigo-900/20 border border-indigo-500/30 p-4 rounded-lg mb-4">
                <p class="text-sm text-indigo-200 font-medium mb-2">
                  To get the best result, include:
                </p>
                <ul class="list-disc list-inside text-xs text-indigo-300 space-y-1">
                  <li>
                    <strong>Trigger:</strong> What starts this process?
                  </li>
                  <li>
                    <strong>People:</strong> Who is involved?
                  </li>
                  <li>
                    <strong>Tools:</strong> What software/tools are used?
                  </li>
                  <li>
                    <strong>Outcome:</strong> What is the final result?
                  </li>
                </ul>
              </div>

              <div class="relative">
                <textarea
                  class="w-full h-64 bg-gray-800 border border-gray-700 rounded-lg p-4 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Describe your process in detail... (e.g. 'When a new lead comes in, I manually copy it to Excel...')"
                  value={input}
                  onInput={(e) => setInput(e.currentTarget.value)}
                />
                <button
                  onClick={() => {
                    // @ts-ignore: Web Speech API
                    const SpeechRecognition = window.SpeechRecognition ||
                      window.webkitSpeechRecognition;
                    if (!SpeechRecognition) {
                      alert("Voice input is not supported in this browser.");
                      return;
                    }
                    const recognition = new SpeechRecognition();
                    recognition.lang = "en-US";
                    recognition.start();
                    recognition.onresult = (event: any) => {
                      const transcript = event.results[0][0].transcript;
                      setInput((input || "") + " " + transcript);
                    };
                  }}
                  class="absolute bottom-3 right-3 text-gray-400 hover:text-white bg-gray-800 p-2 rounded-full border border-gray-600 hover:border-indigo-500 transition-colors"
                  title="Use Voice Input"
                >
                  🎤
                </button>
              </div>

              <button
                onClick={generateMap}
                disabled={loading || !input}
                class="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Generating..." : "Generate Map"}
              </button>

              <div class="bg-gray-800/60 border border-gray-700 rounded-lg p-4">
                <p class="text-sm text-gray-300 font-medium mb-3">
                  Answer these to help the AI map your entire business:
                </p>
                <ul class="list-disc list-inside text-xs text-gray-400 space-y-2">
                  <li>How do leads arrive and who qualifies them?</li>
                  <li>What tools capture, nurture, and close deals?</li>
                  <li>How do you deliver the service/product end-to-end?</li>
                  <li>Where handoffs happen and who owns each step?</li>
                  <li>What produces cost, revenue, and profit in this flow?</li>
                  <li>Where mistakes or delays most often occur?</li>
                </ul>
              </div>
            </div>
          )
          : (
            <div class="space-y-6">
              <div class="bg-gray-800 p-4 rounded-lg">
                <h3 class="font-medium text-gray-300 mb-2">Current Process</h3>
                <p class="text-sm text-gray-400 line-clamp-3">
                  {currentMap.raw_input}
                </p>
              </div>

              <div class="space-y-4">
                <h3 class="font-bold text-indigo-400">Refine Your Map</h3>
                <div class="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <p class="text-sm text-gray-300 mb-3 font-medium">
                    Please answer the following to help us improve the map:
                  </p>
                  {questions.length > 0 && (
                    <ul class="list-disc list-inside text-sm text-gray-400 mb-4 space-y-1">
                      {questions.map((q) => <li key={q.id}>{q.text}</li>)}
                    </ul>
                  )}

                  <div class="relative">
                    <textarea
                      class="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[120px]"
                      placeholder="Type or speak your answer here..."
                      value={answers["general"] || ""}
                      onInput={(e) =>
                        setAnswers({
                          ...answers,
                          "general": e.currentTarget.value,
                        })}
                    />
                    <button
                      onClick={() => {
                        // @ts-ignore: Web Speech API
                        const SpeechRecognition = window.SpeechRecognition ||
                          window.webkitSpeechRecognition;
                        if (!SpeechRecognition) {
                          alert(
                            "Voice input is not supported in this browser.",
                          );
                          return;
                        }
                        const recognition = new SpeechRecognition();
                        recognition.lang = "en-US";
                        recognition.start();
                        recognition.onresult = (event: any) => {
                          const transcript = event.results[0][0].transcript;
                          setAnswers({
                            ...answers,
                            "general": (answers["general"] || "") + " " +
                              transcript,
                          });
                        };
                      }}
                      class="absolute bottom-3 right-3 text-gray-400 hover:text-white bg-gray-800 p-2 rounded-full border border-gray-600 hover:border-indigo-500 transition-colors"
                      title="Use Voice Input"
                    >
                      🎤
                    </button>
                  </div>
                </div>

                <button
                  onClick={refineMap}
                  disabled={loading}
                  class="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-indigo-500/50 transition-all"
                >
                  {loading ? "Refining..." : "Update Map"}
                </button>
              </div>

              <div class="pt-6 border-t border-gray-800">
                <div class="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-500/30 rounded-xl p-6 text-center">
                  <h4 class="text-white font-bold mb-2">
                    Stuck or need a custom solution?
                  </h4>
                  <p class="text-gray-300 text-sm mb-4">
                    Our experts can build this automation for you.
                  </p>
                  <button
                    onClick={() => setShowHelp(true)}
                    class="bg-white text-indigo-900 font-bold py-2 px-6 rounded-full hover:bg-gray-100 transition-colors shadow-md"
                  >
                    Get Expert Help
                  </button>
                </div>
              </div>
            </div>
          )}
      </div>

      {/* Main Content / Graph */}
      <div class="flex-1 bg-black p-8 overflow-y-auto">
        {currentMap
          ? (
            <div class="space-y-8">
              {/* Graph Visualization (Simple) */}
              <div class="bg-gray-900 rounded-xl p-6 border border-gray-800 min-h-[400px] relative">
                <h3 class="text-gray-400 text-sm uppercase tracking-wider mb-4">
                  Process Flow
                </h3>
                <div class="flex flex-col items-center space-y-4">
                  {currentMap.graph_json?.nodes?.map((node, i) => (
                    <div key={node.id} class="flex flex-col items-center">
                      <div
                        class={`p-4 rounded-lg border ${
                          node.type === "start"
                            ? "bg-green-900/20 border-green-500/50"
                            : node.type === "end"
                            ? "bg-red-900/20 border-red-500/50"
                            : "bg-gray-800 border-gray-600"
                        } min-w-[200px] text-center`}
                      >
                        <div class="font-bold text-white">{node.label}</div>
                        {node.description && (
                          <div class="text-xs text-gray-400 mt-1">
                            {node.description}
                          </div>
                        )}
                      </div>
                      {i < currentMap.graph_json.nodes.length - 1 && (
                        <div class="h-8 w-0.5 bg-gray-700 my-2"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Insights */}
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-gray-900 rounded-xl p-6 border border-gray-800">
                  <h3 class="text-orange-400 font-bold mb-4">
                    Bottlenecks & Risks
                  </h3>
                  <ul class="list-disc list-inside space-y-2 text-gray-300">
                    {currentMap.insights_json.bottlenecks?.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
                <div class="bg-gray-900 rounded-xl p-6 border border-gray-800">
                  <h3 class="text-green-400 font-bold mb-4">
                    Automation Opportunities
                  </h3>
                  <ul class="list-disc list-inside space-y-2 text-gray-300">
                    {currentMap.insights_json.automation_opportunities?.map((
                      a,
                      i,
                    ) => <li key={i}>{a}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          )
          : (
            <div class="h-full flex items-center justify-center text-gray-500">
              Generate a map to see visualization
            </div>
          )}
      </div>

      {/* Help Modal */}
      {showHelp && (
        <div class="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div class="bg-gray-900 border border-gray-700 p-8 rounded-xl max-w-md w-full">
            <h3 class="text-xl font-bold text-white mb-4">
              Request Expert Review
            </h3>
            <p class="text-gray-400 mb-4">
              Our team can help you define this process and implement the
              automations.
            </p>
            <textarea
              class="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white mb-4"
              placeholder="What specific help do you need?"
              value={helpMessage}
              onInput={(e) => setHelpMessage(e.currentTarget.value)}
            />
            <div class="flex justify-end gap-3">
              <button
                onClick={() => setShowHelp(false)}
                class="text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={submitHelp}
                class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
