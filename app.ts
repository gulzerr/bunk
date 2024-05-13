import { BunicornApp } from "@bunicorn/server";
import { figletRoutes } from "./src/controller/figlet";

const baseApp = new BunicornApp({ basePath: "/api" });

export const app = baseApp.addRoutes(figletRoutes);
