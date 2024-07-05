import { Elysia } from "elysia";
import { baseApp } from "./app";

const port = 8000;
new Elysia()
  .use(baseApp)
  .get("/", () => "hello")
  .listen(port);

console.log(`Listening on http://localhost:${port}`);
