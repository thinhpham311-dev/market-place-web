"use client";

import React, { useEffect } from "react";

//ui
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

// components
import CategoryButtons from "./components/CategoryButtons";
import { NotFound } from "@/components/layout";

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

    if (loading) {
        return (
            <Card className="border-none shadow-none md:px-6 px-3 space-y-5 my-6" >
                <p className="text-muted-foreground text-sm" > Loading...</p>
            </Card>
        );
    }

    if (!category) return <NotFound />;


    return (
        <Card className="border-0 shadow-none md:px-6 px-3 flex flex-row items-center space-x-3 sticky top-[57px] bg-white z-10" >
            <CardHeader className="p-0" >
                <CardTitle className="text-lg font-semibold inline-flex items-center space-x-1" >
                    <BiCategory />  <span>All Categories:</span >
                </CardTitle>
            </CardHeader>

            < CardContent className="p-0 flex items-center space-x-3 overflow-x-auto" >
                <CategoryButtons
                    data={category}
                    mainId={mainId}
                    subId={subId}
                />
            </CardContent>
        </Card>
    );
};

export default CatByCategoryId;
