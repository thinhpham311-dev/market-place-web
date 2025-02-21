import type { NextApiRequest, NextApiResponse } from "next";
import { Category } from "@/admin/models";
import { withDB } from "@/admin/middleware/dbMiddleware";

type ResponseData = {
    message: string;
    categories?: Array<typeof Category>;
};

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    try {
        const categories = await Category.find();

        if (!categories || categories.length === 0) {
            return res.status(404).json({ message: "No categories found" });
        }

        return res.status(200).json({ message: "Get categories list successfully", categories });
    } // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch (error: unknown) {
        return res.status(500).json({ message: "Error retrieving categories" });
    }
}

export default withDB(handler);
