import { notFound } from "next/navigation";


// Components
import ProBundleDealList from "@/features/product/list/bundle-deal"
import ProTopPicksList from "@/features/product/list/top-picks"
import ProRelatedList from "@/features/product/list/related"
// import StoreInfo from './components/StoreInfo';
import ProductDetail from "@/features/product";


export default function Page(
    { params }: { params: { segments: string[] } }
) {
    const fullSlug = params?.segments?.join("/") || "";

    const match = fullSlug.match(/(.*)-i\.([\w.]+)/);

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
        <div className="space-y-5 md:my-5 container mx-auto">
            <ProductDetail product_id={lastId} />
            <ProTopPicksList />
            <ProBundleDealList />
            <ProRelatedList />
        </div>
    );
}
