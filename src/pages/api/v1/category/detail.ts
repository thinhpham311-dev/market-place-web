import type { NextApiRequest, NextApiResponse } from "next";
import { Category } from "@/admin/models";
import { withDB } from "@/admin/middleware/dbMiddleware";
import axios from "axios";

type ResponseData = {
    message: string;
    category?: typeof Category;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { _id } = req.body;
    if (!_id) {
        return res.status(400).json({ message: "Category ID is required" });
    }

    try {
        const category = await Category.findById(_id);

        if (!category) {
            return res.status(404).json({ message: "Category Not Found" });
        }

        return res.status(200).json({ message: "Category retrieved successfully", category });
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch (error: unknown) {
        const message = axios.isAxiosError(error) && error.response ? error.response.data.returnMessage : error instanceof Error ? error.message : "An unexpected error occurred";
        console.error("Error fetching category:", message);
        return res.status(500).json({ message });
    }
};

export default withDB(handler);