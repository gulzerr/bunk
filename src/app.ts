import Elysia from "elysia";
import { figletRoutes } from "./controller/figlet";
import { createUserCtrl } from "./controller/users";

const controllers = new Elysia().use(figletRoutes).use(createUserCtrl);

const baseApp = new Elysia();
baseApp.group("/v1", (app) => app.use(controllers));

export { baseApp };
