import sqlite3 from "sqlite3";

const db = new sqlite3.Database("../test.db");

db.run(
  "CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR)",
  (err) => {
    if (err) {
      console.error(err);
      return;
    }

    for (let i = 0; i < 1000; i++) {
      db.run(`INSERT INTO test (name) VALUES ("Item ${i}")`);
    }
  }
);
