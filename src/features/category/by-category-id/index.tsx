"use client"
import React from "react";

// ui
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

// components
import CategoryButtons from "../components/CategoryButtons";

// store
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { injectReducer } from "@/store";
import { getCatListById } from "@/features/category/by-category-id/store/dataSlice";
import { selectCatByCategoryIdByStoreKey } from "./store/selectors";
import reducer from "@/features/category/by-category-id/store";

// icons
import { BiCategory } from "react-icons/bi";

//constants
import { CAT_LIST_BY_ID } from "./constants";

injectReducer(CAT_LIST_BY_ID, reducer);

const CatByCategoryId = ({ ids }: { ids: string[] }) => {
    const dispatch = useAppDispatch();
    const {
        categories = [],
        loading = false,
        error = null
    } = useAppSelector(selectCatByCategoryIdByStoreKey(CAT_LIST_BY_ID));

    const validIds = React.useMemo(() => ids.filter(Boolean), [ids]);


    React.useEffect(() => {
        if (!validIds || validIds.length === 0) return;

        const promise = dispatch(getCatListById({
            category_id: validIds[0],
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
            <CardContent className="p-0 lg:col-span-10 md:col-span-12 col-span-12">
                <CategoryButtons
                    isLoading={loading}
                    data={categories}
                    ids={validIds}
                    error={error}
                />
            </CardContent>
        </Card>
    );
};

export default CatByCategoryId;
