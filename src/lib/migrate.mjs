import fs from "fs";
import pool from "./db.ts";

const sql = fs.readFileSync(new URL("./schema.sql", import.meta.url), "utf8");
await pool.query(sql);
console.log("Tables created OK");
await pool.end();
