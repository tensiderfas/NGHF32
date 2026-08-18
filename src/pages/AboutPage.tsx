import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageHero } from "../components/ui/PageHero";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Button } from "../components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "../components/ui/Reveal";
import { useStore } from "../context/StoreContext";
import { STATS } from "../data/defaultData";

const VALUES = [
  {
    title: "Прозрачность",
    text: "Понятные договоры, открытая аналитика и честные выплаты. Без серых схем и мелкого шрифта.",
  },
  {
    title: "Уважение к артисту",
    text: "Мы сами из индустрии. Знаем, как важно сохранять контроль над творчеством и правами.",
  },
  {
    title: "Системный рост",
    text: "Не разовые «хайпы», а стратегия: релиз → аудитория → монетизация → следующий уровень.",
  },
  {
    title: "Качество",
    text: "Работаем только с материалом, в который верим. Ростер — это кураторский выбор, не конвейер.",
  },
];

const TIMELINE = [
  {
    year: "2025",
    title: "Запуск NIGHTVOLT",
    text: "Команда музыкантов и менеджеров объединяется, чтобы построить лейбл и дистрибуцию нового типа.",
  },
  {
    year: "2025",
    title: "Первый ростер",
    text: "Подписываем первых артистов, выстраиваем пайплайн релизов и партнёрства с площадками.",
  },
  {
    year: "2026",
    title: "Масштаб",
    text: "Расширяем каталог, запускаем полный цикл A&R и маркетинга, выходим на международные рынки.",
  },
];

export function AboutPage() {
  const { settings, artists } = useStore();

  return (
    <>
      <PageHero
        eyebrow="О компании"
        title="Создано артистами для артистов"
        description={settings.aboutText}
      />

      {/* Stats */}
      <section className="border-y border-ink/6 bg-paper-soft py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Stagger className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {STATS.map((s) => (
              <StaggerItem key={s.label}>
                <div className="text-center md:text-left">
                  <div className="font-display text-4xl md:text-5xl">{s.value}</div>
                  <div className="mt-2 text-[11px] uppercase tracking-[0.16em] text-mist">
                    {s.label}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Story */}
      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 md:grid-cols-2 md:gap-20 md:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="История"
              title="Независимый лейбл с 2025 года"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-5 text-[15px] leading-relaxed text-stone">
              <p>
                NIGHTVOLT появился из простого наблюдения: слишком много
                талантливых артистов теряют время на бюрократию, непрозрачные
                условия и сервисы, которым всё равно на их музыку.
              </p>
              <p>
                Мы собрали команду, которая сама прошла путь артиста, менеджера
                и дистрибьютора. Знаем обе стороны стола — и строим сервис, в
                котором удобно и честно обеим.
              </p>
              <p>
                Сегодня NIGHTVOLT — это лейбл с кураторским ростером и цифровая
                дистрибуция с выходом на 60+ площадок. Один бренд, два сильных
                направления, одна цель: чтобы артист думал о музыке, а не о
                логистике.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-ink py-24 text-white md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            light
            eyebrow="Принципы"
            title="На чём держится NIGHTVOLT"
          />
          <Stagger className="mt-14 grid gap-4 sm:grid-cols-2">
            {VALUES.map((v, i) => (
              <StaggerItem key={v.title}>
                <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-8">
                  <div className="font-display text-4xl text-white/10">
                    0{i + 1}
                  </div>
                  <h3 className="mt-6 font-display text-2xl">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/50">
                    {v.text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading eyebrow="Путь" title="Как мы растём" />
          <div className="mt-14 space-y-0">
            {TIMELINE.map((t, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="grid gap-4 border-t border-ink/10 py-8 md:grid-cols-12 md:gap-8">
                  <div className="font-display text-2xl text-ink/30 md:col-span-2">
                    {t.year}
                  </div>
                  <div className="md:col-span-3">
                    <h3 className="font-display text-xl">{t.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-stone md:col-span-7">
                    {t.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Roster teaser */}
      <section className="border-t border-ink/6 bg-paper-soft py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Люди"
              title={`${artists.length} артистов в ростере`}
              description="И это только начало. Мы растём вместе с теми, кому доверяем."
            />
            <Button to="/artists" variant="outline">
              Смотреть ростер
            </Button>
          </div>
          <Stagger className="mt-12 flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {artists.slice(0, 6).map((a) => (
              <StaggerItem key={a.id} className="w-40 shrink-0 sm:w-48">
                <Link to={`/artists/${a.id}`} className="group block">
                  <div className="aspect-square overflow-hidden rounded-2xl">
                    <img
                      src={a.image}
                      alt={a.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-3 font-display text-sm">{a.name}</div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-paper py-24 md:py-28">
        <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl">
              Хотите быть частью NIGHTVOLT?
            </h2>
            <p className="mx-auto mt-5 max-w-md text-stone">
              Лейбл, дистрибуция или оба направления — расскажите о себе, и мы
              найдём формат работы.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button
                to="/apply"
                size="lg"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                Подать заявку
              </Button>
              <Button to="/contact" variant="outline" size="lg">
                Контакты
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
