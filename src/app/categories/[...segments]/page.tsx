import { notFound } from "next/navigation"; // ✅ import notFound
import CatByCategoryId from "@/features/category/detail";
import ProListByCategoryId from "@/features/product/list/by-category-id";

interface PageProps {
    params: { segments?: string[] };
}

export default function Page({ params }: PageProps) {
    const fullSlug = params?.segments?.join("/") || "";

    const match = fullSlug.match(/(.*)-cat\.([\w.]+)/);

    if (!match) {
        notFound();
    }

    // ✅ Lấy các id
    const ids = match![2].split(".");
    const lastId = ids.at(-1);

    if (!lastId) {
        notFound();
    }

    return (
        <div className="space-y-5 container mx-auto my-5">
            <CatByCategoryId ids={ids} />
            <ProListByCategoryId lastId={lastId} />
        </div>
    );
}
