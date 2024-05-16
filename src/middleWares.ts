import { createMiddleware, RouteBuilder } from "@bunicorn/server";
import { format } from "date-fns";

const requestLogger = createMiddleware(async (ctx) => {
  console.info(`----------------->>>>>>> REQUEST ${ctx.route.method} ${
    ctx.route.path
  }
  Request Id: req.id
  Timestamp: ${format(new Date(), "yyyy-MM-dd HH:mm:ss.SSS")}
  Body: ${JSON.stringify(await ctx.getBody())}  
  `);
});

export const baseRouteBuilder = new RouteBuilder().use(requestLogger);
