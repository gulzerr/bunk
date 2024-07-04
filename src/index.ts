import { Elysia } from "elysia";
import { baseApp } from "./app";

const hey = new Elysia().get("/hey", () => "hey");

const port = 8000;
new Elysia()
  .use(baseApp)
  .use(hey)
  .get("/", () => "hello")
  .listen(port);

console.log(`Listening on http://localhost:${port}`);
