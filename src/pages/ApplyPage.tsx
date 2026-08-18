import { useState, type FormEvent } from "react";
import { Check, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHero } from "../components/ui/PageHero";
import { Button } from "../components/ui/Button";
import { Reveal } from "../components/ui/Reveal";
import { useStore } from "../context/StoreContext";
import { cn } from "../utils/cn";

const TYPES = [
  {
    id: "distribution" as const,
    title: "Дистрибуция",
    desc: "Вывод музыки на площадки",
  },
  {
    id: "label" as const,
    title: "Лейбл",
    desc: "Полное партнёрство и развитие",
  },
  {
    id: "both" as const,
    title: "Оба направления",
    desc: "Дистрибуция + лейбл",
  },
];

export function ApplyPage() {
  const { addApplication } = useStore();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    type: "distribution" as "label" | "distribution" | "both",
    links: "",
    message: "",
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    addApplication(form);
    setSent(true);
  };

  return (
    <>
      <PageHero
        eyebrow="Заявка"
        title="Подать заявку"
        description="Расскажите о себе и материале. Мы отвечаем в течение 24 часов — коротко и по делу."
      />

      <section className="pb-24 md:pb-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-12 md:px-8">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="rounded-3xl border border-ink/8 bg-white p-8 md:p-10">
                <h2 className="font-display text-2xl">Что будет дальше</h2>
                <ol className="mt-8 space-y-6">
                  {[
                    "Мы получим заявку и послушаем материал",
                    "Свяжемся в Telegram или по почте",
                    "Обсудим формат: дистрибуция, лейбл или оба",
                    "Подпишем договор и запустим работу",
                  ].map((t, i) => (
                    <li key={t} className="flex gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink font-display text-sm text-paper">
                        {i + 1}
                      </span>
                      <span className="pt-1 text-sm leading-relaxed text-stone">
                        {t}
                      </span>
                    </li>
                  ))}
                </ol>
                <div className="mt-10 rounded-2xl bg-paper-soft p-5 text-sm text-stone">
                  Уже есть каталог на другом дистрибьюторе? Поможем с переносом
                  — бесплатно и без простоя релизов.
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.08}>
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="ok"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-ink/8 bg-white p-10 text-center"
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent">
                      <Check className="h-7 w-7 text-ink" />
                    </span>
                    <h3 className="mt-6 font-display text-3xl">Заявка отправлена</h3>
                    <p className="mt-3 max-w-sm text-stone">
                      Спасибо, {form.name.split(" ")[0] || "друг"}. Мы свяжемся
                      с вами в ближайшее время.
                    </p>
                    <Button
                      className="mt-8"
                      variant="outline"
                      onClick={() => {
                        setSent(false);
                        setForm({
                          name: "",
                          email: "",
                          type: "distribution",
                          links: "",
                          message: "",
                        });
                      }}
                    >
                      Отправить ещё
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={onSubmit}
                    className="rounded-3xl border border-ink/8 bg-white p-7 md:p-10"
                  >
                    <div className="grid gap-6 sm:grid-cols-2">
                      <Field label="Имя / псевдоним" required>
                        <input
                          required
                          value={form.name}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, name: e.target.value }))
                          }
                          className="field"
                          placeholder="Как к вам обращаться"
                        />
                      </Field>
                      <Field label="Email" required>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, email: e.target.value }))
                          }
                          className="field"
                          placeholder="you@email.com"
                        />
                      </Field>
                    </div>

                    <div className="mt-6">
                      <div className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-mist">
                        Тип сотрудничества
                      </div>
                      <div className="grid gap-3 sm:grid-cols-3">
                        {TYPES.map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() =>
                              setForm((f) => ({ ...f, type: t.id }))
                            }
                            className={cn(
                              "rounded-2xl border p-4 text-left transition-all",
                              form.type === t.id
                                ? "border-ink bg-ink text-paper"
                                : "border-ink/10 bg-paper hover:border-ink/25"
                            )}
                          >
                            <div className="text-sm font-medium">{t.title}</div>
                            <div
                              className={cn(
                                "mt-1 text-xs",
                                form.type === t.id
                                  ? "text-paper/60"
                                  : "text-stone"
                              )}
                            >
                              {t.desc}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6">
                      <Field label="Ссылки на музыку">
                        <input
                          value={form.links}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, links: e.target.value }))
                          }
                          className="field"
                          placeholder="Spotify, SoundCloud, Cloud и т.д."
                        />
                      </Field>
                    </div>

                    <div className="mt-6">
                      <Field label="Сообщение">
                        <textarea
                          value={form.message}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, message: e.target.value }))
                          }
                          className="field min-h-[140px] resize-y"
                          placeholder="Коротко о себе, целях и том, что хотите выпустить"
                        />
                      </Field>
                    </div>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs text-mist">
                        Нажимая кнопку, вы соглашаетесь на обработку данных для
                        связи по заявке.
                      </p>
                      <Button
                        type="submit"
                        size="lg"
                        icon={<Send className="h-4 w-4" />}
                      >
                        Отправить
                      </Button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </Reveal>
          </div>
        </div>
      </section>

      <style>{`
        .field {
          width: 100%;
          border-radius: 1rem;
          border: 1px solid rgba(10,10,10,0.1);
          background: #f7f6f3;
          padding: 0.85rem 1rem;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .field:focus {
          border-color: rgba(10,10,10,0.35);
          background: #fff;
        }
      `}</style>
    </>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-mist">
        {label}
        {required && <span className="text-ink"> *</span>}
      </span>
      {children}
    </label>
  );
}
