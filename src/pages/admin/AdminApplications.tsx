import { Trash2 } from "lucide-react";
import { useStore } from "../../context/StoreContext";
import type { Application } from "../../types";
import { cn } from "../../utils/cn";

const STATUSES: Application["status"][] = [
  "new",
  "reviewed",
  "accepted",
  "rejected",
];

const STATUS_LABEL: Record<Application["status"], string> = {
  new: "Новая",
  reviewed: "Просмотрена",
  accepted: "Принята",
  rejected: "Отклонена",
};

export function AdminApplications() {
  const { applications, updateApplication, deleteApplication } = useStore();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl">Заявки</h1>
        <p className="mt-1 text-sm text-stone">
          {applications.length} всего ·{" "}
          {applications.filter((a) => a.status === "new").length} новых
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink/15 bg-white py-20 text-center text-sm text-mist">
          Заявок пока нет
        </div>
      ) : (
        <div className="space-y-3">
          {applications.map((a) => (
            <div
              key={a.id}
              className="rounded-2xl border border-ink/8 bg-white p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="font-medium">{a.name}</div>
                  <a
                    href={`mailto:${a.email}`}
                    className="text-sm text-stone hover:text-ink"
                  >
                    {a.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-paper-soft px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider">
                    {a.type}
                  </span>
                  <select
                    value={a.status}
                    onChange={(e) =>
                      updateApplication(a.id, {
                        status: e.target.value as Application["status"],
                      })
                    }
                    className={cn(
                      "rounded-full border-0 px-2.5 py-1 text-[11px] font-semibold outline-none",
                      a.status === "new" && "bg-accent/40",
                      a.status === "reviewed" && "bg-ink/10",
                      a.status === "accepted" && "bg-emerald-100 text-emerald-800",
                      a.status === "rejected" && "bg-red-50 text-red-700"
                    )}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {STATUS_LABEL[s]}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm("Удалить заявку?")) deleteApplication(a.id);
                    }}
                    className="rounded-lg p-2 text-stone hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {a.links && (
                <div className="mt-3 text-xs text-stone">
                  <span className="text-mist">Ссылки: </span>
                  {a.links}
                </div>
              )}
              {a.message && (
                <p className="mt-2 text-sm leading-relaxed text-stone">
                  {a.message}
                </p>
              )}
              <div className="mt-3 text-[11px] text-mist">
                {new Date(a.createdAt).toLocaleString("ru-RU")}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
