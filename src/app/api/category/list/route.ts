import CategoryService from "@/admin/domains/category/category.services";

export async function POST() {
    try {
        const res = await CategoryService.GetCategoryList();

        if (!res || !res.data) {
            throw new Error("Invalid response from get product list by category ID");
        }

        return new Response(JSON.stringify(res.data), {
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
