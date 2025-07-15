"use client";

import React, { useEffect } from "react";

//ui
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

// components
import CategoryCarousel from "./components/CategoryCarousel";

// store
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { injectReducer } from "@/store";
import { getCategoryDetail } from "@/store/category/detail/dataSlice";
import reducer from "@/store/category/detail";

// types
import { ICategory } from "@/features/category/types";

//icons
import { BiCategory } from "react-icons/bi";


injectReducer("catListById", reducer);

const CatByCategoryId = ({
    mainId,
    subId,
}: {
    mainId: string;
    subId?: string;
}) => {
    const dispatch = useAppDispatch();

    const {
        detail: category = null,
        loading = false,
    } = useAppSelector((state) => state.catListById.data || {});

    useEffect(() => {
        if (mainId) {
            dispatch(getCategoryDetail({ _id: mainId } as ICategory) as any);
        }
    }, [dispatch, mainId]);


    return (
        <Card className=" border-none shadow-none md:px-6 px-3 grid grid-cols-12 items-center  sticky top-[57px] bg-white z-10" >
            <CardHeader className="p-0 md:col-span-2 col-span-12" >
                <CardTitle className="text-lg font-semibold inline-flex items-center space-x-1" >
                    <BiCategory />  <span>All Categories:</span >
                </CardTitle>
            </CardHeader>

            < CardContent className="p-0 md:col-span-10 col-span-12" >
                <CategoryCarousel
                    isLoading={loading}
                    data={category}
                    mainId={mainId}
                    subId={subId}
                    className="lg:basis-1/9 md:basis-1/6 basis-1/4"
                />
            </CardContent>
        </Card>
    );
};

export default CatByCategoryId;
