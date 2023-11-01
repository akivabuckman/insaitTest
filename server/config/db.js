import knex from "knex";
import dotenv from "dotenv";
dotenv.config();

const db = knex({
  client: process.env.DBCLIENT,
  connection: {
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    user: process.env.DBUSER,
    password: process.env.DBPW,
    database: process.env.DB,
  },
});

export default db;
