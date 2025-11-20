"use client";
//ui
import { Card, CardHeader, CardContent, Separator } from "@/components/ui"
// Components
import ProWrapper from "@/features/product/components/ProWrapper";
import ProSpuContainer from "@/features/product/components/ProSpuContainer";
import ProSkuContainer from "@/features/product/components/ProSkuContainer";
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
import ProShopInfo from "@/features/product/components/ProShopInfo";
import { useAppSelector } from "@/lib/hooks";
import { PRO_DETAIL } from "@/features/product/constants"
import { selectOptionsStoreKey } from "@/features/common/option-selector/store/selectors";
import { selectQuantitySelector } from "@/features/common/quantity-selector/store/selectors"

interface IProductDetail {
    product_id?: string;
    shop_id?: string;
}

export default function ProductDetail(
    { product_id = "", shop_id = "" }: IProductDetail
) {

    return (
        <ProWrapper>
            <ProSpuContainer
                product_id={product_id}
            >
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
                                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
                                        <div className="lg:col-span-2 lg:order-1 md:row-span-1">
                                            <ProThumbnailGallery />
                                        </div>
                                        <div className="lg:col-span-2 lg:order-3 md:row-span-1 flex items-center justify-center space-x-3">
                                            <ProSocialsShare />
                                            <Separator orientation="vertical" />
                                            <ProWishListToggle />
                                        </div>
                                        <div className="lg:col-span-3 lg:order-2 md:row-span-2">
                                            <ProTitle />
                                            <ProReviewStar />
                                            <ProSkuContainer
                                                product_id={product_id}
                                            >
                                                <ProPriceDisplay />
                                                <ProVariantsSelector />
                                                <ProQuantitySelector />
                                                <ProActions />
                                            </ProSkuContainer>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="lg:col-span-3 col-span-3 md:order-1 order-2">
                            <ProShopInfo shop_id={shop_id} />
                        </div>
                        <div className="lg:col-span-2 col-span-3 md:order-1 order-2">
                            <ProDescriptionContent />
                        </div>
                        <div className="lg:col-span-1 col-span-3 md:order-2 order-1">
                            <ProSpecifications />
                        </div>
                    </CardContent>
                </Card>
            </ProSpuContainer>
            {/* <ProductReview /> */}
        </ProWrapper>
    );
}
