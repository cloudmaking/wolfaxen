import { useEffect, useRef, useState } from "preact/hooks";

interface DecodeTextProps {
  text: string;
  className?: string;
  trigger?: boolean; // If true, triggers animation on mount/change
  scramble?: boolean; // If true, continuously scrambles before resolving
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+";

export default function DecodeText({
  text,
  className = "",
  trigger = true,
  scramble = false,
}: DecodeTextProps) {
  const [display, setDisplay] = useState(scramble ? "" : text);
  const intervalRef = useRef<number | null>(null);
  const iterations = useRef(0);

  useEffect(() => {
    if (!trigger) return;

    if (scramble) {
      // Scramble Effect (Matrix style)
      iterations.current = 0;

      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        setDisplay(
          text
            .split("")
            .map((_char, index) => {
              if (index < iterations.current) {
                return text[index];
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join(""),
        );

        if (iterations.current >= text.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
        }

        iterations.current += 1 / 3; // Speed of resolution
      }, 30);
    } else {
      // Simple Fade/Type effect (Original)
      setDisplay(text);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, trigger, scramble]);

  return <span class={className}>{display}</span>;
}
