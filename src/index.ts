/**
 * Основной файл для инициализации сервера и запуска регулярных задач.
 */

import express from "express";
import dotenv from "dotenv";
import { fetchTariffsData } from "./services/fetchDataService.js";
import cron from "node-cron";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Запускаем задачу каждый час
cron.schedule("0 * * * *", fetchTariffsData);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
