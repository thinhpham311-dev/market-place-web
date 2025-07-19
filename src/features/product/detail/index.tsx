"use client";
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui";
import { images, socials } from "./data";
import ThumbnailGallery from "./components/ThumbnailGallery";
import ProQuantitySelector from "./components/ProQuantitySelector";
import ProVariantsSelector from "./components/ProVariantsSelector";
import ProDescriptionContent from "./components/ProDescriptionContent";
import ProSpecifications from "./components/ProSpecifications";
import SocialsShare from "./components/SocialsShare";
import ProInfo from "./components/ProInfo"
import { NotFound } from "@/components/layout"
import { IProduct } from "../types";
import { injectReducer } from "@/store";
import { getProductDetail } from "./store/dataSlice"
import reducer from "./store";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import PurchaseActions from "./components/PurchaseActions";

interface IProDetailProps {
    id: string
}

injectReducer("detail", reducer)

export default function ProDetail({ id }: IProDetailProps) {

    const dispatch = useAppDispatch();
    const { detail: product = null, loading } = useAppSelector((state) => state.detail.data);

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
                breadcrumb
            </CardHeader>
            <CardContent className="grid lg:grid-cols-3 md:grid-cols-2  grid-cols-1  gap-6">
                {/* GRID CHÍNH */}
                <Card layout="horizontal" className="grid grid-cols-5 col-span-3 grid-flow-col grid-rows-3 content-between gap-10">
                    <CardHeader className="col-span-2 p-3 row-span-3">
                        {/* Cột Hình ảnh */}
                        <div className="lg:col-span-2 md:col-span-1 space-y-3">
                            <ThumbnailGallery data={images} />
                            <SocialsShare data={socials} />
                        </div>
                    </CardHeader>
                    <CardContent className="col-span-3 p-3 row-span-2">
                        {/* Cột Thông tin sản phẩm */}
                        <div className="lg:col-span-3 md:col-span-1 space-y-4">
                            <ProInfo data={product} />
                            <ProVariantsSelector options={[]} />
                            <ProQuantitySelector quantity={30} />
                        </div>
                    </CardContent>
                    <CardFooter className="col-span-3 p-3">
                        <PurchaseActions data={product} />
                    </CardFooter>
                </Card>

                <div className="lg:col-span-2 md:col-span-1">
                    {/* Mô tả chi tiết */}
                    <ProDescriptionContent />
                </div>
                <div className="col-span-1">
                    {/* Thông số kỹ thuật */}
                    <ProSpecifications specs={[]} />
                </div>

            </CardContent>
        </Card >
    );
}
