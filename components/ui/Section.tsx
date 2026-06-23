import clsx from "clsx";
import { Reveal } from "@/components/ui/Reveal";

// Wrapper di sezione: padding, max-width, ancora, fade-in dell'header.

type Props = {
  id: string;
  eyebrow?: string;
  title?: string;
  className?: string;
  containerClassName?: string;
  tone?: "schiuma" | "white" | "sabbia" | "adriatico";
  /** se false, non applica il fade-in all'header */
  reveal?: boolean;
  children: React.ReactNode;
};

const tones: Record<NonNullable<Props["tone"]>, string> = {
  schiuma: "bg-schiuma-50",
  white: "bg-white",
  sabbia: "bg-sabbia-50",
  adriatico: "bg-adriatico-950 text-schiuma-50",
};

export function Section({
  id,
  eyebrow,
  title,
  className,
  containerClassName,
  tone = "schiuma",
  reveal = true,
  children,
}: Props) {
  const headerNode = (eyebrow || title) && (
    <header className="mb-10 sm:mb-14 max-w-3xl">
      {eyebrow && (
        <p
          className={clsx(
            "mb-3 text-xs uppercase tracking-widest2",
            tone === "adriatico" ? "text-schiuma-100/70" : "text-adriatico-700/80"
          )}
        >
          {eyebrow}
        </p>
      )}
      {title && (
        <h2
          className={clsx(
            "font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight",
            tone === "adriatico" ? "text-schiuma-50" : "text-pietra-950"
          )}
        >
          {title}
        </h2>
      )}
    </header>
  );

  return (
    <section
      id={id}
      className={clsx(
        "w-full px-5 sm:px-8 py-20 sm:py-28 lg:py-32",
        tones[tone],
        className
      )}
    >
      <div className={clsx("mx-auto w-full max-w-content", containerClassName)}>
        {headerNode && (reveal ? <Reveal>{headerNode}</Reveal> : headerNode)}
        {reveal ? <Reveal delay={120}>{children}</Reveal> : children}
      </div>
    </section>
  );
}
