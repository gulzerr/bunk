import { Elysia } from "elysia";
import { baseApp } from "./app";
import { elysiaLogging } from "./middleWares";

const hey = new Elysia().get("/hey", () => "hey");

const port = 8000;
new Elysia()
  .use(elysiaLogging)
  .use(baseApp)
  .group("/holla", (app) => app.use(hey))
  .use(hey)
  .get("/", () => "hello")
  .listen(port);

console.log(`Listening on http://localhost:${port}`);
