import Elysia from "elysia";
import { getFiglet } from "./figlet";

const figletRoutes = new Elysia();

figletRoutes.group("/figlet", (app) => app.use(getFiglet));

export { figletRoutes };
