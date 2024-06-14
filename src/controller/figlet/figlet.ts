import Elysia from "elysia";
import { generateFiglet } from "../../services/figlet";

export const getFiglet = new Elysia().get("/fetchFiglet", async () => {
  const response = await generateFiglet("Bun");
  return new Response(response);
});
