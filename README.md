# Расчёт теплообмена в противоточном слое

Учебное веб-приложение для расчёта температур материала и газа по высоте плотного продуваемого слоя.

## Структура

```text
apps/
  api/   Express API и схема Prisma
  web/   React-интерфейс на Vite
  packages/contracts/   Общие Zod-схемы и TypeScript-типы API
docker-compose.yaml   Локальная PostgreSQL
```

Это monorepo на npm workspaces. PostgreSQL работает в Docker; Node.js запускает API и фронтенд на компьютере разработчика.

Общий пакет импортируется по имени `@counterflow/contracts`. В `src/calculation.ts` описаны параметры и результат расчёта, в `src/variant.ts` — запрос создания варианта, сохранённая запись и ответы API. Формы со строковыми полями остаются в `apps/web/src/schemas` и переиспользуют числовые ограничения из контрактов.

Команды `npm run dev` и `npm run build` сначала собирают контракты. После изменения общей схемы во время разработки выполните `npm run build -w @counterflow/contracts`; при необходимости перезапустите приложение. Проверки контрактов: `npm test -w @counterflow/contracts`. Сгенерированная папка `dist` в Git не сохраняется.

## Запуск на macOS

Нужны Node.js 22.12+ и Docker Desktop с запущенным Docker Engine. Команды выполняются из корня репозитория.

```bash
npm install
cp apps/api/.env.example apps/api/.env
docker compose up -d --wait database
(cd apps/api && npx prisma migrate deploy && npx prisma generate)
npm run dev
```

Откройте <http://localhost:5173>. Проверка API: <http://localhost:3001/api/health>.

PostgreSQL доступна с компьютера по адресу `localhost:5433`. Данные сохраняются в Docker volume `heat-exchange_pg_data`: остановка и пересоздание контейнера их не удаляют. Команда `npm run db:down` останавливает контейнер. Команда `npm run db:up` запускает его без ожидания готовности; при первом запуске используйте `docker compose up -d --wait database`, как показано выше.

## База данных

Схема Prisma находится в `apps/api/prisma/schema.prisma`. Модель `CalculationVariant` хранит название варианта и 10 исходных параметров расчёта. Миграция в `apps/api/prisma/migrations` создаёт соответствующую таблицу.

`prisma migrate deploy` применяет сохранённые миграции к базе при первом запуске проекта. При изменении схемы во время разработки создавайте новую миграцию из `apps/api` командой `npx prisma migrate dev --name <имя>`. Prisma Client генерируется командой `npx prisma generate`; при `npm run build -w apps/api` она выполняется автоматически через `prebuild`. Сгенерированные файлы не включаются в Git.

Проверка контейнера и таблицы:

```bash
docker compose ps
docker compose exec database psql -U heat_user -d heat_exchange -c '\dt'
```

## Форматирование

Prettier настроен в корне monorepo. `npm run format` форматирует файлы проекта, а `npm run format:check` проверяет их без изменений. Форматирование перед коммитом запускается вручную.

## Этапы работы

1. Каркас monorepo, запуск веб-интерфейса, API и PostgreSQL.
2. PostgreSQL, Prisma и миграция таблицы вариантов.
3. Расчётная модель и проверка по базовому варианту из первой практической работы.
4. API сохранённых вариантов.
5. Форма исходных данных, таблица и графики.
6. Проверка приложения и отчёт в Word.

Каждый этап оформляется отдельным коммитом. Сейчас готовы каркас приложения и структура базы данных.
