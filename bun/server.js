import { Database } from "bun:sqlite";
import { readFile } from "fs/promises";

const db = new Database("../test.db");

export default {
  port: 4000,
  async fetch(request) {
    try {
      let data;
      for (let i = 0; i < 10; i++) {
        data = JSON.parse(
          await readFile("../test.json", { encoding: "utf-8" })
        );
      }

      let rows;
      for (let i = 0; i < 10; i++) {
        rows = await db.query("SELECT * from test").all();
      }

      return new Response(JSON.stringify({ rows, data }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 200,
      });
    } catch (e) {
      return new Response(JSON.stringify(e), { status: 500 });
    }
  },
};
