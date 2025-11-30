import { useEffect, useRef, useState } from "preact/hooks";
import anime from "https://esm.sh/animejs@3.2.2";

interface TerminalTypingProps {
  commands?: string[];
}

export default function TerminalTyping({ commands: _commands }: TerminalTypingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<
    { text: string; type: "command" | "output" | "success" | "error" }[]
  >([]);
  const [currentLine, setCurrentLine] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  const defaultCommands = [
    { cmd: "wolfaxen init --project=automation", delay: 100 },
    { out: "✓ Initializing project...", type: "output" as const },
    { out: "✓ Loading process templates", type: "success" as const },
    { cmd: "wolfaxen scan --analyze", delay: 80 },
    { out: "Scanning workflows...", type: "output" as const },
    { out: "Found 23 automation opportunities", type: "success" as const },
    { out: "Efficiency gain: +340%", type: "success" as const },
    { cmd: "wolfaxen deploy --ai-agent", delay: 90 },
    { out: "Deploying AI agent...", type: "output" as const },
    { out: "✓ Agent online. Ready to assist.", type: "success" as const },
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    anime({
      targets: container,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
      easing: "easeOutExpo",
    });

    const cursorInterval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);

    let lineIndex = 0;
    let charIndex = 0;
    let _isTyping = false;

    const typeNextChar = () => {
      const currentCommand = defaultCommands[lineIndex];
      if (!currentCommand) return;

      if ("cmd" in currentCommand) {
        _isTyping = true;
        const cmd = currentCommand.cmd;
        if (charIndex < cmd.length) {
          setCurrentLine(cmd.substring(0, charIndex + 1));
          charIndex++;
          setTimeout(typeNextChar, currentCommand.delay + Math.random() * 50);
        } else {
          setLines((prev) => [...prev, { text: cmd, type: "command" }]);
          setCurrentLine("");
          charIndex = 0;
          lineIndex++;
          setTimeout(typeNextChar, 300);
        }
      } else if ("out" in currentCommand) {
        _isTyping = false;
        setLines((
          prev,
        ) => [...prev, {
          text: currentCommand.out,
          type: currentCommand.type || "output",
        }]);
        lineIndex++;
        setTimeout(typeNextChar, 400);
      }
    };

    setTimeout(typeNextChar, 1000);

    anime({
      targets: ".terminal-scanline",
      translateY: ["0%", "100%"],
      opacity: [0.1, 0],
      easing: "linear",
      duration: 4000,
      loop: true,
    });

    return () => clearInterval(cursorInterval);
  }, []);

  const getLineColor = (type: string) => {
    switch (type) {
      case "command":
        return "text-muted-gold";
      case "success":
        return "text-deep-olive";
      case "error":
        return "text-oxide-red";
      default:
        return "text-warm-beige/70";
    }
  };

  return (
    <div
      ref={containerRef}
      class="relative w-full h-full bg-[#0a0a0f] rounded-lg overflow-hidden border border-white/10"
    >
      <div class="terminal-scanline absolute inset-x-0 h-8 bg-gradient-to-b from-white/5 to-transparent pointer-events-none">
      </div>

      <div class="flex items-center gap-2 px-4 py-2 bg-white/5 border-b border-white/10">
        <div class="w-3 h-3 rounded-full bg-oxide-red/80"></div>
        <div class="w-3 h-3 rounded-full bg-muted-gold/80"></div>
        <div class="w-3 h-3 rounded-full bg-deep-olive/80"></div>
        <span class="ml-2 text-xs font-mono text-warm-beige/40">
          wolfaxen@system ~ /projects
        </span>
      </div>

      <div class="p-4 font-mono text-sm h-[calc(100%-40px)] overflow-hidden">
        <div class="space-y-1">
          {lines.map((line, i) => (
            <div key={i} class={`${getLineColor(line.type)} animate-fadeIn`}>
              {line.type === "command" && (
                <span class="text-deep-olive mr-2">❯</span>
              )}
              {line.text}
            </div>
          ))}

          <div class="text-muted-gold">
            <span class="text-deep-olive mr-2">❯</span>
            {currentLine}
            <span
              class={`inline-block w-2 h-4 bg-muted-gold ml-0.5 ${
                cursorVisible ? "opacity-100" : "opacity-0"
              }`}
              style={{ verticalAlign: "text-bottom" }}
            >
            </span>
          </div>
        </div>
      </div>

      <div class="absolute bottom-2 right-2 text-[8px] font-mono text-warm-beige/20">
        SHELL v4.2.1
      </div>

      <div class="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-50">
      </div>
    </div>
  );
}
