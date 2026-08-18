import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useStore } from "../context/StoreContext";
import { Button } from "../components/ui/Button";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "../components/ui/Reveal";
import { ArtistCard } from "../components/artists/ArtistCard";
import { ReleaseCard } from "../components/releases/ReleaseCard";
import { PlatformMarquee } from "../components/home/PlatformMarquee";
import { FaqAccordion } from "../components/home/FaqAccordion";
import {
  FAQ_ITEMS,
  PARTNERS,
  SERVICES,
  STATS,
} from "../data/defaultData";

export function HomePage() {
  const { artists, releases, news, settings } = useStore();
  const featuredArtists = artists.filter((a) => a.featured).slice(0, 4);
  const latestReleases = [...releases]
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 4);
  const latestNews = news.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100svh] overflow-hidden bg-ink text-white grid-bg-dark">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-white/[0.03] blur-3xl" />
          <div className="absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
        </div>

        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pb-24 pt-32 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/60 backdrop-blur"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            Лейбл &amp; дистрибуция — с 2025
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(3.2rem,12vw,9.5rem)] leading-[0.9] tracking-[-0.04em]"
          >
            {settings.heroTitle.split("\n").map((line, i) => (
              <span
                key={i}
                className={`block ${i % 2 === 1 ? "text-white/35" : "text-white"}`}
              >
                {line}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-8 max-w-lg text-base text-white/50 md:text-lg"
          >
            {settings.heroSubtitle}. Занимайтесь творчеством — остальное берём
            на себя.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button
              to="/apply"
              variant="dark"
              size="lg"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              Начать сейчас
            </Button>
            <Link
              to="/artists"
              className="group inline-flex items-center gap-3 px-2 text-sm text-white/55 transition-colors hover:text-white"
            >
              <span className="h-px w-8 bg-white/30 transition-all group-hover:w-12 group-hover:bg-white" />
              Наши артисты
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="absolute bottom-8 right-5 hidden md:block md:right-8"
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
              <div className="font-display text-3xl text-white">60+</div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.16em] text-white/40">
                Платформ
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <PlatformMarquee dark />

      {/* ABOUT TEASER */}
      <section className="bg-ink py-24 text-white md:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 md:grid-cols-2 md:gap-20 md:px-8">
          <Reveal>
            <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-white/40">
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              О нас
            </div>
            <h2 className="font-display text-4xl leading-[1.05] md:text-5xl lg:text-6xl">
              Создано
              <br />
              <span className="text-white/35">артистами</span>
              <br />
              для артистов
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/50">
              {settings.aboutText}
            </p>
            <div className="mt-8">
              <Link
                to="/about"
                className="group inline-flex items-center gap-3 text-sm font-medium text-white"
              >
                <span className="h-px w-8 bg-white/40 transition-all group-hover:w-12" />
                Узнать больше
              </Link>
            </div>
          </Reveal>

          <Stagger className="grid grid-cols-2 gap-3 md:gap-4">
            {STATS.map((s) => (
              <StaggerItem key={s.label}>
                <div className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
                  <div className="font-display text-4xl md:text-5xl">{s.value}</div>
                  <div className="mt-6 text-[11px] uppercase tracking-[0.16em] text-white/40">
                    {s.label}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Услуги"
              title="Всё, что нужно артисту"
              description="От первой загрузки трека до стратегии карьеры — в одной экосистеме."
            />
            <Button to="/distribution" variant="outline" className="shrink-0 self-start md:self-auto">
              Подробнее о дистрибуции
            </Button>
          </div>

          <Stagger className="mt-14 grid gap-4 md:grid-cols-2">
            {SERVICES.map((s, i) => (
              <StaggerItem key={s.id}>
                <div className="group h-full rounded-3xl border border-ink/8 bg-white p-7 transition-all duration-500 hover:border-ink/15 hover:shadow-xl hover:shadow-ink/5 md:p-9">
                  <div className="flex items-start justify-between">
                    <span className="font-display text-4xl text-ink/10 transition-colors group-hover:text-ink/20">
                      0{i + 1}
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-ink/20 transition-all duration-300 group-hover:text-ink" />
                  </div>
                  <h3 className="mt-8 font-display text-2xl">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone">
                    {s.desc}
                  </p>
                  <ul className="mt-6 grid grid-cols-2 gap-2">
                    {s.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-center gap-2 text-xs text-ink/70"
                      >
                        <Check className="h-3.5 w-3.5 shrink-0 text-ink" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* RELEASES */}
      <section className="border-t border-ink/6 bg-paper-soft py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Каталог"
              title="Последние релизы"
              description="Новая музыка от артистов NIGHTVOLT — на всех площадках."
            />
            <Button to="/releases" variant="outline">
              Все релизы
            </Button>
          </div>
          <Stagger className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {latestReleases.map((r) => (
              <StaggerItem key={r.id}>
                <ReleaseCard release={r} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ARTISTS */}
      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Ростер"
              title="Артисты"
              description="Люди, с которыми мы строим каталог и звук лейбла."
            />
            <Button to="/artists" variant="outline">
              Весь ростер
            </Button>
          </div>
          <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-5">
            {featuredArtists.map((a) => (
              <StaggerItem key={a.id}>
                <ArtistCard artist={a} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA JOIN */}
      <section className="relative overflow-hidden bg-ink py-24 text-white md:py-32">
        <div className="pointer-events-none absolute inset-0 grid-bg-dark opacity-60" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-white/40">
                Присоединяйтесь
              </div>
              <h2 className="font-display text-4xl leading-[1.05] md:text-5xl lg:text-6xl">
                Занимайтесь творчеством.
                <br />
                <span className="text-white/35">Остальное — NIGHTVOLT.</span>
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/50">
                Мы ценим прозрачность и уважение к артисту. Хотите узнать
                условия — оставьте заявку, мы свяжемся в течение 24 часов.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  to="/apply"
                  variant="secondary"
                  size="lg"
                  icon={<ArrowRight className="h-4 w-4" />}
                >
                  Подать заявку
                </Button>
                <Button to="/contact" variant="light" size="lg">
                  Связаться
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10">
                <h3 className="font-display text-2xl">Почему с нами</h3>
                <ul className="mt-8 space-y-5">
                  {[
                    "До 100% роялти на дистрибуции",
                    "Выход на 60+ площадок по миру",
                    "Честный договор без серых схем",
                    "Поддержка 24/7 и личный менеджер",
                    "A&R, маркетинг и стратегия роста",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3 text-sm text-white/70">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20">
                        <Check className="h-3 w-3 text-accent" />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="bg-paper py-24 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-4">
              <SectionHeading
                eyebrow="Экосистема"
                title="Наши партнёры"
                description="Сотрудничаем с крупными лейблами и работаем с артистами напрямую."
              />
            </div>
            <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:col-span-8">
              {PARTNERS.map((p) => (
                <StaggerItem key={p.name}>
                  <div className="flex aspect-[5/3] flex-col items-center justify-center rounded-2xl border border-ink/8 bg-white transition-colors hover:border-ink/15">
                    <span className="font-display text-2xl text-ink/80">
                      {p.letter}
                    </span>
                    <span className="mt-2 text-[10px] uppercase tracking-[0.14em] text-mist">
                      {p.name}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className="border-t border-ink/6 bg-paper-soft py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Блог"
              title="Новости и материалы"
              description="Индустрия, гайды и то, что помогает артисту расти."
            />
            <Button to="/news" variant="outline">
              Все новости
            </Button>
          </div>
          <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
            {latestNews.map((n) => (
              <StaggerItem key={n.id}>
                <Link
                  to={`/news/${n.id}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink/8 bg-white transition-all duration-500 hover:shadow-xl hover:shadow-ink/5"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={n.image}
                      alt={n.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
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
                    <h3 className="mt-3 font-display text-xl leading-snug transition-opacity group-hover:opacity-60">
                      {n.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-stone">
                      {n.excerpt}
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* FAQ mini */}
      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading
                eyebrow="FAQ"
                title="Остались вопросы?"
                description="Коротко о главном. Полный список — на странице вопросов."
              />
              <div className="mt-8">
                <Button to="/faq" variant="outline">
                  Все вопросы
                </Button>
              </div>
            </div>
            <div className="lg:col-span-8">
              <FaqAccordion items={FAQ_ITEMS.slice(0, 5)} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
