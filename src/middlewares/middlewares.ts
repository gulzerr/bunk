import { ElysiaLogging, type Logger } from "@otherguy/elysia-logging";
import { format } from "date-fns";
import type { Context } from "elysia";

const apiLogger: Logger = console;

export const elysiaLogging = ElysiaLogging(apiLogger, {
  format: (log) => `
  [${self.crypto.randomUUID()}] "${format(
    new Date(),
    "yyyy-MM-dd HH:mm:ss.SSS"
  )} ${log.request.method} ${log.request.url.path} completed with status ${
    log.response.status_code
  } in ${log.response.time} ms",
  request: {
    method: ${log.request.method},
    url: {
      path: ${log.request.url.path},
      params: ${JSON.stringify(log.request.url.params)}
    },
  },
  response: {
    status_code: ${log.response.status_code}
  }
`,
});

// // Logging middleware function
// export async function loggingMiddleware(ctx: Context) {
//   console.log(`[${new Date().toISOString()}] ${ctx.body} `);

//   // Capture the start time
//   const start = Date.now();

//   try {
//     // Calculate response time
//     const responseTime = Date.now() - start;

//     // Log the response details

//     if (ctx.response) {
//       console.log(
//         `[${new Date().toISOString()}- ${
//           ctx.response.status_code
//         } ${responseTime}ms`
//       );
//       console.log("Response Body:", ctx.response.body);
//     }
//   } catch (error) {
//     // Handle any errors
//     console.error("Error occurred during request handling:", error);
//     // @ts-ignore
//     ctx.response = {
//       status: 500,
//       body: { error: "Internal Server Error" },
//     };
//   }
// }
