import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { Button } from "../components/ui/Button";
import { ReleaseCard } from "../components/releases/ReleaseCard";
import { Reveal, Stagger, StaggerItem } from "../components/ui/Reveal";
import { PLATFORMS } from "../data/defaultData";

const typeLabel = { single: "Single", ep: "EP", album: "Album" } as const;

export function ReleaseDetailPage() {
  const { id } = useParams();
  const { getRelease, releases, getArtist } = useStore();
  const release = getRelease(id || "");

  if (!release) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-5">
        <h1 className="font-display text-3xl">Релиз не найден</h1>
        <Button to="/releases" className="mt-6" variant="outline">
          К каталогу
        </Button>
      </div>
    );
  }

  const artist = getArtist(release.artistId);
  const related = releases.filter((r) => r.id !== release.id).slice(0, 4);
  const date = new Date(release.date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <section className="bg-paper pt-28 md:pt-36">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-20 md:grid-cols-2 md:items-center md:gap-16 md:px-8 md:pb-28">
          <Reveal>
            <div className="overflow-hidden rounded-3xl bg-paper-soft shadow-2xl shadow-ink/10">
              <img
                src={release.cover}
                alt={release.title}
                className="aspect-square w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Link
              to="/releases"
              className="mb-6 inline-flex items-center gap-2 text-sm text-stone transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" />
              Все релизы
            </Link>
            <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-mist">
              {typeLabel[release.type]} · {date}
            </div>
            <h1 className="mt-3 font-display text-4xl leading-none md:text-6xl">
              {release.title}
            </h1>
            {artist ? (
              <Link
                to={`/artists/${artist.id}`}
                className="mt-4 inline-flex items-center gap-1.5 text-lg text-stone transition-colors hover:text-ink"
              >
                {release.artistName}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            ) : (
              <p className="mt-4 text-lg text-stone">{release.artistName}</p>
            )}

            <div className="mt-10">
              <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-mist">
                Слушать на
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {PLATFORMS.slice(0, 8).map((p) => (
                  <span
                    key={p}
                    className="rounded-full border border-ink/10 bg-white px-3.5 py-2 text-xs text-stone"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {release.link && (
              <div className="mt-8">
                <a
                  href={release.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-medium text-paper transition-opacity hover:opacity-90"
                >
                  Открыть релиз
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-ink/6 bg-paper-soft py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <h2 className="font-display text-3xl">Ещё релизы</h2>
            <Stagger className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {related.map((r) => (
                <StaggerItem key={r.id}>
                  <ReleaseCard release={r} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}
    </>
  );
}
