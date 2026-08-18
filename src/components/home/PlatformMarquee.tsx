import { PLATFORMS } from "../../data/defaultData";

export function PlatformMarquee({ dark = false }: { dark?: boolean }) {
  const items = [...PLATFORMS, ...PLATFORMS];

  return (
    <div
      className={`relative overflow-hidden border-y ${
        dark
          ? "border-white/10 bg-ink text-white/40"
          : "border-ink/8 bg-paper text-stone"
      }`}
    >
      <div className="flex animate-marquee whitespace-nowrap py-4">
        {items.map((p, i) => (
          <span
            key={`${p}-${i}`}
            className="mx-6 inline-flex items-center gap-6 text-xs font-medium uppercase tracking-[0.2em] md:mx-10"
          >
            {p}
            <span
              className={`h-1 w-1 rounded-full ${
                dark ? "bg-white/20" : "bg-ink/20"
              }`}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
