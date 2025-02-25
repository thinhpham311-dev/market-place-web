import type { NextApiRequest, NextApiResponse } from "next";
import { DeliveryPartner } from "@/admin/models";
import { withDB } from "@/admin/middleware/dbMiddleware";
import { generateTokens } from "@/admin/config/config"
import axios from "axios";

type ResponseData = {
    message: string;
    deliveryPartner?: Array<typeof DeliveryPartner>;
    accessToken?: string;
    refreshToken?: string

};

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    try {
        const { email, password } = req.body;
        const deliveryPartner = await DeliveryPartner.findOne({ email })

        if (!deliveryPartner) {
            return res.status(404).send({ message: "Delivery Partner not found" })
        }

        const isMatch = password === deliveryPartner.password

        if (!isMatch) {
            return res.status(400).send({ message: "Invalid Credentials" })
        }

        const { accessToken, refreshToken } = generateTokens(deliveryPartner);

        return res.send({ message: "Login successful", accessToken, refreshToken, deliveryPartner })

    } // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch (error: unknown) {
        const message = axios.isAxiosError(error) && error.response ? error.response.data.returnMessage : String(error);
        console.error("Error fetching delivery login:", message);
        return res.status(400).json({ message });
    }
}

export default withDB(handler);
