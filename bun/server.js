import { Database } from "bun:sqlite";

const db = new Database("../test.db");

const stm = db.prepare("SELECT * from test");

export default {
  port: 4000,
  fetch(request) {
    try {
      let rows;
      for (let i = 0; i < 10; i++) {
        rows = stm.all();
      }

      let data;
      for (let i = 0; i < 10; i++) {
        data = JSON.parse(JSON.stringify(rows));
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
