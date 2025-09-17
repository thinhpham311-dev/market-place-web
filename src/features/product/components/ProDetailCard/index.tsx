"use client";
//ui
import {
    Card,
    // CardTitle,
    CardHeader,
    CardContent,
    Separator,
} from "@/components/ui";

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
import ProFlashSalePrice from "@/features/product/components/ProFlashSalePrice"
import ProReviewStar from "@/features/product/components/ProReviewStar"
import ProActions from "@/features/product/components/ProActions"
import NotFound from "./NotFound"
import LoadingSkeleton from "./Loading"

//constants
import { PRO_DETAIL, breadcrumbs, specs } from "@/features/product/constants";
import { useSpuContext } from "@/features/product/spu/hooks";
import { useSkuContext } from "@/features/product/sku/hooks";
import { useShoppingCartContext } from "@/features/cart/hooks";

export default function ProDetail() {
    const { spu, loading: spuLoading, error: spuError } = useSpuContext()
    const { sku, loading: skuLoading, error: skuError } = useSkuContext()
    const { addItem } = useShoppingCartContext()
    const hasNoData = !spu || Object.keys(spu).length === 0;
    if (spuLoading && hasNoData) {
        return <LoadingSkeleton />;
    }

    if (!spuLoading && hasNoData && spuError) {
        return <NotFound message={spuError || "Something went wrong."} />;
    }

    if (!spuLoading && hasNoData) {
        return <NotFound />;
    }

    return (
        <Card className="border-none shadow-none">
            <CardHeader className="py-3">
                <ProBreadcrumb
                    breadcrumbs={breadcrumbs(spu)}
                />
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
                                    <ProTitle
                                        title={spu?.product_name}
                                    />
                                    <ProReviewStar
                                        rating={spu?.product_ratingsAverange}
                                    />
                                    <ProFlashSalePrice
                                        spu={{
                                            defaultPrice: spu?.product_price,
                                            minPrice: spu?.product_price,
                                            maxPrice: spu?.product_price,
                                            flashSaleMinPrice: spu?.product_price,
                                            flashSaleMaxPrice: spu?.product_price,
                                        }}
                                        sku={{
                                            price: sku?.sku_price,
                                            flashSalePrice: Number(sku?.sku_price) - 10,
                                        }}
                                        loading={skuLoading}
                                        error={skuError}
                                    />
                                    <ProVariantsSelector
                                        options={spu?.product_variations}
                                        storeKey={PRO_DETAIL}
                                    />
                                    <ProQuantitySelector
                                        initialValue={1}
                                        maxQuantity={sku?.sku_stock}
                                        storeKey={PRO_DETAIL}
                                    />
                                    <ProActions
                                        loading={skuLoading}
                                        error={skuError}
                                        storeKey={PRO_DETAIL}
                                        spu={spu}
                                        sku={sku}
                                        onAddToCart={addItem} />
                                </div>
                            </div>
                        </CardContent>
                    </Card >

                </div>
                <div className="md:col-span-2 col-span-3 md:order-1 order-2">
                    <ProDescriptionContent
                        description={spu?.product_description}
                    />
                </div>
                <div className="md:col-span-1 col-span-3 md:order-2 order-1">
                    <ProSpecifications
                        specs={specs(spu)}
                    />
                </div>
            </CardContent>
        </Card>
    );
}
