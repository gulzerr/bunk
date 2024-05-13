import figlet from "figlet";
import { RouteBuilder } from "@bunicorn/server";

const routeBuilder = new RouteBuilder();

export const getFiglet = routeBuilder.get("/fetchFiglet", async (req) => {
  const body = figlet.textSync("Bun!");
  return new Response(body);
});
