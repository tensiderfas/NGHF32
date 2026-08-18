import { Button } from "../components/ui/Button";

export function NotFoundPage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-5 text-center">
      <div className="font-display text-8xl text-ink/10">404</div>
      <h1 className="mt-4 font-display text-3xl">Страница не найдена</h1>
      <p className="mt-3 max-w-sm text-stone">
        Возможно, ссылка устарела или страница была перемещена.
      </p>
      <Button to="/" className="mt-8">
        На главную
      </Button>
    </div>
  );
}
