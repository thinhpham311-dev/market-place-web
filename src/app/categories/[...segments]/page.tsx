
import CatByCategoryId from "@/features/category/detail";
import ProListByCategoryId from "@/features/product/list/by-category-id";

interface PageProps {
    params: { segments?: string[] };
}

export default function Page({ params }: PageProps) {
    // ✅ Safely join segments into a full slug
    const fullSlug = params?.segments?.join("/") || "";

    // ✅ Correct regex groups
    const match = fullSlug.match(/(.*)-cat\.([\w.]+)/);

    if (!match) {
        return <div>404 Not Found</div>;
    }

    // match[2] contains "ancestors._id" part → split into array
    const ids = match[2].split(".");

    return (
        <div className="space-y-5 container mx-auto my-5">
            <CatByCategoryId ids={ids} />
            <ProListByCategoryId ids={ids} />
        </div>
    );
}
