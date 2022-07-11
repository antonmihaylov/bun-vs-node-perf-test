using System.Text.Json;
using Dapper;
using dotnet;
using Microsoft.Data.Sqlite;

var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();


app.MapGet(
  pattern: "/",
  async () => {
    string[]? data = null;

    for (var i = 0; i < 10; i++) {
      await using var fs = File.OpenRead("../test.json");
      data = await JsonSerializer.DeserializeAsync<string[]>(fs);
    }

    await using var connection = new SqliteConnection("Data Source=../test.db");
    const string sql = "select * from test";

    IEnumerable<TestData> rows = new List<TestData>();

    for (var i = 0; i < 10; i++) {
       rows = await connection.QueryAsync<TestData>(sql);
    }

    return new TestResult { Rows = rows, Data = data };
  }
);

app.Run();