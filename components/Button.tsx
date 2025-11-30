import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  href?: string;
}

export default function Button(props: ButtonProps) {
  const { variant = "primary", className = "", href, children, ...rest } =
    props;

  const baseStyles =
    "inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-oreo-black disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-muted-gold text-oreo-black hover:bg-light-gold hover:shadow-[0_0_20px_rgba(185,176,123,0.4)] focus:ring-muted-gold font-bold tracking-wide",
    secondary:
      "bg-deep-olive/20 text-warm-beige border border-deep-olive/50 hover:bg-deep-olive/40 hover:border-muted-gold focus:ring-deep-olive backdrop-blur-sm",
    outline:
      "border border-muted-gold text-muted-gold hover:bg-muted-gold hover:text-oreo-black focus:ring-muted-gold",
  };

  const styles = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        class={styles}
        {...(rest as unknown as JSX.HTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      {...rest}
      disabled={!IS_BROWSER || props.disabled}
      class={styles}
    >
      {children}
    </button>
  );
}
