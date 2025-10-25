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
    const product_id = ids.at(-1);
    const shop_id = ids.at(0);

    if (!product_id) {
        notFound();
    }

    return (
        <div className="space-y-5 md:my-5 container mx-auto">
            <ProductDetail
                product_id={product_id}
                shop_id={shop_id}
            />
            <ProTopPicksList />
            <ProBundleDealList />
            <ProRelatedList />
        </div>
    );
}
