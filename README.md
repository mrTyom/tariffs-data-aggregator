# Wildberries Tariffs Data Aggregator

Сервис для периодического сбора данных о тарифах с маркетплейса Wildberries и их выгрузки в Google Sheets.

## Стек технологий

- Node.js
- PostgreSQL
- Docker
- Knex.js
- Google Sheets API

## Возможности

- Ежечасное получение данных о тарифах через API Wildberries.
- Сохранение и накопление данных в PostgreSQL.
- Регулярная выгрузка данных в Google Sheets на лист `stocks_coefs`, с сортировкой по возрастанию коэффициента.

## Установка

### Шаг 1: Клонируйте репозиторий

```bash
git clone https://github.com/yourusername/wb-tariffs-aggregator.git
cd wb-tariffs-aggregator
```

### Шаг 2: Настройка переменных окружения
Создайте файл .env по примеру example.env

### Шаг 3: Запуск через Docker
Запустите приложение с помощью Docker Compose:

```bash
docker-compose up --build
```
Это создаст и запустит два контейнера:

db: контейнер с PostgreSQL
app: контейнер с приложением на Node.js

### Шаг 4: Настройка таблиц Google Sheets
Создайте таблицы Google Sheets, которые будут получать данные из PostgreSQL.
В каждой таблице добавьте лист с названием stocks_coefs.
Укажите идентификаторы таблиц (список переменных GOOGLE_SHEET_ID_N) в .env.

## Основные файлы проекта

Dockerfile – конфигурация для создания Docker-образа.

docker-compose.yml – настройки Docker Compose для управления контейнерами.

src/db/migrations/20231110_create_tariffs_table.js – миграция для создания таблицы tariffs в PostgreSQL.

src/services/fetchDataService.js – логика получения данных от Wildberries API и их сохранение в базу.

src/services/googleSheetsService.js – сервис для выгрузки данных из PostgreSQL в Google Sheets.

## Использование

Сервис будет автоматически обращаться к API Wildberries раз в час и сохранять обновленные данные.
Данные ежедневно выгружаются в Google Sheets. Таблицы будут обновляться автоматически.

## Команды для разработки

Запуск миграций: для создания структуры таблиц, выполните:
```bash
docker-compose exec app npx knex migrate:latest
```