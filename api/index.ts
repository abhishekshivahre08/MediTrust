import serverless from "serverless-http";
import { createServer } from "../server";

// Wrap the Express app with serverless-http for Vercel
const handler = serverless(createServer());

export default async function (req: any, res: any) {
  // serverless-http expects (event, context) when used on AWS-like platforms,
  // but on Vercel's Node runtime we can forward the request/response to the
  // express app handler. serverless-http provides a handler that accepts
  // Node's req/res when invoked directly.
  // The exported function can simply call the handler.
  return handler(req, res);
}
