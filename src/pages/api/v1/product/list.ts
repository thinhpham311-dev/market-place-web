import type { NextApiRequest, NextApiResponse } from "next";
import { Product } from "@/admin/models";
import { withDB } from "@/admin/middleware/db";
import axios from "axios";

type ResponseData = {
    message: string;
    products?: Array<typeof Product>;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const products = await Product.find();

        if (!products.length) {
            return res.status(404).json({ message: "No products found" });
        }

        return res.status(200).json({ message: "Products retrieved successfully", products });
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars 
    catch (error: unknown) {
        const message = axios.isAxiosError(error) && error.response ? error.response.data.returnMessage : String(error);
        console.error("Error fetching products:", message);
        return res.status(400).json({ message });
    }
};

export default withDB(handler);
