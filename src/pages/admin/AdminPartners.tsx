import { useState, type FormEvent } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { useStore } from "../../context/StoreContext";
import type { Partner } from "../../types";

const empty = { name: "", letter: "" };

export function AdminPartners() {
  const { partners, addPartner, updatePartner, deletePartner } = useStore();
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(empty);

  const startCreate = () => {
    setEditId(null);
    setForm(empty);
    setOpen(true);
  };

  const startEdit = (p: Partner) => {
    setEditId(p.id);
    setForm({ name: p.name, letter: p.letter });
    setOpen(true);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    const data = {
      name: form.name.trim(),
      letter: (form.letter.trim() || form.name.trim().charAt(0)).toUpperCase(),
    };
    if (editId) {
      updatePartner(editId, data);
    } else {
      addPartner(data);
    }
    setOpen(false);
    setForm(empty);
    setEditId(null);
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl">Партнёры</h1>
          <p className="mt-1 text-sm text-stone">{partners.length} в списке</p>
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

      {partners.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink/15 bg-white py-20 text-center text-sm text-mist">
          Партнёров пока нет
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-ink/8 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink/8 bg-paper-soft/80 text-[11px] uppercase tracking-[0.12em] text-mist">
              <tr>
                <th className="px-5 py-3 font-medium">Партнёр</th>
                <th className="hidden px-5 py-3 font-medium sm:table-cell">
                  Буква
                </th>
                <th className="px-5 py-3 font-medium text-right">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/6">
              {partners.map((p) => (
                <tr key={p.id} className="hover:bg-paper/50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-paper font-display text-lg">
                        {p.letter}
                      </span>
                      <span className="font-medium">{p.name}</span>
                    </div>
                  </td>
                  <td className="hidden px-5 py-3 text-stone sm:table-cell">
                    {p.letter}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => startEdit(p)}
                        className="rounded-lg p-2 text-stone hover:bg-ink/5 hover:text-ink"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Удалить ${p.name}?`)) deletePartner(p.id);
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
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-4 sm:items-center">
          <form
            onSubmit={onSubmit}
            className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-xl">
                {editId ? "Редактировать" : "Новый партнёр"}
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
              <Field label="Название *">
                <input
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  className="admin-input"
                />
              </Field>
              <Field label="Буква (1 символ)">
                <input
                  value={form.letter}
                  maxLength={2}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, letter: e.target.value }))
                  }
                  placeholder="B"
                  className="admin-input"
                />
              </Field>
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
