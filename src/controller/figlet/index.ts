import { groupRoutes } from "@bunicorn/server";
import { getFiglet } from "./figlet";

export const figletRoutes = groupRoutes("/figlet", [getFiglet]);
