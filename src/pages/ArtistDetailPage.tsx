import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { ReleaseCard } from "../components/releases/ReleaseCard";
import { Button } from "../components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "../components/ui/Reveal";

export function ArtistDetailPage() {
  const { id } = useParams();
  const { getArtist, releases, artists } = useStore();
  const artist = getArtist(id || "");

  if (!artist) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-5">
        <h1 className="font-display text-3xl">Артист не найден</h1>
        <Button to="/artists" className="mt-6" variant="outline">
          К ростеру
        </Button>
      </div>
    );
  }

  const artistReleases = releases.filter((r) => r.artistId === artist.id);
  const related = artists.filter((a) => a.id !== artist.id).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-ink pt-28 text-white md:pt-32">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 md:grid-cols-2 md:items-end md:gap-16 md:px-8 md:pb-24">
          <Reveal>
            <Link
              to="/artists"
              className="mb-8 inline-flex items-center gap-2 text-sm text-white/45 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Все артисты
            </Link>
            <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
              {artist.genre} · {artist.role}
            </div>
            <h1 className="mt-4 font-display text-5xl leading-none md:text-7xl">
              {artist.name}
            </h1>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/55">
              {artist.bio}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {artist.spotify && (
                <a
                  href={artist.spotify}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-ink transition-opacity hover:opacity-90"
                >
                  Spotify
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
              {artist.instagram && (
                <a
                  href={artist.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  Instagram
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-3xl">
              <img
                src={artist.image}
                alt={artist.name}
                className="aspect-[4/5] w-full object-cover md:aspect-[3/4]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {artistReleases.length > 0 && (
        <section className="bg-paper py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <h2 className="font-display text-3xl md:text-4xl">Релизы</h2>
            <Stagger className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {artistReleases.map((r) => (
                <StaggerItem key={r.id}>
                  <ReleaseCard release={r} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="border-t border-ink/6 bg-paper-soft py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="flex items-end justify-between">
              <h2 className="font-display text-3xl md:text-4xl">Ещё из ростера</h2>
              <Button to="/artists" variant="outline" size="sm">
                Все
              </Button>
            </div>
            <Stagger className="mt-10 grid gap-4 sm:grid-cols-3 md:gap-5">
              {related.map((a) => (
                <StaggerItem key={a.id}>
                  <Link
                    to={`/artists/${a.id}`}
                    className="group block overflow-hidden rounded-2xl"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={a.image}
                        alt={a.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-3">
                      <div className="font-display text-lg">{a.name}</div>
                      <div className="text-sm text-stone">{a.genre}</div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}
    </>
  );
}
