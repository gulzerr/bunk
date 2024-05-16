import figlet from "figlet";
import { z } from "zod";
import { createMiddleware } from "@bunicorn/server";
import { baseRouteBuilder } from "../../middleWares";

const anotherMiddleware = createMiddleware((ctx) => {
  /* The same code we had above */
});
const figletRouteBuilder = baseRouteBuilder.use(anotherMiddleware);
export const getFiglet = figletRouteBuilder
  .input(z.object({ text: z.string() }))
  .post("/fetchFiglet", async (ctx) => {
    const body = await ctx.getBody();
    const response = figlet.textSync(body.text);
    //string next line
    return new Response(response);
  });
