import type { NextApiResponse, NextApiRequest } from "next";
import { DeliveryPartner, Customer } from "@/admin/models";
import { withDB, verifyToken } from "@/admin/middleware";
import axios from "axios";

type ResponseData = {
    message: string;
    user?: typeof Customer | typeof DeliveryPartner; // Single user object, not an array
    accessToken?: string;
    refreshToken?: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const { userId, role } = req.body;

        let user;

        if (role === "Customer") {
            user = await Customer.findById(userId);
        } else if (role === "DeliveryPartner") {
            user = await DeliveryPartner.findById(userId);
        } else {
            return res.status(403).json({ message: "Invalid role" });
        }

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User fetched successfully", user });
    } catch (error) {
        const message = axios.isAxiosError(error) && error.response ? error.response.data.returnMessage : String(error);
        console.error("Error fetching products:", message);
        return res.status(400).json({ message });
    }
}

// Wrap the handler with middleware
export default withDB(verifyToken(handler));