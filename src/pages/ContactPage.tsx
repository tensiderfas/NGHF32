import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Mail, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHero } from "../components/ui/PageHero";
import { Button } from "../components/ui/Button";
import { Reveal } from "../components/ui/Reveal";
import { useStore } from "../context/StoreContext";

export function ContactPage() {
  const { settings, addApplication } = useStore();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    addApplication({
      name: form.name,
      email: form.email,
      type: "both",
      links: "",
      message: `[Контакт] ${form.message}`,
    });
    setSent(true);
  };

  return (
    <>
      <PageHero
        eyebrow="Контакты"
        title="Связаться с нами"
        description="По вопросам дистрибуции, лейбла, партнёрств и прессы — пишите напрямую."
      />

      <section className="pb-24 md:pb-32">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-12 md:px-8">
          <div className="space-y-4 lg:col-span-5">
            <Reveal>
              <a
                href={`mailto:${settings.email}`}
                className="group flex items-center justify-between rounded-3xl border border-ink/8 bg-white p-6 transition-all hover:border-ink/15 hover:shadow-lg hover:shadow-ink/5"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-paper">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.14em] text-mist">
                      Email
                    </div>
                    <div className="mt-0.5 font-medium">{settings.email}</div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-mist transition-colors group-hover:text-ink" />
              </a>
            </Reveal>

            {[
              { label: "Telegram", href: settings.telegram },
              { label: "Instagram", href: settings.instagram },
              { label: "YouTube", href: settings.youtube },
            ].map((s, i) => (
              <Reveal key={s.label} delay={0.05 * (i + 1)}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between rounded-3xl border border-ink/8 bg-white p-6 transition-all hover:border-ink/15 hover:shadow-lg hover:shadow-ink/5"
                >
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.14em] text-mist">
                      {s.label}
                    </div>
                    <div className="mt-0.5 font-medium">Открыть</div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-mist transition-colors group-hover:text-ink" />
                </a>
              </Reveal>
            ))}
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.08}>
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="ok"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex min-h-[380px] flex-col items-center justify-center rounded-3xl border border-ink/8 bg-white p-10 text-center"
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent">
                      <Check className="h-7 w-7" />
                    </span>
                    <h3 className="mt-6 font-display text-3xl">Сообщение отправлено</h3>
                    <p className="mt-3 text-stone">Ответим как можно скорее.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={onSubmit}
                    className="rounded-3xl border border-ink/8 bg-white p-7 md:p-10"
                  >
                    <h2 className="font-display text-2xl">Написать сообщение</h2>
                    <div className="mt-8 grid gap-5 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-mist">
                          Имя
                        </span>
                        <input
                          required
                          value={form.name}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, name: e.target.value }))
                          }
                          className="w-full rounded-2xl border border-ink/10 bg-paper px-4 py-3 text-sm outline-none transition focus:border-ink/30 focus:bg-white"
                        />
                      </label>
                      <label className="block">
                        <span className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-mist">
                          Email
                        </span>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, email: e.target.value }))
                          }
                          className="w-full rounded-2xl border border-ink/10 bg-paper px-4 py-3 text-sm outline-none transition focus:border-ink/30 focus:bg-white"
                        />
                      </label>
                    </div>
                    <label className="mt-5 block">
                      <span className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-mist">
                        Сообщение
                      </span>
                      <textarea
                        required
                        value={form.message}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, message: e.target.value }))
                        }
                        className="min-h-[160px] w-full resize-y rounded-2xl border border-ink/10 bg-paper px-4 py-3 text-sm outline-none transition focus:border-ink/30 focus:bg-white"
                      />
                    </label>
                    <div className="mt-6 flex justify-end">
                      <Button type="submit" size="lg" icon={<Send className="h-4 w-4" />}>
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
    </>
  );
}
