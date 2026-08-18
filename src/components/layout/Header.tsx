import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "../../utils/cn";
import { Button } from "../ui/Button";

const NAV = [
  { to: "/", label: "Главная" },
  { to: "/artists", label: "Артисты" },
  { to: "/distribution", label: "Дистрибуция" },
  { to: "/about", label: "О нас" },
  { to: "/news", label: "Новости" },
  { to: "/faq", label: "Вопросы" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled || open
            ? "bg-paper/85 backdrop-blur-xl border-b border-ink/5"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
          <Link to="/" className="group flex items-center gap-2.5">
            <span className="relative flex h-8 w-8 items-center justify-center">
              <span className="absolute inset-0 rotate-45 rounded-[6px] border border-ink/80 transition-transform duration-500 group-hover:rotate-[135deg]" />
              <span className="h-2 w-2 rounded-sm bg-ink" />
            </span>
            <span className="font-display text-[15px] tracking-[0.14em]">
              NIGHTVOLT
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "relative px-3 py-2 text-[13px] font-medium tracking-wide transition-colors",
                    isActive ? "text-ink" : "text-stone hover:text-ink"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3 -bottom-0.5 h-px bg-ink"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Button to="/apply" size="sm" variant="outline">
              Подать заявку
            </Button>
            <Button
              to="/distribution"
              size="sm"
              icon={<ArrowUpRight className="h-3.5 w-3.5" />}
            >
              Дистрибуция
            </Button>
          </div>

          <button
            type="button"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-paper pt-20 lg:hidden"
          >
            <motion.nav
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 12, opacity: 0 }}
              transition={{ delay: 0.05 }}
              className="flex h-full flex-col px-6 pb-10"
            >
              <div className="flex flex-1 flex-col gap-1 pt-6">
                {NAV.map((item, i) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                  >
                    <NavLink
                      to={item.to}
                      end={item.to === "/"}
                      className={({ isActive }) =>
                        cn(
                          "block border-b border-ink/5 py-4 font-display text-3xl",
                          isActive ? "text-ink" : "text-ink/40"
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  </motion.div>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                <Button to="/apply" size="lg" className="w-full">
                  Подать заявку
                </Button>
                <Button to="/contact" size="lg" variant="outline" className="w-full">
                  Контакты
                </Button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
