"use client";

import React from "react";
import {
    Card, CardContent, CardHeader, CardTitle,
    Separator
} from "@/components/ui";
import { images, socials } from "@/features/product/detail/constants";
import ProBreadcrumb from "./components/ProBreadcrumb";
import ProThumbnailGallery from "./components/ProThumbnailGallery";
import ProQuantitySelector from "./components/ProQuantitySelector";
import ProVariantsSelector from "./components/ProVariantsSelector";
import ProDescriptionContent from "./components/ProDescriptionContent";
import ProSpecifications from "./components/ProSpecifications";
import ProSocialsShare from "./components/ProSocialsShare";
import ProWishListToggle from "./components/ProWishListToggle";
import ProFlashSalePrice from "./components/ProFlashSalePrice"
import ProPurchaseActions from "./components/ProPurchaseActions"

import ReviewStars from "@/features/reviews/components/ReviewStars"
import { NotFound } from "@/components/layout";

import { selectVariantsStoreKey } from "./components/ProVariantsSelector/store/selectors"
import LoadingPlaceholder from "./components/LoadingSkeleton";
import { breadcrumbs, specs } from "@/features/product/detail/constants"
import { PRO_DETAIL } from "./constants";
import { useFetchData } from "./hooks";



export default function ProDetail({ lastId }: { lastId?: string }) {

    const { product, loading, error } = useFetchData({
        product_id: lastId
    })

    const hasNoData = !product || product.length === 0;


    if (loading && hasNoData) {
        return <LoadingPlaceholder />;
    }

    if (!loading && hasNoData && error) {
        return <NotFound message={error.message || "Something went wrong."} />;
    }

    if (!loading && hasNoData) {
        return <NotFound />;
    }

    return (
        <Card className="border-none shadow-none">
            <CardHeader className="py-3">
                <ProBreadcrumb
                    breadcrumbs={breadcrumbs(product)}
                />
            </CardHeader>

            <CardContent
                className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 pb-0"
            >

                <div className="col-span-3">
                    <Card
                        layout="horizontal"
                        className="rounded-none"
                    >
                        <CardContent className="p-3 ">
                            <div className="grid grid-cols-1 md:grid-cols-5  gap-3">

                                {/* Gallery + Socials */}
                                <div className="md:col-span-2 md:order-1 md:row-span-1">
                                    <ProThumbnailGallery data={images} />
                                </div>
                                <div className="md:col-span-2 md:order-3 md:row-span-1 flex items-center justify-center space-x-3">
                                    <ProSocialsShare data={socials} />
                                    <Separator orientation="vertical" />
                                    <ProWishListToggle />
                                </div>


                                <div className="md:col-span-3 md:order-2 md:row-span-2">
                                    <CardTitle className="flex items-center p-3">
                                        {product.product_name}
                                    </CardTitle>

                                    <ReviewStars
                                        data={product.product_ratingsAverange}
                                        readOnly
                                    />
                                    <ProFlashSalePrice
                                        price={product.product_price}
                                        flashSalePrice={product.product_price - 1}
                                    />
                                    <ProVariantsSelector
                                        storeKey={PRO_DETAIL}
                                        options={product.product_variations}
                                    />
                                    <ProQuantitySelector
                                        quantity={product.product_quantity}
                                    />
                                    <ProPurchaseActions data={product} />
                                </div>
                            </div>
                        </CardContent>

                    </Card>
                </div>

                {/* ✅ Description */}
                <div className="lg:col-span-2 md:col-span-2 col-span-3">
                    <ProDescriptionContent
                        description={product.product_description}
                    />
                </div>

                {/* ✅ Specifications */}
                <div className="lg:col-span-1 md:col-span-2 col-span-3">
                    <ProSpecifications
                        specs={specs(product)}
                    />
                </div>
            </CardContent>
        </Card>
    );
}
