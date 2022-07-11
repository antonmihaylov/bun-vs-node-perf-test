import { readFile } from "fs/promises";
import http from "http";
import Database from "better-sqlite3";

const db = new Database("../test.db");

http
  .createServer(async function (req, res) {
    try {
      let data;
      for (let i = 0; i < 10; i++) {
        data = JSON.parse(
          await readFile("../test.json", { encoding: "utf-8" })
        );
      }

      let rows;
      for (let i = 0; i < 10; i++) {
        rows = await db.prepare("SELECT * from test").get();
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
