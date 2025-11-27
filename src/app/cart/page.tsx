import dynamic from "next/dynamic";
// import CatByCategoryId from "@/features/category/by-category-id";
// import ProListByCategoryId from "@/features/product/list/by-category-id";
import { Skeleton } from "@/components/ui";

const ProRelatedList = dynamic(() => import('@/features/product/list/related'), {
    ssr: false,
    loading: () => <Skeleton className="w-full h-48" />,

});

const MainCart = dynamic(() => import('@/features/cart/main-cart'), {
    ssr: false,
    loading: () => <Skeleton className="w-full h-48" />,

});

// import ProRelatedList from "@/features/product/list/related";
// import MainCart from "@/features/cart/main-cart"

export default function Page() {

    return (
        <div className="space-y-5 container mx-auto my-5">
            <MainCart />
            <ProRelatedList />
        </div>
    );
}
