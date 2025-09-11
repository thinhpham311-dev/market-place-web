"use client";
//ui


//hooks
import { useAppSelector } from "@/lib/hooks";

// Actions and selectors
import { selectVariantsStoreKey } from "@/features/product/components/ProVariantsSelector/store/selectors";
import { selectQuantitySelectorByStoreKey } from "@/features/product/components/ProQuantitySelector/store/selectors"

// Components
import ProWrapper from "@/features/product/components/ProWrapper";
import ProDetailCard from "@/features/product/components/ProDetailCard";
import Cart from "@/features/cart";
// import ProductReview from "@/features/product/reviews";
import ProProvider from "./providers"

//constants
import { PRO_DETAIL } from "@/features/product/constants";

interface IProductDetail {
    lastId?: string;
}

export default function ProductDetail(
    { lastId }: IProductDetail
) {
    const { sku_tier_idx } = useAppSelector(selectVariantsStoreKey(PRO_DETAIL));
    const { currentQuantity } = useAppSelector(selectQuantitySelectorByStoreKey(PRO_DETAIL));
    return (
        <ProProvider
            contextValues={{
                product_id: lastId || "",
                variants: sku_tier_idx || [],
                quantity: currentQuantity || 1
            }}>
            <ProWrapper>
                <Cart>
                    <ProDetailCard />
                </Cart>
                {/* <ProductReview /> */}
            </ProWrapper>
        </ProProvider>
    );
}
