import { Elysia } from "elysia";
import { baseApp } from "./app";
import { elysiaLogging } from "./middlewares/middlewares";

const hey = new Elysia().get("/hey", () => "hey");

const port = 8000;
new Elysia()
  // @ts-ignore
  .use(elysiaLogging)
  // @ts-ignore
  .use(baseApp)
  .use(hey)
  .get("/", () => "hello")
  .listen(port);

console.log(`Listening on http://localhost:${port}`);
