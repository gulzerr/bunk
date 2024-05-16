import { app } from "./app";

const server = Bun.serve({
  fetch(req, res) {
    // app.addMiddleware(responseLogger);
    return app.handleRequest(req);
  },
  port: 8000,
});
console.log(`Listening on http://localhost:${server.port} ...`);
