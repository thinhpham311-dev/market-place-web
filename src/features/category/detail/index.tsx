"use client";

import React from "react";

//ui
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

// components
import CategoryCarousel from "./components/CategoryCarousel";

// store
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { injectReducer } from "@/store";
import { getCatListById } from "./store/dataSlice";
import reducer from "./store";

// types
import { ICategory } from "@/features/category/types";

//icons
import { BiCategory } from "react-icons/bi";


injectReducer("catListById", reducer);

const CatByCategoryId = ({ ids }: { ids: string[] }) => {
    const dispatch = useAppDispatch();

    const {
        data: categories = [],
        loading = false,
    } = useAppSelector((state) => state.catListById.data || {});

    const validIds = React.useMemo(() => ids.filter(Boolean), [ids]);

    React.useEffect(() => {
        validIds.forEach((id, index) => {
            dispatch(getCatListById({ _id: id, level: index } as ICategory) as any);
        });
    }, [dispatch, validIds]);
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
                    data={categories}
                    ids={validIds}
                    className="lg:basis-1/8 md:basis-1/6 basis-1/4"
                />
            </CardContent>

        </Card>
    );

};

export default CatByCategoryId;
