import { ArrowRight, Check, Clock, Globe2, Shield, Wallet } from "lucide-react";
import { PageHero } from "../components/ui/PageHero";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Button } from "../components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "../components/ui/Reveal";
import { PlatformMarquee } from "../components/home/PlatformMarquee";
import { FaqAccordion } from "../components/home/FaqAccordion";
import { FAQ_ITEMS, PLATFORMS } from "../data/defaultData";

const STEPS = [
  {
    n: "01",
    title: "Заявка",
    text: "Оставляете короткую форму — мы связываемся и уточняем детали каталога.",
  },
  {
    n: "02",
    title: "Договор",
    text: "Прозрачные условия, понятный процент, без скрытых пунктов.",
  },
  {
    n: "03",
    title: "Загрузка",
    text: "Загружаете треки и метаданные. Мы проверяем качество и права.",
  },
  {
    n: "04",
    title: "Релиз",
    text: "Музыка выходит на 60+ площадок. Вы получаете аналитику и выплаты.",
  },
];

const FEATURES = [
  {
    icon: Globe2,
    title: "60+ площадок",
    text: "Spotify, Apple Music, Яндекс, VK, TikTok и десятки международных сервисов.",
  },
  {
    icon: Wallet,
    title: "До 100% роялти",
    text: "Честная модель выплат. Вы видите отчёты по каждому треку и площадке.",
  },
  {
    icon: Clock,
    title: "Быстрый выход",
    text: "От 24 часов на основные платформы при корректных метаданных.",
  },
  {
    icon: Shield,
    title: "Защита прав",
    text: "Помощь с ISRC/UPC, Content ID и правоподтверждающими документами.",
  },
];

const COMPARE = [
  { label: "Площадки", us: "60+", them: "Ограничено" },
  { label: "Роялти артисту", us: "До 100%", them: "70–85%" },
  { label: "Скорость публикации", us: "24–72 часа", them: "До 2 недель" },
  { label: "Личный менеджер", us: "Да", them: "Не всегда" },
  { label: "Выплаты", us: "Прозрачные", them: "С задержками" },
  { label: "Перенос каталога", us: "Бесплатно", them: "Платно / сложно" },
];

export function DistributionPage() {
  return (
    <>
      <PageHero
        dark
        eyebrow="Дистрибуция"
        title="Ваша музыка — на всех площадках"
        description="Загрузили трек, заполнили данные — и релиз на Spotify, Apple Music, Яндекс Музыке и 60+ сервисах. Прозрачные выплаты, без бюрократии."
      >
        <div className="flex flex-wrap gap-3">
          <Button
            to="/apply"
            variant="secondary"
            size="lg"
            icon={<ArrowRight className="h-4 w-4" />}
          >
            Начать дистрибуцию
          </Button>
          <Button to="/faq" variant="light" size="lg">
            Частые вопросы
          </Button>
        </div>
      </PageHero>

      <PlatformMarquee />

      {/* Features */}
      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow="Преимущества"
            title="Дистрибуция без компромиссов"
            description="Инструменты уровня крупного лейбла — с человеческим подходом и честными условиями."
          />
          <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <StaggerItem key={f.title}>
                <div className="h-full rounded-3xl border border-ink/8 bg-white p-7 transition-all hover:border-ink/15 hover:shadow-lg hover:shadow-ink/5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-paper">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 font-display text-xl">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone">
                    {f.text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Steps */}
      <section className="border-t border-ink/6 bg-paper-soft py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow="Процесс"
            title="Как проходит дистрибуция"
            description="Четыре простых шага от заявки до релиза на всех площадках."
          />
          <Stagger className="mt-14 grid gap-4 md:grid-cols-4">
            {STEPS.map((s) => (
              <StaggerItem key={s.n}>
                <div className="relative h-full rounded-3xl border border-ink/8 bg-white p-7">
                  <div className="font-display text-4xl text-ink/10">{s.n}</div>
                  <h3 className="mt-6 font-display text-xl">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone">
                    {s.text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Platforms grid */}
      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow="Охват"
            title="Площадки, на которые мы доставляем"
            align="center"
          />
          <Stagger className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-2">
            {PLATFORMS.map((p) => (
              <StaggerItem key={p}>
                <span className="inline-flex rounded-full border border-ink/10 bg-white px-4 py-2.5 text-xs font-medium tracking-wide text-stone">
                  {p}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Compare */}
      <section className="bg-ink py-24 text-white md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            light
            eyebrow="Сравнение"
            title="NIGHTVOLT vs типичный дистрибьютор"
            description="Мы не прячем условия в мелком шрифте. Вот честное сравнение."
          />
          <Reveal delay={0.1}>
            <div className="mt-12 overflow-hidden rounded-3xl border border-white/10">
              <div className="grid grid-cols-3 border-b border-white/10 bg-white/5 text-[11px] uppercase tracking-[0.16em] text-white/40">
                <div className="p-4 md:p-5">Параметр</div>
                <div className="p-4 md:p-5 text-accent">NIGHTVOLT</div>
                <div className="p-4 md:p-5">Другие</div>
              </div>
              {COMPARE.map((row, i) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-3 text-sm ${
                    i !== COMPARE.length - 1 ? "border-b border-white/8" : ""
                  }`}
                >
                  <div className="p-4 text-white/50 md:p-5">{row.label}</div>
                  <div className="p-4 font-medium text-white md:p-5">
                    {row.us}
                  </div>
                  <div className="p-4 text-white/35 md:p-5">{row.them}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* What you get */}
      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-2 md:items-center md:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Включено"
              title="Что вы получаете"
              description="Не просто «загрузчик треков», а партнёр по каталогу."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="space-y-4">
              {[
                "Доставка на 60+ DSP по миру",
                "ISRC и UPC без доплат",
                "Личный кабинет с аналитикой",
                "Питчинг в редакционные плейлисты",
                "Поддержка Content ID (YouTube)",
                "Перенос существующего каталога",
                "Приоритетная поддержка в чате",
                "Возможность лейбл-сделки при росте",
              ].map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-3 rounded-2xl border border-ink/8 bg-white px-5 py-4 text-sm"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/30">
                    <Check className="h-3.5 w-3.5 text-ink" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-ink/6 bg-paper-soft py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <SectionHeading
            align="center"
            eyebrow="FAQ"
            title="Вопросы о дистрибуции"
            className="mb-12"
          />
          <FaqAccordion items={FAQ_ITEMS.slice(0, 6)} />
          <div className="mt-10 text-center">
            <Button to="/faq" variant="outline">
              Все вопросы
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink py-24 text-white md:py-28">
        <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl">
              Готовы выпустить релиз?
            </h2>
            <p className="mx-auto mt-5 max-w-md text-white/50">
              Оставьте заявку — ответим в течение суток и поможем запустить
              дистрибуцию.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button
                to="/apply"
                variant="secondary"
                size="lg"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                Подать заявку
              </Button>
              <Button to="/contact" variant="light" size="lg">
                Написать нам
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
