'use client';

import { useEffect, useCallback } from "react";
import {
    Card, CardHeader, CardContent, CardTitle, CardDescription
} from "@/components/ui";
import ProductGrid from "../components/ProductGrid";
import LoadMoreTrigger from "@/features/common/infinite-scroll";

// redux
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getProductList } from "./store/dataSlice";
import { injectReducer } from "@/store";
import suggestionReducer from "./store";
import {
    nextPage,
    setTotalCount,
} from "@/features/common/infinite-scroll/store/stateSlice";

injectReducer("proSuggestionList", suggestionReducer);

export default function ProSuggestionList() {
    const dispatch = useAppDispatch();

    const { page, limit, totalItems } = useAppSelector((state) => state.infiniteScroll.state);

    const { list: products = [], loading, total } = useAppSelector(
        (state) => state.proSuggestionList.data
    );
    const hasMore = products.length < totalItems;

    useEffect(() => {
        dispatch(getProductList({ page, limit, sort: 'ctime' }) as any);
    }, [dispatch, page, limit]);

    useEffect(() => {
        if (typeof total === 'number') {
            dispatch(setTotalCount(total));
        }
    }, [dispatch, total]);

    const handleTriggerLoadMore = useCallback(() => {
        if (!loading && hasMore) {
            dispatch(nextPage());
        }
    }, [dispatch, loading, hasMore]);

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
                    data={products}
                    className=" grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"
                    isLoading={loading}
                />
                {hasMore && (
                    <LoadMoreTrigger
                        hasMore={hasMore}
                        isLoading={loading}
                        onTrigger={handleTriggerLoadMore}
                    />
                )}
            </CardContent>
        </Card>
    );
}
