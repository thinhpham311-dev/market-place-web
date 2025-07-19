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
            <CardHeader className="py-3">breadcrumb</CardHeader>

            <CardContent className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                {/* ---------- GRID TRÊN: HÌNH ẢNH + THÔNG TIN ---------- */}
                <Card layout="horizontal" className="lg:col-span-3 grid grid-cols-1 md:grid-cols-5 rounded-none">
                    {/* Cột hình ảnh (2/5) */}
                    <CardHeader className="md:col-span-2 p-3">
                        <ThumbnailGallery data={images} />
                        <SocialsShare data={socials} />
                    </CardHeader>

                    {/* Cột thông tin (3/5) */}
                    <CardContent className="md:col-span-3 p-3">
                        <Card className="border-none shadow-none flex flex-col h-full">
                            <CardContent className="space-y-3 p-0">
                                <ProInfo data={product} />
                                <ProVariantsSelector options={[]} />
                                <ProQuantitySelector quantity={30} />
                            </CardContent>

                            <CardFooter className="p-0">
                                <PurchaseActions data={product} />
                            </CardFooter>
                        </Card>
                    </CardContent>
                </Card>

                {/* ---------- GRID DƯỚI: MÔ TẢ + THÔNG SỐ ---------- */}
                <div className="lg:col-span-2 md:col-span-2">
                    <ProDescriptionContent />
                </div>
                <div className="lg:col-span-1 md:col-span-2">
                    <ProSpecifications specs={[]} />
                </div>
            </CardContent>
        </Card>
    );
}
