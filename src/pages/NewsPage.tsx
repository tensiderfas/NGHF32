import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { PageHero } from "../components/ui/PageHero";
import { Stagger, StaggerItem } from "../components/ui/Reveal";

export function NewsPage() {
  const { news } = useStore();
  const sorted = [...news].sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return (
    <>
      <PageHero
        eyebrow="Блог"
        title="Новости и материалы"
        description="Индустрия, практические гайды и то, что помогает артисту принимать решения."
      />

      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sorted.map((n) => (
              <StaggerItem key={n.id}>
                <Link
                  to={`/news/${n.id}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink/8 bg-white transition-all duration-500 hover:shadow-xl hover:shadow-ink/5"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-paper-soft">
                    <img
                      src={n.image}
                      alt={n.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.14em] text-mist">
                      <span>{n.category}</span>
                      <span className="h-0.5 w-0.5 rounded-full bg-mist" />
                      <span>
                        {new Date(n.date).toLocaleDateString("ru-RU", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <h2 className="mt-3 font-display text-xl leading-snug md:text-2xl transition-opacity group-hover:opacity-60">
                      {n.title}
                    </h2>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-stone">
                      {n.excerpt}
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
