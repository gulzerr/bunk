import { ElysiaLogging, type Logger } from "@otherguy/elysia-logging";
import { format } from "date-fns";

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
  },
`,
});
