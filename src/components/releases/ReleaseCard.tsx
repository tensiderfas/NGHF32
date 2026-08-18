import { Link } from "react-router-dom";
import type { Release } from "../../types";
import { cn } from "../../utils/cn";

interface Props {
  release: Release;
  className?: string;
}

const typeLabel: Record<Release["type"], string> = {
  single: "Single",
  ep: "EP",
  album: "Album",
};

export function ReleaseCard({ release, className }: Props) {
  const date = new Date(release.date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Link
      to={`/releases/${release.id}`}
      className={cn("group block", className)}
    >
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-paper-soft">
        <img
          src={release.cover}
          alt={release.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink backdrop-blur-sm">
          {typeLabel[release.type]}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-display text-lg leading-tight transition-opacity group-hover:opacity-60">
          {release.title}
        </h3>
        <p className="mt-1 text-sm text-stone">{release.artistName}</p>
        <p className="mt-1 text-xs text-mist">{date}</p>
      </div>
    </Link>
  );
}
