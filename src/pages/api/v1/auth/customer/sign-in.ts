import type { NextApiRequest, NextApiResponse } from "next";
import { Customer } from "@/admin/models";
import { withDB } from "@/admin/middleware/dbMiddleware";
import { generateTokens } from "@/admin/config/config"

type ResponseData = {
    message: string;
    customer?: Array<typeof Customer>;
    accessToken?: string;
    refreshToken?: string

};

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
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
        return res.status(500).json({ message: "Error retrieving categories" });
    }
}

export default withDB(handler);
