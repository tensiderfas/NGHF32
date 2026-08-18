import { useMemo, useState } from "react";
import { useStore } from "../context/StoreContext";
import { PageHero } from "../components/ui/PageHero";
import { ReleaseCard } from "../components/releases/ReleaseCard";
import { Stagger, StaggerItem } from "../components/ui/Reveal";
import { cn } from "../utils/cn";
import type { Release } from "../types";

const FILTERS: Array<"all" | Release["type"]> = ["all", "single", "ep", "album"];
const LABELS: Record<string, string> = {
  all: "Все",
  single: "Single",
  ep: "EP",
  album: "Album",
};

export function ReleasesPage() {
  const { releases } = useStore();
  const [filter, setFilter] = useState<"all" | Release["type"]>("all");

  const list = useMemo(() => {
    const sorted = [...releases].sort(
      (a, b) => +new Date(b.date) - +new Date(a.date)
    );
    return filter === "all" ? sorted : sorted.filter((r) => r.type === filter);
  }, [releases, filter]);

  return (
    <>
      <PageHero
        eyebrow="Каталог"
        title="Релизы"
        description="Синглы, EP и альбомы артистов NIGHTVOLT. Вся музыка — на стриминговых площадках по всему миру."
      />

      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-10 flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-medium tracking-wide transition-all",
                  filter === f
                    ? "bg-ink text-paper"
                    : "border border-ink/10 bg-white text-stone hover:border-ink/25 hover:text-ink"
                )}
              >
                {LABELS[f]}
              </button>
            ))}
          </div>

          <Stagger className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
            {list.map((r) => (
              <StaggerItem key={r.id}>
                <ReleaseCard release={r} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
