import pg from "pg";
import app from "./app";
import connection from "./database";

app.listen(process.env.PORT || 3000, async () => {
  pg.types.setTypeParser(
    1114,
    (stringValue) => new Date(`${stringValue}+0000`)
  );
  await connection.create();
  console.log(`start server at ${process.env.HOST}:${process.env.PORT}`);
});
