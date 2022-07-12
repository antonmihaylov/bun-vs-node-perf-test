import http from "http";
import Database from "better-sqlite3";

const db = new Database("../test.db");
const stm = db.prepare("SELECT * from test");

http
  .createServer(async function (req, res) {
    try {
      let rows;
      for (let i = 0; i < 10; i++) {
        rows = await stm.get();
      }

      let data;
      for (let i = 0; i < 10; i++) {
        data = JSON.parse(JSON.stringify(rows));
      }

      res.setHeader("Content-Type", "application/json");
      res.writeHead(200);
      res.end(JSON.stringify({ data, rows }));
    } catch (e) {
      res.statusCode = 500;
      res.end(JSON.stringify(e));
    }
  })
  .listen(4000);
