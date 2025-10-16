import serverless from "serverless-http";
import path from "path";

// Import the built server bundle. The build outputs `dist/server/node-build.mjs`.
// We load it and extract the Express app factory (createServer) if available,
// otherwise we expect the bundle to export an `app` instance.
let _handler = null;

void (async () => {
  try {
    const mod = await import("../dist/server/node-build.mjs");
    const app = mod?.app ?? mod?.default ?? (mod?.createServer && mod.createServer());

    if (!app) {
      console.error("Failed to locate Express app in the built server bundle.");
      return;
    }

    _handler = serverless(app);
  } catch (err) {
    console.error("Error importing server bundle:", err);
  }
})();

export async function handler(req, res) {
  if (!_handler) {
    res.setHeader("content-type", "application/json");
    res.statusCode = 503;
    res.end(JSON.stringify({ error: "Server initializing, try again shortly" }));
    return;
  }

  return _handler(req, res);
}

export default handler;
