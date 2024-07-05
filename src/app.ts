import Elysia, { type Context } from "elysia";
import { figletRoutes } from "./controller/figlet";
import { createUserCtrl } from "./controller/users";
import { auth } from "./controller/auth";
import {
  requestLoggingMiddleware,
  responseLoggingMiddleware,
} from "./middlewares/middlewares";

const controllers = new Elysia().use(figletRoutes).use(createUserCtrl);

const baseApp = new Elysia()
  .onRequest(({ request }) => {
    (request as any).uuid = self.crypto.randomUUID();
    (request as any).startTime = Date.now();
  })
  .onBeforeHandle({ as: "global" }, ({ request, path, body }) => {
    requestLoggingMiddleware({ request, path, body });
  })
  .onAfterHandle({ as: "global" }, ({ request, response, set }) => {
    responseLoggingMiddleware({ request, response, set });
  })
  .onError((ctx) => {
    console.error(ctx.error);
  });

baseApp.group("/api", (app) => app.use(auth));
baseApp.group("/v1/api", (app) => app.use(controllers));

export { baseApp };
