import app from "./app";

import connection from "./database";

require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

app.listen(process.env.PORT || 3000, async () => {
  await connection.create();
  console.log(`start server at ${process.env.HOST}:${process.env.PORT}`);
});
