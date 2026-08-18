# NIGHTVOLT — Label & Distribution

Сайт независимого музыкального лейбла и цифрового дистрибьютора: ростер артистов, каталог релизов, блог, FAQ, форма заявок и скрытая админ-консоль.

Стек: **React 19 · TypeScript · Vite · Tailwind CSS 4 · Framer Motion · React Router (HashRouter)**

## Локальный запуск

```bash
npm install
npm run dev       # dev-сервер
npm run build     # production-сборка в dist/
```

Сборка упаковывается в один самодостаточный `dist/index.html` (vite-plugin-singlefile), поэтому сайт работает на любом статическом хостинге без настроек редиректов.

## Деплой на Vercel

### Способ 1 — импорт через GitHub (рекомендуется)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftensiderfas%2FNGHF32)

1. Нажмите кнопку выше (или откройте https://vercel.com/new и импортируйте `tensiderfas/NGHF32`).
2. Framework **Vite** определится автоматически — настройки зафиксированы в `vercel.json`.
3. Нажмите **Deploy** — через минуту сайт будет доступен на `*.vercel.app`.

### Способ 2 — авто-деплой через GitHub Actions

1. Создайте в репозитории файл `.github/workflows/deploy-vercel.yml` (GitHub → **Add file → Create new file**) с содержимым из блокнота ниже.
2. Добавьте секреты в **Settings → Secrets and variables → Actions**:

| Секрет              | Где взять                                                    |
| ------------------- | ------------------------------------------------------------ |
| `VERCEL_ORG_ID`     | Vercel → Team Settings → **Team ID**                         |
| `VERCEL_PROJECT_ID` | Vercel → проект → Settings → **Project ID**                  |
| `VERCEL_TOKEN`      | Vercel → Account → Settings → **Tokens** → Create token      |

3. Запустите workflow вручную (**Actions → Deploy to Vercel → Run workflow**) — сайт опубликуется автоматически. Далее деплой будет происходить при каждом push в `main`.

<details>
<summary><b>Содержимое workflow</b></summary>

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Pull Vercel environment
        run: npx vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}

      - name: Build project artifacts
        run: npx vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}

      - name: Deploy to Vercel
        run: npx vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}

    env:
      VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
      VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
```

</details>

## Админ-консоль (скрытая)

`/#/nv-console/gate` — вход по access key, управление артистами, релизами, новостями, заявками и настройками сайта. Данные хранятся в localStorage.
