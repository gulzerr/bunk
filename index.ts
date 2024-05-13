import { app } from "./app";

const server = Bun.serve({
  fetch(req) {
    // handleRequest function requires the Request object
    // and returns a Response object, that simple!
    return app.handleRequest(req);
  },
  port: 8000,
});
console.log(`Listening on http://localhost:${server.port} ...`);
