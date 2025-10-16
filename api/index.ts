import serverless from "serverless-http";
import { createServer } from "../server";

// Create the express app and wrap it for serverless platforms.
const app = createServer();
const handler = serverless(app as any);

export default async function (req: any, res: any) {
	return handler(req, res);
}
