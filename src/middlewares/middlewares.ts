import { format, differenceInMilliseconds } from "date-fns";

function logError(uuid: string, error: any) {
  console.log(`[${uuid}] [${new Date().toISOString()}] Error:`);
  console.log(`Message: ${error.message}`);
  console.log(`Stack: ${error.stack}`);
}
// Logging middleware function
export async function requestLoggingMiddleware(opts: {
  request: Request;
  path: string;
  body: any;
}) {
  const { request, path, body } = opts;
  const uuid = (request as any).uuid;
  try {
    console.log(`[${uuid}] ${format(new Date(), "yyyy-MM-dd HH:mm:ss.SSS")} ${
      request.method
    } ${path},
        body: ${JSON.stringify(body)}
    `);
  } catch (error) {
    const err = error as Error;
    logError(uuid, err);
    throw err;
  }
}
// calculate response time in milliseconds using date-fns
export async function responseLoggingMiddleware(opts: {
  request: Request;
  response: any;
  set: any;
}) {
  const { request, response, set } = opts;
  const uuid = (request as any).uuid;
  try {
    console.log(`[${uuid}] ${format(
      new Date(),
      "yyyy-MM-dd HH:mm:ss.SSS"
    )}, response: ${JSON.stringify(response)}, completed with status ${
      set.status
    } in ${differenceInMilliseconds(new Date(), (request as any).startTime)} ms
    `);
  } catch (error) {
    const err = error as Error;
    logError(uuid, err);
    throw err;
  }
}
