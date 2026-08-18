import { useState, type FormEvent } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { useStore } from "../../context/StoreContext";
import type { Artist } from "../../types";
import { cn } from "../../utils/cn";

const empty = {
  name: "",
  role: "Артист",
  genre: "",
  bio: "",
  image: "",
  spotify: "",
  instagram: "",
  featured: false,
};

export function AdminArtists() {
  const { artists, addArtist, updateArtist, deleteArtist } = useStore();
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(empty);

  const startCreate = () => {
    setEditId(null);
    setForm(empty);
    setOpen(true);
  };

  const startEdit = (a: Artist) => {
    setEditId(a.id);
    setForm({
      name: a.name,
      role: a.role,
      genre: a.genre,
      bio: a.bio,
      image: a.image,
      spotify: a.spotify || "",
      instagram: a.instagram || "",
      featured: !!a.featured,
    });
    setOpen(true);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.image.trim()) return;
    if (editId) {
      updateArtist(editId, form);
    } else {
      addArtist(form);
    }
    setOpen(false);
    setForm(empty);
    setEditId(null);
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
          <h1 className="font-display text-3xl">Артисты</h1>
          <p className="mt-1 text-sm text-stone">{artists.length} в ростере</p>
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

      <div className="overflow-hidden rounded-2xl border border-ink/8 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ink/8 bg-paper-soft/80 text-[11px] uppercase tracking-[0.12em] text-mist">
            <tr>
              <th className="px-5 py-3 font-medium">Артист</th>
              <th className="hidden px-5 py-3 font-medium md:table-cell">Жанр</th>
              <th className="hidden px-5 py-3 font-medium sm:table-cell">
                Featured
              </th>
              <th className="px-5 py-3 font-medium text-right">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/6">
            {artists.map((a) => (
              <tr key={a.id} className="hover:bg-paper/50">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={a.image}
                      alt=""
                      className="h-11 w-11 rounded-xl object-cover"
                    />
                    <div>
                      <div className="font-medium">{a.name}</div>
                      <div className="text-xs text-mist">{a.role}</div>
                    </div>
                  </div>
                </td>
                <td className="hidden px-5 py-3 text-stone md:table-cell">
                  {a.genre}
                </td>
                <td className="hidden px-5 py-3 sm:table-cell">
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase",
                      a.featured
                        ? "bg-accent/40 text-ink"
                        : "bg-ink/5 text-mist"
                    )}
                  >
                    {a.featured ? "Yes" : "No"}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => startEdit(a)}
                      className="rounded-lg p-2 text-stone hover:bg-ink/5 hover:text-ink"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Удалить ${a.name}?`)) deleteArtist(a.id);
                      }}
                      className="rounded-lg p-2 text-stone hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-4 sm:items-center">
          <form
            onSubmit={onSubmit}
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl admin-scroll"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-xl">
                {editId ? "Редактировать" : "Новый артист"}
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-2 hover:bg-ink/5"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              <Field label="Имя *">
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="admin-input"
                />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Роль">
                  <input
                    value={form.role}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, role: e.target.value }))
                    }
                    className="admin-input"
                  />
                </Field>
                <Field label="Жанр">
                  <input
                    value={form.genre}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, genre: e.target.value }))
                    }
                    className="admin-input"
                  />
                </Field>
              </div>
              <Field label="Био">
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                  className="admin-input min-h-[100px]"
                />
              </Field>
              <Field label="Фото (URL или загрузка) *">
                <input
                  value={form.image.startsWith("data:") ? "" : form.image}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, image: e.target.value }))
                  }
                  placeholder="https://..."
                  className="admin-input"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => onFile(e.target.files?.[0])}
                  className="mt-2 block w-full text-xs text-stone"
                />
                {form.image && (
                  <img
                    src={form.image}
                    alt=""
                    className="mt-3 h-28 w-28 rounded-xl object-cover"
                  />
                )}
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Spotify">
                  <input
                    value={form.spotify}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, spotify: e.target.value }))
                    }
                    className="admin-input"
                  />
                </Field>
                <Field label="Instagram">
                  <input
                    value={form.instagram}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, instagram: e.target.value }))
                    }
                    className="admin-input"
                  />
                </Field>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, featured: e.target.checked }))
                  }
                  className="rounded"
                />
                Показывать на главной (featured)
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="h-10 rounded-full px-4 text-sm text-stone hover:bg-ink/5"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="h-10 rounded-full bg-ink px-5 text-sm font-medium text-paper"
              >
                Сохранить
              </button>
            </div>
          </form>
        </div>
      )}

      <style>{`
        .admin-input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgba(10,10,10,0.1);
          background: #f7f6f3;
          padding: 0.65rem 0.85rem;
          font-size: 0.875rem;
          outline: none;
        }
        .admin-input:focus {
          border-color: rgba(10,10,10,0.3);
          background: #fff;
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-stone">{label}</span>
      {children}
    </label>
  );
}
