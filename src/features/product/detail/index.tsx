"use client";

import React from "react";
import {
    Card, CardContent, CardHeader,
    Breadcrumb, BreadcrumbList, BreadcrumbLink, BreadcrumbSeparator
} from "@/components/ui";

import { images, socials } from "./data";
import ProBreadcrumb from "./components/ProBreadcrumb";
import ThumbnailGallery from "./components/ThumbnailGallery";
import ProQuantitySelector from "./components/ProQuantitySelector";
import ProVariantsSelector from "./components/ProVariantsSelector";
import ProDescriptionContent from "./components/ProDescriptionContent";
import ProSpecifications from "./components/ProSpecifications";
import SocialsShare from "./components/SocialsShare";
import ProInfo from "./components/ProInfo";
import PurchaseActions from "./components/PurchaseActions"

import { NotFound } from "@/components/layout";
import { IProduct } from "../types";

import { injectReducer } from "@/store";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getProductDetail } from "./store/dataSlice";
import reducer from "./store";
import LoadingPlaceholder from "./components/LoadingSkeleton";


injectReducer("detail", reducer);

export default function ProDetail({ lastId }: { lastId?: string }) {
    const dispatch = useAppDispatch();
    const { detail: product = null, loading } = useAppSelector((state) => state.detail.data);

    React.useEffect(() => {
        if (!lastId) return;
        const promise = dispatch(getProductDetail({
            product_id: lastId
        } as IProduct) as any);

        return () => {
            promise.abort();
        };
    }, [dispatch, lastId]);

    // ✅ Render helpers
    const renderBreadcrumb = (items: any[], getHref: (item: any) => string, getLabel: (item: any) => string) => (
        <Breadcrumb>
            <BreadcrumbList>
                {items.map((item, index, arr) => (
                    <React.Fragment key={item._id}>
                        <BreadcrumbLink href={getHref(item)}>
                            {getLabel(item)}
                        </BreadcrumbLink>
                        {index < arr.length - 1 && <BreadcrumbSeparator />}
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );

    if (loading) {
        return (
            <LoadingPlaceholder />
        );
    }

    if (!product) return <NotFound />;

    // ✅ Specs configuration
    const specs = [
        {
            label: "Product Name:",
            value: renderBreadcrumb(
                [product],
                (item) => `${item.product_slug}.${item.product_id}`,
                (item) => item.product_name
            )
        },
        {
            label: "Categories:",
            value: renderBreadcrumb(
                product.product_category || [],
                (item) => {
                    const ancestors = Array.isArray(item.ancestors) ? item.ancestors.filter(Boolean) : [];
                    const allIds = [...ancestors, item.category_id]; // ensure no duplicate manually if needed
                    return `/categories/${item.category_slug}-cat.${allIds.join(".")}`;
                },
                (item) => item.category_name
            )
        },
        {
            label: "Shop Name:",
            value: renderBreadcrumb(
                [product.product_shop],
                (item) => `/shop/${item._id}`,
                (item) => item.name
            )
        }
    ];

    return (
        <Card className="border-none shadow-none">
            <CardHeader className="py-3">
                <ProBreadcrumb
                    categories={product.product_category}
                    product_name={product.product_name}
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
                            <div className="flex flex-col h-full space-y-3">
                                <ProInfo data={product} />
                                <ProVariantsSelector options={product.product_variations} />
                                <ProQuantitySelector quantity={product.product_quantity} />
                                <PurchaseActions data={product} />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* ✅ Description */}
                <div className="lg:col-span-2 md:col-span-2">
                    <ProDescriptionContent description={product.product_description} />
                </div>

                {/* ✅ Specifications */}
                <div className="lg:col-span-1 md:col-span-2">
                    <ProSpecifications specs={specs} />
                </div>
            </CardContent>
        </Card>
    );
}
