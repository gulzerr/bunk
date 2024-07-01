import Elysia from "elysia";
import { figletRoutes } from "./controller/figlet";
import { createUserCtrl } from "./controller/users";
import { auth } from "./controller/auth";
import jwt from "@elysiajs/jwt";

const controllers = new Elysia().use(figletRoutes).use(createUserCtrl);

const baseApp = new Elysia();
baseApp.group("/api", (app) =>
  app
    .use(
      jwt({
        name: "jwt",
        secret: Bun.env.JWT_SECRET!,
      })
    )
    .use(auth)
);
baseApp.group("/v1/api", (app) => app.use(controllers));

export { baseApp };
