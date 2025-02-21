

import type { NextApiRequest, NextApiResponse } from "next";
import { Product } from "@/admin/models";
import { withDB } from "@/admin/middleware/dbMiddleware";

type ResponseData = {
    message: string;
    products?: Array<typeof Product>;
};

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }
    try {
        const { categoryId } = req.query;
        const products = await Product.find({ category: categoryId }).select("-category").exec();
        // If no categories found, return a specific message
        if (!products || products.length === 0) {
            return res.status(404).send({ message: "No products found" });
        }

        return res.status(200).send({ message: "Get products list successfully", products })
    } // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch (error: unknown) {
        return res.status(500).json({ message: "Error retrieving categories" });
    }
}

export default withDB(handler);
