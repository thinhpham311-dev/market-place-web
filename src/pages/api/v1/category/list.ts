import type { NextApiRequest, NextApiResponse } from "next";
import { Category } from "@/admin/models";
import { withDB } from "@/admin/middleware/db";
import axios from "axios";


type ResponseData = {
    message: string;
    categories?: Array<typeof Category>;
};

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }
    try {
        const categories = await Category.find();

        if (!categories || categories.length === 0) {
            return res.status(404).json({ message: "No categories found" });
        }

        return res.status(200).json({ message: "Get categories list successfully", categories });
    } // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch (error: unknown) {
        const message = axios.isAxiosError(error) && error.response ? error.response.data.returnMessage : String(error);
        console.error("Error fetching categories:", message);
        return res.status(400).json({ message });
    }
}

export default withDB(handler);
