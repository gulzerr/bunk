import { logger } from "@bogeychan/elysia-logger";
import { format } from "date-fns";
import Elysia from "elysia";

export const logMiddleware = new Elysia()
  .use(
    logger({
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
        },
      },
    })
  )
  .get("/", (ctx) => {
    ctx.log.info(ctx, "Context");
    console.log(`----------------->>>>>>> REQUEST ${ctx.request.method} ${
      ctx.path
    }
      Request Id: req.id
      Timestamp: ${format(new Date(), "yyyy-MM-dd HH:mm:ss.SSS")}
      Body: ${JSON.stringify(ctx.body)}
      `);
    return "basic";
  });
