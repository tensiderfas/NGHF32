import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import {
  Disc3,
  FileText,
  Inbox,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
} from "lucide-react";
import { useStore } from "../../context/StoreContext";
import { cn } from "../../utils/cn";

const NAV = [
  { to: "/nv-console", label: "Обзор", icon: LayoutDashboard, end: true },
  { to: "/nv-console/artists", label: "Артисты", icon: Users },
  { to: "/nv-console/releases", label: "Релизы", icon: Disc3 },
  { to: "/nv-console/news", label: "Новости", icon: FileText },
  { to: "/nv-console/applications", label: "Заявки", icon: Inbox },
  { to: "/nv-console/settings", label: "Настройки", icon: Settings },
];

export function AdminLayout() {
  const { isAuthenticated, logout, applications } = useStore();
  const navigate = useNavigate();
  const newApps = applications.filter((a) => a.status === "new").length;

  if (!isAuthenticated) {
    return <Navigate to="/nv-console/gate" replace />;
  }

  return (
    <div className="flex min-h-screen bg-[#f3f2ee] text-ink">
      <aside className="sticky top-0 flex h-screen w-60 shrink-0 flex-col border-r border-ink/8 bg-white">
        <div className="flex h-16 items-center gap-2.5 border-b border-ink/8 px-5">
          <span className="relative flex h-7 w-7 items-center justify-center">
            <span className="absolute inset-0 rotate-45 rounded-[5px] border border-ink/70" />
            <span className="h-1.5 w-1.5 rounded-sm bg-ink" />
          </span>
          <div>
            <div className="text-xs font-semibold tracking-[0.14em]">
              NIGHTVOLT
            </div>
            <div className="text-[10px] uppercase tracking-[0.16em] text-mist">
              Console
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-0.5 p-3">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                  isActive
                    ? "bg-ink text-paper"
                    : "text-stone hover:bg-ink/5 hover:text-ink"
                )
              }
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.to.includes("applications") && newApps > 0 && (
                <span className="rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-semibold text-ink">
                  {newApps}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-ink/8 p-3">
          <button
            type="button"
            onClick={() => {
              logout();
              navigate("/nv-console/gate");
            }}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-stone transition-colors hover:bg-ink/5 hover:text-ink"
          >
            <LogOut className="h-4 w-4" />
            Выйти
          </button>
        </div>
      </aside>

      <main className="admin-scroll flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl px-6 py-8 md:px-10 md:py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
