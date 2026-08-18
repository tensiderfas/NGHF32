import { useState, type FormEvent } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { useStore } from "../../context/StoreContext";
import type { Release } from "../../types";

const empty = {
  title: "",
  artistId: "",
  artistName: "",
  cover: "",
  date: new Date().toISOString().slice(0, 10),
  type: "single" as Release["type"],
  link: "",
  featured: false,
};

export function AdminReleases() {
  const { releases, artists, addRelease, updateRelease, deleteRelease } =
    useStore();
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(empty);

  const startCreate = () => {
    setEditId(null);
    const first = artists[0];
    setForm({
      ...empty,
      artistId: first?.id || "",
      artistName: first?.name || "",
    });
    setOpen(true);
  };

  const startEdit = (r: Release) => {
    setEditId(r.id);
    setForm({
      title: r.title,
      artistId: r.artistId,
      artistName: r.artistName,
      cover: r.cover,
      date: r.date,
      type: r.type,
      link: r.link || "",
      featured: !!r.featured,
    });
    setOpen(true);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.cover.trim()) return;
    const artist = artists.find((a) => a.id === form.artistId);
    const payload = {
      ...form,
      artistName: artist?.name || form.artistName,
    };
    if (editId) updateRelease(editId, payload);
    else addRelease(payload);
    setOpen(false);
  };

  const onFile = (file?: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setForm((f) => ({ ...f, cover: reader.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

  const sorted = [...releases].sort(
    (a, b) => +new Date(b.date) - +new Date(a.date)
  );

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl">Релизы</h1>
          <p className="mt-1 text-sm text-stone">{releases.length} в каталоге</p>
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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((r) => (
          <div
            key={r.id}
            className="overflow-hidden rounded-2xl border border-ink/8 bg-white"
          >
            <img src={r.cover} alt="" className="aspect-square w-full object-cover" />
            <div className="p-4">
              <div className="font-medium">{r.title}</div>
              <div className="text-xs text-mist">
                {r.artistName} · {r.type} · {r.date}
              </div>
              <div className="mt-3 flex gap-1">
                <button
                  type="button"
                  onClick={() => startEdit(r)}
                  className="rounded-lg p-2 text-stone hover:bg-ink/5"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm("Удалить релиз?")) deleteRelease(r.id);
                  }}
                  className="rounded-lg p-2 text-stone hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
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
                {editId ? "Редактировать релиз" : "Новый релиз"}
              </h2>
              <button type="button" onClick={() => setOpen(false)} className="p-2">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-4">
              <label className="block text-sm">
                <span className="mb-1.5 block text-xs text-stone">Название *</span>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  className="w-full rounded-xl border border-ink/10 bg-paper px-3 py-2.5 text-sm outline-none focus:border-ink/30"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1.5 block text-xs text-stone">Артист</span>
                <select
                  value={form.artistId}
                  onChange={(e) => {
                    const a = artists.find((x) => x.id === e.target.value);
                    setForm((f) => ({
                      ...f,
                      artistId: e.target.value,
                      artistName: a?.name || "",
                    }));
                  }}
                  className="w-full rounded-xl border border-ink/10 bg-paper px-3 py-2.5 text-sm outline-none"
                >
                  {artists.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block text-sm">
                  <span className="mb-1.5 block text-xs text-stone">Тип</span>
                  <select
                    value={form.type}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        type: e.target.value as Release["type"],
                      }))
                    }
                    className="w-full rounded-xl border border-ink/10 bg-paper px-3 py-2.5 text-sm"
                  >
                    <option value="single">Single</option>
                    <option value="ep">EP</option>
                    <option value="album">Album</option>
                  </select>
                </label>
                <label className="block text-sm">
                  <span className="mb-1.5 block text-xs text-stone">Дата</span>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, date: e.target.value }))
                    }
                    className="w-full rounded-xl border border-ink/10 bg-paper px-3 py-2.5 text-sm"
                  />
                </label>
              </div>
              <label className="block text-sm">
                <span className="mb-1.5 block text-xs text-stone">Обложка *</span>
                <input
                  value={form.cover.startsWith("data:") ? "" : form.cover}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, cover: e.target.value }))
                  }
                  placeholder="URL"
                  className="w-full rounded-xl border border-ink/10 bg-paper px-3 py-2.5 text-sm"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="mt-2 text-xs"
                  onChange={(e) => onFile(e.target.files?.[0])}
                />
                {form.cover && (
                  <img
                    src={form.cover}
                    alt=""
                    className="mt-2 h-24 w-24 rounded-xl object-cover"
                  />
                )}
              </label>
              <label className="block text-sm">
                <span className="mb-1.5 block text-xs text-stone">Ссылка</span>
                <input
                  value={form.link}
                  onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))}
                  className="w-full rounded-xl border border-ink/10 bg-paper px-3 py-2.5 text-sm"
                />
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, featured: e.target.checked }))
                  }
                />
                Featured
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="h-10 rounded-full px-4 text-sm"
              >
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
