"use client";
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, BreadcrumbSeparator, Breadcrumb, BreadcrumbList, BreadcrumbLink } from "@/components/ui";
import { images, socials } from "./data";
import ProBreadcrumb from "./components/ProBreadcrumb";
import ThumbnailGallery from "./components/ThumbnailGallery";
import ProQuantitySelector from "./components/ProQuantitySelector";
import ProVariantsSelector from "./components/ProVariantsSelector";
import ProDescriptionContent from "./components/ProDescriptionContent";
import ProSpecifications from "./components/ProSpecifications";
import SocialsShare from "./components/SocialsShare";
import ProInfo from "./components/ProInfo";
import { NotFound } from "@/components/layout";
import { IProduct } from "../types";
import { injectReducer } from "@/store";
import { getProductDetail } from "./store/dataSlice";
import reducer from "./store";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import PurchaseActions from "./components/PurchaseActions";

interface IProDetailProps {
    id: string;
}

injectReducer("detail", reducer);

export default function ProDetail({ id }: IProDetailProps) {
    const dispatch = useAppDispatch();
    const { detail: product = null, loading } = useAppSelector(
        (state) => state.detail.data
    );

    React.useEffect(() => {
        if (id) {
            dispatch(getProductDetail({ _id: id } as IProduct) as any);
        }
    }, [dispatch, id]);

    if (loading) {
        return (
            <Card className="border-none shadow-none md:px-6 px-3 space-y-5 my-6">
                <p className="text-muted-foreground text-sm">Loading...</p>
            </Card>
        );
    }

    if (!product) return <NotFound />;
    return (
        <Card className="border-none shadow-none">
            <CardHeader className="py-3">
                <ProBreadcrumb
                    categories={product.product_category}
                    product_name={product.product_name}
                />
            </CardHeader>
            <CardContent className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 pb-0">
                <div className="col-span-3">
                    <Card layout="horizontal" className="grid grid-cols-1 md:grid-cols-5 rounded-none">
                        <CardHeader className="md:col-span-2 p-3">
                            <ThumbnailGallery data={images} />
                            <SocialsShare data={socials} />
                        </CardHeader>
                        <CardContent className="md:col-span-3 p-3">
                            <Card className="border-none shadow-none flex flex-col h-full">
                                <CardContent className="space-y-3 p-0">
                                    <ProInfo data={product} />
                                    <ProVariantsSelector options={product.product_variations} />
                                    <ProQuantitySelector quantity={product.product_quantity} />
                                </CardContent>

                                <CardFooter className="p-0">
                                    <PurchaseActions data={product} />
                                </CardFooter>
                            </Card>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-2 md:col-span-2">
                    <ProDescriptionContent description={product?.product_description} />
                </div>
                <div className="lg:col-span-1 md:col-span-2">
                    <ProSpecifications specs={[
                        {
                            label: "Product Name:",
                            value: <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbLink
                                        href={`${product.product_slug}.${product.product_id}`}>
                                        {product.product_name}
                                    </BreadcrumbLink>
                                </BreadcrumbList>
                            </Breadcrumb>
                        },
                        {
                            label: "Categories:",
                            value: <Breadcrumb>
                                <BreadcrumbList>
                                    {
                                        product.product_category
                                            ?.filter((item: any) => item?.category_name)
                                            .map((item: any, index: number, arr: any[]) => (
                                                <React.Fragment key={item._id}>
                                                    <BreadcrumbLink
                                                        href={`/categories/${item.category_slug}-cat.${item._id}`}
                                                    >
                                                        {item.category_name}
                                                    </BreadcrumbLink>
                                                    {index < arr.length - 1 && <BreadcrumbSeparator />}
                                                </React.Fragment>
                                            )) || ""
                                    }
                                </BreadcrumbList>
                            </Breadcrumb>
                        },
                        {
                            label: "Shop Name:",
                            value: <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbLink
                                        href={`/shop/${product.product_shop._id}`}>
                                        {product.product_shop.name}
                                    </BreadcrumbLink>
                                </BreadcrumbList>
                            </Breadcrumb>
                        },
                    ]} />
                </div>
            </CardContent>
        </Card>
    );
}
