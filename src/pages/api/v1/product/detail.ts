import type { NextApiRequest, NextApiResponse } from "next";
import { Product } from "@/admin/models";
import { withDB } from "@/admin/middleware/db";
import axios from "axios";

type ResponseData = {
    message: string;
    product?: typeof Product;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { _id } = req.body;
    if (!_id) {
        return res.status(400).json({ message: "Product ID is required" });
    }

    try {
        const product = await Product.findById(_id);

        if (!product) {
            return res.status(404).json({ message: "Product Not Found" });
        }

        return res.status(200).json({ message: "Product retrieved successfully", product });
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch (error: unknown) {
        const message = axios.isAxiosError(error) && error.response ? error.response.data.returnMessage : error instanceof Error ? error.message : "An unexpected error occurred";
        console.error("Error fetching product:", message);
        return res.status(500).json({ message });
    }
};

export default withDB(handler);