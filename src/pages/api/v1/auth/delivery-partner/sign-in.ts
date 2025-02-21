import type { NextApiRequest, NextApiResponse } from "next";
import { DeliveryPartner } from "@/admin/models";
import { withDB } from "@/admin/middleware/dbMiddleware";
import { generateTokens } from "@/admin/config/config"

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
        return res.status(500).json({ message: "Error retrieving categories" });
    }
}

export default withDB(handler);
