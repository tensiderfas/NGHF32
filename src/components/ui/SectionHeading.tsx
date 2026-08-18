import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "mb-4 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em]",
            light ? "text-white/50" : "text-stone"
          )}
        >
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              light ? "bg-accent" : "bg-ink"
            )}
          />
          {eyebrow}
        </div>
      )}
      <h2
        className={cn(
          "font-display text-3xl leading-[1.1] sm:text-4xl md:text-5xl text-balance",
          light ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed md:text-lg",
            light ? "text-white/60" : "text-stone",
            align === "center" && "mx-auto max-w-2xl"
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
