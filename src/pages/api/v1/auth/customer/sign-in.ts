import type { NextApiRequest, NextApiResponse } from "next";
import { Customer } from "@/admin/models";
import { withDB } from "@/admin/middleware/db";
import { generateTokens } from "@/admin/config/config"
import axios from "axios";

type ResponseData = {
    message: string;
    customer?: Array<typeof Customer>;
    accessToken?: string;
    refreshToken?: string

};

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }
    try {
        const { phone } = req.body;
        const customer = await Customer.findOne({ phone })

        if (!customer) {
            await new Customer({
                phone,
                role: "Customer",
                isActivated: true
            }).save();
        }

        const { accessToken, refreshToken } = generateTokens(customer);
        return res.status(200).send({ message: customer ? "Login successful" : "Customer created and logged in", accessToken, refreshToken, customer })

    } // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch (error: unknown) {
        const message = axios.isAxiosError(error) && error.response ? error.response.data.returnMessage : String(error);
        console.error("Error fetching login customer:", message);
        return res.status(400).json({ message });
    }
}

export default withDB(handler);
