"use client"
import React from "react";

// ui
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

// components
import CategoryCarousel from "./components/CategoryCarousel";

// store
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { injectReducer } from "@/store";
import { getCatListById } from "./store/dataSlice";
import reducer from "./store";

// icons
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
        if (!validIds || validIds.length === 0) return;

        const promise = dispatch(getCatListById({
            _id: validIds[0],
        }) as any);

        return () => {
            promise.abort();
        };
    }, [dispatch, validIds]);



    return (
        <Card className="md:mx-6 mx-3 grid grid-cols-12 items-center sticky left-0 top-[60px] bg-white z-10">
            <CardHeader className="py-2 px-3 lg:col-span-2 md:col-span-12 col-span-12">
                <CardTitle className="text-lg font-semibold inline-flex items-center space-x-1">
                    <BiCategory />
                    <span>All Categories:</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-3 lg:col-span-10 md:col-span-12 col-span-12">
                <CategoryCarousel
                    isLoading={loading}
                    data={categories}
                    ids={validIds}
                    className="lg:basis-1/8 md:basis-1/6 basis-1/2"
                />
            </CardContent>
        </Card>
    );
};

export default CatByCategoryId;
