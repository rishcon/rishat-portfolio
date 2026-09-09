# Rishat — portfolio

Одностраничное портфолио Full-Stack-разработчика на React, TypeScript, Vite и Tailwind CSS v4.

## Требования

- Node.js 22 (версия закреплена в `.mise.toml`)
- pnpm 10+

## Локальный запуск

```bash
pnpm install --frozen-lockfile
pnpm start
```

Откройте [http://127.0.0.1:8443](http://127.0.0.1:8443). Чтобы выбрать другой порт, передайте переменную окружения `PORT`:

```powershell
$env:PORT=5173; pnpm start
```

Для режима, совместимого с Figma Make, можно использовать `pnpm dev`; по умолчанию он также работает на порту `8443`.

## Telegram-заявки

1. Создайте бота через `@BotFather` и получите токен.
2. Напишите боту любое сообщение, затем узнайте ID получателя через метод `getUpdates` Telegram Bot API.
3. Скопируйте `.env.example` в `.env.local` и заполните переменные:

```env
TELEGRAM_BOT_TOKEN=токен_бота
TELEGRAM_CHAT_ID=id_чата
```

После изменения `.env.local` перезапустите dev-сервер. На Vercel добавьте эти же переменные в Project Settings → Environment Variables. Токен должен оставаться только на сервере и не использовать префикс `VITE_`.

## Проверка перед публикацией

```bash
pnpm typecheck
pnpm build
pnpm preview
```

`pnpm build` включает проверку TypeScript и создаёт оптимизированную версию сайта в `dist/`.

## Структура

- `src/components/` — секции лендинга и интерактивные элементы
- `src/data/projects.ts` — содержание и ссылки на кейсы
- `src/hooks/` — адаптация под мобильные экраны и анимации появления
- `src/index.css` — глобальные стили, тема, анимации и адаптивность

## Перед публикацией

Telegram, WhatsApp и email уже подключены. В `src/components/Footer.tsx` оставлен плейсхолдер GitHub — замените его, когда появится реальная ссылка. Превью кейсов хранятся локально в `public/projects/`.
