import { Reveal } from "./Reveal";
import { cn } from "../../utils/cn";

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  dark?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function PageHero({
  eyebrow,
  title,
  description,
  dark = false,
  children,
  className,
}: Props) {
  return (
    <section
      className={cn(
        "relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24",
        dark ? "bg-ink text-white grid-bg-dark" : "bg-paper grid-bg",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          {eyebrow && (
            <div
              className={cn(
                "mb-5 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em]",
                dark ? "text-white/45" : "text-stone"
              )}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  dark ? "bg-accent" : "bg-ink"
                )}
              />
              {eyebrow}
            </div>
          )}
          <h1
            className={cn(
              "font-display max-w-4xl text-4xl leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl text-balance",
              dark ? "text-white" : "text-ink"
            )}
          >
            {title}
          </h1>
          {description && (
            <p
              className={cn(
                "mt-6 max-w-2xl text-base leading-relaxed md:text-lg",
                dark ? "text-white/55" : "text-stone"
              )}
            >
              {description}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}
