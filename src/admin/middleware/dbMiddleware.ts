import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { connectDB } from "@/admin/config/connect";

export function withDB(handler: NextApiHandler) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        await connectDB(); // Ensure DB connection before handling request
        return handler(req, res);
    };
}
