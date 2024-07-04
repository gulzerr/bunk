import Elysia from "elysia";
import jwt from "@elysiajs/jwt";
import { figletRoutes } from "./controller/figlet";
import { createUserCtrl } from "./controller/users";
import { auth } from "./controller/auth";
import {
  requestLoggingMiddleware,
  responseLoggingMiddleware,
} from "./middlewares/middlewares";

const controllers = new Elysia().use(figletRoutes).use(createUserCtrl);

const baseApp = new Elysia();

baseApp.onRequest(({ request }) => {
  (request as any).uuid = self.crypto.randomUUID();
  (request as any).startTime = Date.now();
});

baseApp.onBeforeHandle({ as: "global" }, ({ request, path, body }) => {
  requestLoggingMiddleware({ request, path, body });
});

//
baseApp.onAfterHandle({ as: "global" }, ({ request, response, set }) => {
  responseLoggingMiddleware({ request, response, set });
});

baseApp.group("/api", (app) => app.use(auth));

baseApp.group("/v1/api", (app) => app.use(controllers));

export { baseApp };
