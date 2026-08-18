import { useState, type FormEvent } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { useStore } from "../../context/StoreContext";
import type { NewsItem } from "../../types";

const empty = {
  title: "",
  excerpt: "",
  content: "",
  image: "",
  date: new Date().toISOString().slice(0, 10),
  category: "Новости",
};

export function AdminNews() {
  const { news, addNews, updateNews, deleteNews } = useStore();
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(empty);

  const startCreate = () => {
    setEditId(null);
    setForm(empty);
    setOpen(true);
  };

  const startEdit = (n: NewsItem) => {
    setEditId(n.id);
    setForm({
      title: n.title,
      excerpt: n.excerpt,
      content: n.content,
      image: n.image,
      date: n.date,
      category: n.category,
    });
    setOpen(true);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    if (editId) updateNews(editId, form);
    else addNews(form);
    setOpen(false);
  };

  const onFile = (file?: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setForm((f) => ({ ...f, image: reader.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl">Новости</h1>
          <p className="mt-1 text-sm text-stone">{news.length} материалов</p>
        </div>
        <button
          type="button"
          onClick={startCreate}
          className="inline-flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-medium text-paper"
        >
          <Plus className="h-4 w-4" />
          Добавить
        </button>
      </div>

      <div className="space-y-3">
        {news.map((n) => (
          <div
            key={n.id}
            className="flex gap-4 rounded-2xl border border-ink/8 bg-white p-4"
          >
            <img
              src={n.image}
              alt=""
              className="h-16 w-20 shrink-0 rounded-xl object-cover"
            />
            <div className="min-w-0 flex-1">
              <div className="text-[10px] uppercase tracking-wider text-mist">
                {n.category} · {n.date}
              </div>
              <div className="truncate font-medium">{n.title}</div>
              <div className="truncate text-xs text-stone">{n.excerpt}</div>
            </div>
            <div className="flex shrink-0 gap-1">
              <button
                type="button"
                onClick={() => startEdit(n)}
                className="rounded-lg p-2 hover:bg-ink/5"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  if (confirm("Удалить?")) deleteNews(n.id);
                }}
                className="rounded-lg p-2 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-4 sm:items-center">
          <form
            onSubmit={onSubmit}
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl admin-scroll"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-xl">
                {editId ? "Редактировать" : "Новый материал"}
              </h2>
              <button type="button" onClick={() => setOpen(false)}>
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                required
                placeholder="Заголовок"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="w-full rounded-xl border border-ink/10 bg-paper px-3 py-2.5 text-sm"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  placeholder="Категория"
                  value={form.category}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, category: e.target.value }))
                  }
                  className="w-full rounded-xl border border-ink/10 bg-paper px-3 py-2.5 text-sm"
                />
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  className="w-full rounded-xl border border-ink/10 bg-paper px-3 py-2.5 text-sm"
                />
              </div>
              <textarea
                placeholder="Краткое описание"
                value={form.excerpt}
                onChange={(e) =>
                  setForm((f) => ({ ...f, excerpt: e.target.value }))
                }
                className="min-h-[70px] w-full rounded-xl border border-ink/10 bg-paper px-3 py-2.5 text-sm"
              />
              <textarea
                placeholder="Полный текст"
                value={form.content}
                onChange={(e) =>
                  setForm((f) => ({ ...f, content: e.target.value }))
                }
                className="min-h-[120px] w-full rounded-xl border border-ink/10 bg-paper px-3 py-2.5 text-sm"
              />
              <div>
                <input
                  placeholder="URL изображения"
                  value={form.image.startsWith("data:") ? "" : form.image}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, image: e.target.value }))
                  }
                  className="w-full rounded-xl border border-ink/10 bg-paper px-3 py-2.5 text-sm"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="mt-2 text-xs"
                  onChange={(e) => onFile(e.target.files?.[0])}
                />
                {form.image && (
                  <img
                    src={form.image}
                    alt=""
                    className="mt-2 h-24 w-full rounded-xl object-cover"
                  />
                )}
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" onClick={() => setOpen(false)} className="h-10 px-4 text-sm">
                Отмена
              </button>
              <button
                type="submit"
                className="h-10 rounded-full bg-ink px-5 text-sm text-paper"
              >
                Сохранить
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
