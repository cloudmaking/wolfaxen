import { useEffect, useRef } from "preact/hooks";
import anime from "https://esm.sh/animejs@3.2.2";

interface CryptoTextProps {
  text: string;
  className?: string;
}

export default function CryptoText({ text, className = "" }: CryptoTextProps) {
  const isAnimating = useRef(false);
  const elementRef = useRef<HTMLElement>(null);

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*";

  const animate = () => {
    if (isAnimating.current || !elementRef.current) return;
    isAnimating.current = true;

    const target = elementRef.current;
    const originalText = text.split("");

    const animationObj = { value: 0 };

    anime({
      targets: animationObj,
      value: 1,
      duration: 800,
      easing: "easeOutQuad",
      update: (anim) => {
        const progress = Math.floor(anim.progress); // 0 to 100

        // Construct the scrambled string
        const newText = originalText.map((letter, index) => {
          // If the animation is far enough along, show the real letter
          if (index * 4 < progress) return letter;
          // Otherwise show a random char
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("");

        target.innerText = newText;
      },
      complete: () => {
        target.innerText = text; // Ensure it ends clean
        isAnimating.current = false;
      },
    });
  };

  useEffect(() => {
    // Trigger animation on mount
    animate();
  }, []);

  return (
    <span
      ref={elementRef}
      onMouseEnter={animate}
      class={`inline-block cursor-default ${className}`}
    >
      {text}
    </span>
  );
}
