/**
 * Сервис для выгрузки данных из PostgreSQL в Google Sheets.
 */

import { google } from "googleapis";
import knex from "../db/knex.js";

const auth = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REFRESH_TOKEN
);
auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

const sheets = google.sheets({ version: "v4", auth });

// Функция для выгрузки данных в Google Sheets
export const exportDataToGoogleSheets = async (sheetId: string): Promise<void> => {
  try {
    const data = await knex("tariffs")
      .select("date", "coefficient", "warehouse")
      .orderBy("coefficient", "asc");

    const values = [["Дата", "Коэффициент", "Склад"], ...data.map((row) => [row.date, row.coefficient, row.warehouse])];

    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: "stocks_coefs!A1",
      valueInputOption: "RAW",
      requestBody: { values },
    });
  } catch (error) {
    console.error("Ошибка при выгрузке данных в Google Sheets:", error);
  }
};
