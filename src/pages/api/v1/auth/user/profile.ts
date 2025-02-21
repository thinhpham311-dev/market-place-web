import type { NextApiRequest, NextApiResponse } from "next";
import { DeliveryPartner, Customer } from "@/admin/models";
import { withDB } from "@/admin/middleware/dbMiddleware";

type ResponseData = {
    message: string;
    user?: Array<typeof Customer> | Array<typeof DeliveryPartner>;
    accessToken?: string;
    refreshToken?: string

};

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    try {
        const { userId, role } = req.query;
        let user;

        if (role === "Customer") {
            user = await Customer.findById(userId)
        } else if (role === "DeliveryPartner") {
            user = await DeliveryPartner.findById(userId)
        } else {
            return res.status(403).send({ message: "Invalid role" });
        }

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        return res.status(200).send({ message: "User fetched successful", user })
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars 
    catch (error) {
        // Use the custom error handler to format the error
        return res.status(500).send({ message: "Error" });
    }
}

export default withDB(handler);
