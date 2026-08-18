import { useMemo, useState } from "react";
import { useStore } from "../context/StoreContext";
import { PageHero } from "../components/ui/PageHero";
import { ArtistCard } from "../components/artists/ArtistCard";
import { Stagger, StaggerItem } from "../components/ui/Reveal";
import { cn } from "../utils/cn";

export function ArtistsPage() {
  const { artists } = useStore();
  const genres = useMemo(() => {
    const set = new Set(artists.map((a) => a.genre));
    return ["Все", ...Array.from(set)];
  }, [artists]);
  const [filter, setFilter] = useState("Все");

  const filtered =
    filter === "Все" ? artists : artists.filter((a) => a.genre === filter);

  return (
    <>
      <PageHero
        eyebrow="Ростер"
        title="Артисты NIGHTVOLT"
        description="Люди, с которыми мы выпускаем музыку, строим каталог и развиваем звук лейбла. Каждый — со своим голосом и траекторией."
      />

      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-10 flex flex-wrap gap-2">
            {genres.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setFilter(g)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-medium tracking-wide transition-all",
                  filter === g
                    ? "bg-ink text-paper"
                    : "bg-white border border-ink/10 text-stone hover:border-ink/25 hover:text-ink"
                )}
              >
                {g}
              </button>
            ))}
          </div>

          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {filtered.map((a) => (
              <StaggerItem key={a.id}>
                <ArtistCard artist={a} large />
              </StaggerItem>
            ))}
          </Stagger>

          {filtered.length === 0 && (
            <p className="py-20 text-center text-stone">Артисты не найдены</p>
          )}
        </div>
      </section>
    </>
  );
}
