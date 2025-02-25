import CategoryService from "@/admin/domains/category/category.services";

export async function POST(req: Request) {
    try {
        const { _id } = await req.json(); // Properly parse request body

        if (!_id) {
            return new Response(
                JSON.stringify({ message: "Product ID is required" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const productResponse = await CategoryService.GetCategory({ _id });

        if (!productResponse || !productResponse.data) {
            throw new Error("Invalid response from ProductService.GetProduct");
        }

        return new Response(JSON.stringify(productResponse.data), {
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