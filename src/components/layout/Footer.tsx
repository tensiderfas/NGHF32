import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useStore } from "../../context/StoreContext";

const LINKS = [
  {
    title: "Навигация",
    items: [
      { to: "/artists", label: "Артисты" },
      { to: "/releases", label: "Релизы" },
      { to: "/distribution", label: "Дистрибуция" },
      { to: "/about", label: "О нас" },
    ],
  },
  {
    title: "Артистам",
    items: [
      { to: "/apply", label: "Подать заявку" },
      { to: "/faq", label: "FAQ" },
      { to: "/news", label: "Новости" },
      { to: "/contact", label: "Контакты" },
    ],
  },
];

export function Footer() {
  const { settings } = useStore();

  return (
    <footer className="border-t border-ink/8 bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link to="/" className="group inline-flex items-center gap-2.5">
              <span className="relative flex h-8 w-8 items-center justify-center">
                <span className="absolute inset-0 rotate-45 rounded-[6px] border border-ink/80" />
                <span className="h-2 w-2 rounded-sm bg-ink" />
              </span>
              <span className="font-display text-[15px] tracking-[0.14em]">
                NIGHTVOLT
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-stone">
              Независимый лейбл и цифровой дистрибьютор. Создано артистами для
              артистов — с 2025 года.
            </p>
            <a
              href={`mailto:${settings.email}`}
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink transition-opacity hover:opacity-60"
            >
              {settings.email}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {LINKS.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-mist">
                {col.title}
              </div>
              <ul className="mt-4 space-y-3">
                {col.items.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="text-sm text-stone transition-colors hover:text-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-3">
            <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-mist">
              Соцсети
            </div>
            <ul className="mt-4 space-y-3">
              {[
                { href: settings.instagram, label: "Instagram" },
                { href: settings.telegram, label: "Telegram" },
                { href: settings.youtube, label: "YouTube" },
              ].map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-stone transition-colors hover:text-ink"
                  >
                    {s.label}
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ink/8 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-mist">
            © {new Date().getFullYear()} NIGHTVOLT. Все права защищены.
          </p>
          <p className="text-xs text-mist">Label & Distribution · Est. 2025</p>
        </div>
      </div>
    </footer>
  );
}
