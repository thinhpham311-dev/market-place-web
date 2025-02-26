import CustomerService from "@/admin/domains/user/customer.services";

export async function POST(req: Request) {
    try {
        const { phone } = await req.json(); // Properly parse request body

        if (!phone) {
            return new Response(
                JSON.stringify({ message: "Phone is required" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const customerResponse = await CustomerService.CustomerLogin({ phone });

        if (!customerResponse || !customerResponse.data) {
            throw new Error("Invalid response from Customer Login");
        }

        return new Response(JSON.stringify(customerResponse.data), {
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