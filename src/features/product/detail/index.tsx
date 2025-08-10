"use client";

import React from "react";
import {
    Card, CardContent, CardHeader, CardTitle,
} from "@/components/ui";
import { images, socials } from "@/features/product/detail/constants";
import ProBreadcrumb from "./components/ProBreadcrumb";
import ThumbnailGallery from "./components/ThumbnailGallery";
import ProQuantitySelector from "./components/ProQuantitySelector";
import ProVariantsSelector from "./components/ProVariantsSelector";
import ProDescriptionContent from "./components/ProDescriptionContent";
import ProSpecifications from "./components/ProSpecifications";
import SocialsShare from "./components/SocialsShare";
import ProductPrice from "./components/ProductPrice"
import PurchaseActions from "./components/PurchaseActions"

import ReviewStars from "@/features/reviews/components/ReviewStars"
import { NotFound } from "@/components/layout";
import { Product } from "@/features/product/types";

import { injectReducer } from "@/store";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getProductDetail } from "./store/dataSlice";
import { selectProDetailByStoreKey } from "./store/selectors"
import reducer from "./store";
import LoadingPlaceholder from "./components/LoadingSkeleton";
import { breadcrumbs, specs } from "@/features/product/detail/constants"
import { PRO_DETAIL } from "./constants";

injectReducer(PRO_DETAIL, reducer);

export default function ProDetail({ lastId }: { lastId?: string }) {
    const dispatch = useAppDispatch();

    const { product = null, loading } = useAppSelector(selectProDetailByStoreKey(PRO_DETAIL));

    React.useEffect(() => {
        if (!lastId) return;
        const promise = dispatch(getProductDetail({
            product_id: lastId
        } as Product) as any);

        return () => {
            promise.abort();
        };
    }, [dispatch, lastId]);



    if (loading) {
        return (
            <LoadingPlaceholder />
        );
    }

    if (!product) return <NotFound />;


    return (
        <Card className="border-none shadow-none">
            <CardHeader className="py-3">
                <ProBreadcrumb
                    breadcrumbs={breadcrumbs(product)}
                />
            </CardHeader>

            <CardContent className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 pb-0">

                {/* ✅ Main Product Info */}
                <div className="col-span-3">
                    <Card layout="horizontal" className="grid grid-cols-1 md:grid-cols-5 rounded-none">
                        {/* Gallery + Socials */}
                        <CardHeader className="md:col-span-2 p-3">
                            <ThumbnailGallery data={images} />
                            <SocialsShare data={socials} />
                        </CardHeader>

                        {/* Product Info + Actions */}
                        <CardContent className="md:col-span-3 p-3">
                            <CardTitle className="flex items-center p-3">{product.product_name}</CardTitle>
                            <ReviewStars data={product.product_ratingsAverange} readOnly />
                            <ProductPrice price={product.product_price} flashSalePrice={product.product_price - 1} />
                            <ProVariantsSelector
                                storeKey={PRO_DETAIL}
                                options={product.product_variations}
                            />
                            <ProQuantitySelector quantity={product.product_quantity} />
                            <PurchaseActions data={product} />
                        </CardContent>
                    </Card>
                </div>

                {/* ✅ Description */}
                <div className="lg:col-span-2 md:col-span-2">
                    <ProDescriptionContent description={product.product_description} />
                </div>

                {/* ✅ Specifications */}
                <div className="lg:col-span-1 md:col-span-2">
                    <ProSpecifications specs={specs(product)} />
                </div>
            </CardContent>
        </Card>
    );
}
