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

        const products = await Product.find();

        if (!products || products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        return res.status(200).json({ message: "Get products list successfully", products });
    } // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch (error: unknown) {
        return res.status(500).json({ message: "Error retrieving products" });
    }
}

export default withDB(handler);
