import knex from "knex";
import { Knex } from "knex";

const config: Knex.Config = {
  client: "pg",
  connection: {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || "5432"),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
  pool: { min: 0, max: 7 },
};

export default knex(config);
