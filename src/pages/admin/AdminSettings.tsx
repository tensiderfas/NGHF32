import { useState, type FormEvent } from "react";
import { useStore } from "../../context/StoreContext";

export function AdminSettings() {
  const { settings, updateSettings } = useStore();
  const [form, setForm] = useState(settings);
  const [saved, setSaved] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl">Настройки</h1>
        <p className="mt-1 text-sm text-stone">Тексты и контакты сайта</p>
      </div>

      <form
        onSubmit={onSubmit}
        className="max-w-xl space-y-5 rounded-2xl border border-ink/8 bg-white p-6"
      >
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-stone">
            Заголовок hero (перенос — новая строка)
          </span>
          <textarea
            value={form.heroTitle}
            onChange={(e) =>
              setForm((f) => ({ ...f, heroTitle: e.target.value }))
            }
            className="min-h-[80px] w-full rounded-xl border border-ink/10 bg-paper px-3 py-2.5 text-sm outline-none focus:border-ink/30"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-stone">
            Подзаголовок hero
          </span>
          <input
            value={form.heroSubtitle}
            onChange={(e) =>
              setForm((f) => ({ ...f, heroSubtitle: e.target.value }))
            }
            className="w-full rounded-xl border border-ink/10 bg-paper px-3 py-2.5 text-sm outline-none focus:border-ink/30"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-stone">
            Текст о нас
          </span>
          <textarea
            value={form.aboutText}
            onChange={(e) =>
              setForm((f) => ({ ...f, aboutText: e.target.value }))
            }
            className="min-h-[120px] w-full rounded-xl border border-ink/10 bg-paper px-3 py-2.5 text-sm outline-none focus:border-ink/30"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-stone">Email</span>
          <input
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="w-full rounded-xl border border-ink/10 bg-paper px-3 py-2.5 text-sm outline-none focus:border-ink/30"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-3">
          {(["telegram", "instagram", "youtube"] as const).map((key) => (
            <label key={key} className="block">
              <span className="mb-1.5 block text-xs font-medium capitalize text-stone">
                {key}
              </span>
              <input
                value={form[key]}
                onChange={(e) =>
                  setForm((f) => ({ ...f, [key]: e.target.value }))
                }
                className="w-full rounded-xl border border-ink/10 bg-paper px-3 py-2.5 text-sm outline-none focus:border-ink/30"
              />
            </label>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="h-10 rounded-full bg-ink px-5 text-sm font-medium text-paper"
          >
            Сохранить
          </button>
          {saved && (
            <span className="text-sm text-emerald-600">Сохранено</span>
          )}
        </div>
      </form>
    </div>
  );
}
