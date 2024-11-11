/**
 * Сервис для получения данных от API Wildberries и их записи в базу данных.
 */

import axios from "axios";
import knex from "../db/knex.js";
import dayjs from "dayjs";

const WB_API_URL = process.env.WB_API_URL as string;
const WB_API_TOKEN = process.env.WB_API_TOKEN as string;

// Описание структуры данных API
interface Tariff {
  coefficient: number;
  warehouse: string;
}

// Функция для получения данных от API Wildberries
export const fetchTariffsData = async (): Promise<void> => {
  try {
    const response = await axios.get<Tariff[]>(WB_API_URL, {
      headers: { Authorization: `Bearer ${WB_API_TOKEN}` },
    });

    const tariffsData = response.data;
    const today = dayjs().format("YYYY-MM-DD");

    // Сохраняем или обновляем данные в базе
    for (const item of tariffsData) {
      await knex("tariffs")
        .insert({
          date: today,
          coefficient: item.coefficient,
          warehouse: item.warehouse,
        })
        .onConflict(["date", "warehouse"]) // Обновление записи на текущий день
        .merge();
    }
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
};
