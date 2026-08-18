import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { Button } from "../components/ui/Button";
import { Reveal } from "../components/ui/Reveal";

export function NewsDetailPage() {
  const { id } = useParams();
  const { getNews, news } = useStore();
  const item = getNews(id || "");

  if (!item) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-5">
        <h1 className="font-display text-3xl">Материал не найден</h1>
        <Button to="/news" className="mt-6" variant="outline">
          Ко всем новостям
        </Button>
      </div>
    );
  }

  const related = news.filter((n) => n.id !== item.id).slice(0, 2);

  return (
    <article className="bg-paper pt-28 md:pt-36">
      <div className="mx-auto max-w-3xl px-5 pb-20 md:px-8 md:pb-28">
        <Reveal>
          <Link
            to="/news"
            className="mb-8 inline-flex items-center gap-2 text-sm text-stone transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            Все новости
          </Link>

          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.14em] text-mist">
            <span>{item.category}</span>
            <span className="h-0.5 w-0.5 rounded-full bg-mist" />
            <span>
              {new Date(item.date).toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <h1 className="mt-4 font-display text-3xl leading-tight md:text-5xl text-balance">
            {item.title}
          </h1>
          <p className="mt-5 text-lg text-stone">{item.excerpt}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 overflow-hidden rounded-3xl">
            <img
              src={item.image}
              alt={item.title}
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="prose-nv mt-10 space-y-5 text-[15px] leading-relaxed text-stone md:text-base">
            {item.content.split("\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>
      </div>

      {related.length > 0 && (
        <section className="border-t border-ink/6 bg-paper-soft py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <h2 className="font-display text-2xl md:text-3xl">Читайте также</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {related.map((n) => (
                <Link
                  key={n.id}
                  to={`/news/${n.id}`}
                  className="group flex gap-5 rounded-2xl border border-ink/8 bg-white p-4 transition-all hover:shadow-lg hover:shadow-ink/5"
                >
                  <div className="h-24 w-28 shrink-0 overflow-hidden rounded-xl">
                    <img
                      src={n.image}
                      alt={n.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.14em] text-mist">
                      {n.category}
                    </div>
                    <h3 className="mt-1 font-display text-lg leading-snug">
                      {n.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
