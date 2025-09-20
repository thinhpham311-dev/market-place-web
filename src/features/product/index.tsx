"use client";

//ui
import { Card, CardHeader, CardContent, Separator } from "@/components/ui"
// Components
import ProWrapper from "@/features/product/components/ProWrapper";
import ProSpuDetailContainer from "@/features/product/components/ProSpuDetailContainer";
import ProSkuDetailContainer from "@/features/product/components/ProSkuDetailContainer";
// Components
import ProBreadcrumb from "@/features/product/components/ProBreadcrumb";

import ProDescriptionContent from "@/features/product/components/ProDescriptionContent"
import ProSpecifications from "@/features/product/components/ProSpecifications";
import ProTitle from "@/features/product/components/ProTitle";
import ProThumbnailGallery from "@/features/product/components/ProThumbnailGallery";
import ProQuantitySelector from "@/features/product/components/ProQuantitySelector";
import ProVariantsSelector from "@/features/product/components/ProVariantsSelector";
import ProSocialsShare from "@/features/product/components/ProSocialsShare";
import ProWishListToggle from "@/features/product/components/ProWishListToggle";
import ProPriceDisplay from "@/features/product/components/ProPriceDisplay"
import ProReviewStar from "@/features/product/components/ProReviewStar"
import ProActions from "@/features/product/components/ProActions"



import Cart from "@/features/cart";
// import ProductReview from "@/features/product/reviews";
import ProProvider from "./providers"
import { useAppSelector } from "@/lib/hooks";
import { PRO_DETAIL } from "@/features/product/constants"
import { selectVariantsStoreKey } from "@/features/common/option-selector/store/selectors";
import { selectQuantitySelectorByStoreKey } from "@/features/common/quantity-selector/store/selectors"

interface IProductDetail {
    product_id?: string;
}

export default function ProductDetail(
    { product_id = "" }: IProductDetail
) {
    const { sku_tier_idx, optionsCount } = useAppSelector(selectVariantsStoreKey(PRO_DETAIL));
    const { currentQuantity } = useAppSelector(
        selectQuantitySelectorByStoreKey(PRO_DETAIL)
    );
    return (
        <ProProvider
            contextValues={{
                product_id,
                sku_tier_idx,
                optionsCount,
                currentQuantity

            }}>
            <ProWrapper>
                <Cart>
                    <ProSpuDetailContainer >
                        <Card className="border-none shadow-none">
                            <CardHeader className="py-3">
                                <ProBreadcrumb />
                            </CardHeader>
                            <CardContent
                                className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 pb-0"
                            >
                                <div className="md:col-span-3 col-span-3 order-0">
                                    <Card
                                        layout="horizontal"
                                        className="rounded-none"
                                    >
                                        <CardContent className="p-3 ">
                                            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                                                <div className="md:col-span-2 md:order-1 md:row-span-1">
                                                    <ProThumbnailGallery />
                                                </div>
                                                <div className="md:col-span-2 md:order-3 md:row-span-1 flex items-center justify-center space-x-3">
                                                    <ProSocialsShare />
                                                    <Separator orientation="vertical" />
                                                    <ProWishListToggle />
                                                </div>
                                                <div className="md:col-span-3 md:order-2 md:row-span-2">
                                                    <ProTitle />
                                                    <ProReviewStar />
                                                    <ProSkuDetailContainer>
                                                        <ProPriceDisplay />
                                                        <ProVariantsSelector />
                                                        <ProQuantitySelector />

                                                        <Cart>
                                                            <ProActions />
                                                        </Cart>
                                                    </ProSkuDetailContainer>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                                <div className="md:col-span-2 col-span-3 md:order-1 order-2">
                                    <ProDescriptionContent />
                                </div>
                                <div className="md:col-span-1 col-span-3 md:order-2 order-1">
                                    <ProSpecifications />
                                </div>
                            </CardContent>
                        </Card>
                    </ProSpuDetailContainer>
                </Cart>
                {/* <ProductReview /> */}
            </ProWrapper>
        </ProProvider >
    );
}
