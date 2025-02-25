import DeliveryPartnerService from "@/admin/domains/user/deliverypartner.services";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json(); // Properly parse request body
        console.log(email, password)
        if (!email) {
            return new Response(
                JSON.stringify({ message: "Phone is required" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        if (!password) {
            return new Response(
                JSON.stringify({ message: "Password is required" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const deliveryPartnerResponse = await DeliveryPartnerService.GetDeliveryPartnerLogin({ email, password });

        if (!deliveryPartnerResponse || !deliveryPartnerResponse.data) {
            throw new Error("Invalid response from Customer Login");
        }

        return new Response(JSON.stringify(deliveryPartnerResponse.data), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: (error as Error).message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}