import express, { Request, Response } from "express";
import { adminJs, buildAdminRouter } from "@/admin/config/setup";
import { connectDB } from "@/admin/config/connect";

const app = express();

if (!process.env.NEXT_PUBLIC_MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

connectDB(process.env.NEXT_PUBLIC_MONGODB_URI);
buildAdminRouter(app);

adminJs.watch();

export default function handler(req: Request, res: Response) {
  // This is how you should handle requests in Next.js API routes
  app(req, res); // Passing req and res to the Express app
}


export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
