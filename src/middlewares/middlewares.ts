import { format, differenceInMilliseconds } from "date-fns";

// Logging middleware function
export async function requestLoggingMiddleware(opts: {
  request: Request;
  path: string;
  body: any;
}) {
  const { request, path, body } = opts;
  console.log(`
  [${(request as any).uuid}] ${format(new Date(), "yyyy-MM-dd HH:mm:ss.SSS")} ${
    request.method
  } ${path},
    body: ${JSON.stringify(body)}
`);
}
// calculate response time in milliseconds using date-fns
export async function responseLoggingMiddleware(opts: {
  request: Request;
  response: any;
  set: any;
}) {
  const { request, response, set } = opts;
  console.log(`
  [${(request as any).uuid}] ${format(
    new Date(),
    "yyyy-MM-dd HH:mm:ss.SSS"
  )}, response: ${JSON.stringify(response)}, completed with status ${
    set.status
  } in ${differenceInMilliseconds(new Date(), (request as any).startTime)} ms
`);
}
