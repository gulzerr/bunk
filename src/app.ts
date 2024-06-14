import Elysia from "elysia";
import { figletRoutes } from "./controller/figlet";

const baseApp = new Elysia();
baseApp.group("/v1", (app) => app.use(figletRoutes));

export { baseApp };
