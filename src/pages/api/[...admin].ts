
import express, { Request, Response } from "express";
import { adminJs, buildAdminRouter } from "@/admin/config/setup";
import { connectDB } from "@/admin/config/connect";

const app = express();

const start = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    await connectDB(process.env.MONGODB_URI);
    await buildAdminRouter(app)

    if (process.env.NODE_ENV === "development") {
      await adminJs.watch();
    }

    console.log("AdminJS is running at:", adminJs.options.rootPath);
  } catch (error) {
    console.error("Error starting AdminJS:", error);
    process.exit(1);
  }
};

// Ensure start is executed before handling requests
start();

export default async function handler(req: Request, res: Response) {
  return app(req, res);
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
