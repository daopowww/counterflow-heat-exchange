# Расчёт теплообмена в противоточном слое

Учебное веб-приложение для расчёта температур материала и газа по высоте плотного продуваемого слоя.

## Структура

```text
apps/
  api/   Express API и будущая расчётная модель
  web/   React-интерфейс на Vite
docker-compose.yml   Локальная PostgreSQL
```

Это monorepo на npm workspaces. PostgreSQL работает в Docker; Node.js запускает API и фронтенд на компьютере разработчика.

## Запуск на macOS

Нужны Node.js 22.12+ и Docker Desktop с запущенным Docker Engine.

```bash
npm install
npm run db:up
cp apps/api/.env.example apps/api/.env
npm run dev
```

Откройте <http://localhost:5173>. Проверка API: <http://localhost:3001/api/health>.

`npm run db:down` остановит контейнер. Данные сохраняются в Docker volume `postgres_data`.

## Форматирование

Prettier настроен в корне monorepo. `npm run format` форматирует файлы проекта, а `npm run format:check` проверяет их без изменений. Форматирование перед коммитом запускается вручную.

## Этапы работы

1. Каркас monorepo, запуск веб-интерфейса, API и PostgreSQL.
2. Расчётная модель и проверка по базовому варианту из первой практической работы.
3. Prisma, миграция БД и API сохранённых вариантов.
4. Форма исходных данных, таблица и графики.
5. Проверка приложения и отчёт в Word.

Каждый этап оформляется отдельным коммитом. Сейчас реализован только первый этап.
