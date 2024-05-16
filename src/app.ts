import { BunicornApp, createMiddleware } from "@bunicorn/server";
import { figletRoutes } from "./controller/figlet";

const baseApp = new BunicornApp({ basePath: "/api" });
const app = baseApp.addRoutes(figletRoutes);

export { app };
