import { Link } from "react-router-dom";
import { ArrowUpRight, FileText, Handshake, Inbox, Users } from "lucide-react";
import { useStore } from "../../context/StoreContext";

export function AdminDashboard() {
  const { artists, partners, news, applications } = useStore();
  const newApps = applications.filter((a) => a.status === "new");

  const cards = [
    { label: "Артисты", value: artists.length, to: "/nv-console/artists", icon: Users },
    { label: "Партнёры", value: partners.length, to: "/nv-console/partners", icon: Handshake },
    { label: "Новости", value: news.length, to: "/nv-console/news", icon: FileText },
    {
      label: "Новые заявки",
      value: newApps.length,
      to: "/nv-console/applications",
      icon: Inbox,
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl">Обзор</h1>
        <p className="mt-1 text-sm text-stone">
          Управление контентом сайта NIGHTVOLT
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            to={c.to}
            className="group rounded-2xl border border-ink/8 bg-white p-5 transition hover:border-ink/15 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-paper-soft">
                <c.icon className="h-4 w-4" />
              </span>
              <ArrowUpRight className="h-4 w-4 text-mist transition group-hover:text-ink" />
            </div>
            <div className="mt-6 font-display text-3xl">{c.value}</div>
            <div className="mt-1 text-sm text-stone">{c.label}</div>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-ink/8 bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg">Последние артисты</h2>
            <Link
              to="/nv-console/artists"
              className="text-xs text-stone hover:text-ink"
            >
              Все
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-ink/6">
            {artists.slice(0, 5).map((a) => (
              <li key={a.id} className="flex items-center gap-3 py-3">
                <img
                  src={a.image}
                  alt=""
                  className="h-10 w-10 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{a.name}</div>
                  <div className="text-xs text-mist">{a.genre}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-ink/8 bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg">Новые заявки</h2>
            <Link
              to="/nv-console/applications"
              className="text-xs text-stone hover:text-ink"
            >
              Все
            </Link>
          </div>
          {newApps.length === 0 ? (
            <p className="mt-8 text-center text-sm text-mist">Нет новых заявок</p>
          ) : (
            <ul className="mt-4 divide-y divide-ink/6">
              {newApps.slice(0, 5).map((a) => (
                <li key={a.id} className="py-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-medium">{a.name}</div>
                    <span className="rounded-full bg-accent/40 px-2 py-0.5 text-[10px] font-semibold uppercase">
                      {a.type}
                    </span>
                  </div>
                  <div className="mt-0.5 text-xs text-mist">{a.email}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
