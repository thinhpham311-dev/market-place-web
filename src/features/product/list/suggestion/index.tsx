'use client';

import { useEffect } from "react";
import {
    Card, CardHeader, CardContent, CardTitle, CardDescription
} from "@/components/ui";
import ProductGrid from "../components/ProductGrid";
// import LoadMoreTrigger from "@/features/common/infinite-scroll";

// redux
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getProductList } from "./store/dataSlice";
import { selectProSuggestionListByStoreKey } from "./store/selectors";
import { injectReducer } from "@/store";
import suggestionReducer from "./store";

//constants
import { PRO_SUGGESTION_LIST } from "./constants";

injectReducer(PRO_SUGGESTION_LIST, suggestionReducer);

export default function ProSuggestionList() {
    const dispatch = useAppDispatch();

    const {
        products = [],
        loading = false,
        // totalItems = 0,
        error = null
    } = useAppSelector(selectProSuggestionListByStoreKey(PRO_SUGGESTION_LIST));


    useEffect(() => {
        dispatch(getProductList({ page: 1, limit: 6, sort: 'ctime' }) as any);
    }, [dispatch]);


    return (
        <Card className="border-0 shadow-none  grid grid-cols-12">
            <CardHeader className="items-center col-span-12 space-x-3 mb-3">
                <CardTitle className="mb-3 capitalize text-center mx-auto">
                    Suggestion today
                </CardTitle>
                <CardDescription className="mb-3 capitalize text-center mx-auto">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </CardDescription>
            </CardHeader>

            <CardContent className="col-span-12">
                <ProductGrid
                    countLoadItems={12}
                    error={error}
                    data={products}
                    className=" grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"
                    isLoading={loading}
                />
                {/* <LoadMoreTrigger

                    products={products}
                /> */}
            </CardContent>
        </Card>
    );
}
