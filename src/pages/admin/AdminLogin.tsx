import { useState, type FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";

export function AdminLogin() {
  const { login, isAuthenticated } = useStore();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/nv-console" replace />;
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const ok = login(password);
    if (!ok) {
      setError(true);
      setPassword("");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0c0c0c] px-5">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-8"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center">
            <span className="relative flex h-8 w-8 items-center justify-center">
              <span className="absolute inset-0 rotate-45 rounded-[6px] border border-white/40" />
              <span className="h-2 w-2 rounded-sm bg-white" />
            </span>
          </div>
          <h1 className="text-sm font-medium tracking-[0.2em] text-white/80">
            CONSOLE
          </h1>
        </div>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
          placeholder="Access key"
          autoFocus
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-white/25"
        />
        {error && (
          <p className="mt-2 text-xs text-red-400/80">Неверный ключ доступа</p>
        )}
        <button
          type="submit"
          className="mt-4 w-full rounded-xl bg-white py-3 text-sm font-medium text-ink transition hover:bg-white/90"
        >
          Войти
        </button>
      </form>
    </div>
  );
}
