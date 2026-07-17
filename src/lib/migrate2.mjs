import fs from "fs";
import pool from "./db.ts";

const sql = fs.readFileSync(new URL("./add_unique.sql", import.meta.url), "utf8");
await pool.query(sql);
console.log("Unique constraint added OK");
await pool.end();
