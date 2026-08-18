import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Artist } from "../../types";
import { cn } from "../../utils/cn";

interface Props {
  artist: Artist;
  className?: string;
  large?: boolean;
}

export function ArtistCard({ artist, className, large }: Props) {
  return (
    <Link
      to={`/artists/${artist.id}`}
      className={cn(
        "group relative block overflow-hidden rounded-2xl bg-ink-soft",
        large ? "aspect-[4/5]" : "aspect-[3/4]",
        className
      )}
    >
      <img
        src={artist.image}
        alt={artist.name}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-500" />
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/50">
              {artist.genre}
            </div>
            <h3 className="mt-1 font-display text-xl text-white md:text-2xl">
              {artist.name}
            </h3>
            <p className="mt-1 text-sm text-white/55">{artist.role}</p>
          </div>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
