'use client';

import { useEffect, useCallback } from "react";
import {
    Card, CardHeader, CardContent, CardTitle, CardDescription
} from "@/components/ui";
import ProductGrid from "../components/ProductGrid";
import LoadMoreTrigger from "@/features/common/LoadMoreTrigger";

// redux
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getProductList } from "./store/dataSlice";
import { injectReducer } from "@/store";
import suggestionReducer from "./store";
import infiniteScrollReducer, {
    nextPage,
    setTotalCount,
} from "@/features/common/LoadMoreTrigger/store/stateSlice";

injectReducer("proSuggestionList", suggestionReducer);
injectReducer("infiniteScroll", infiniteScrollReducer);

export default function ProSuggestionList() {
    const dispatch = useAppDispatch();

    const { page, limit, totalItems } = useAppSelector((state) => state.infiniteScroll);
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
        <Card className="border-0 shadow-none md:px-6 px-3">
            <CardHeader className="items-center px-0 space-x-3 mb-3">
                <CardTitle className="mb-3 capitalize text-center mx-auto">
                    Suggestion today
                </CardTitle>
                <CardDescription className="mb-3 capitalize text-center mx-auto">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </CardDescription>
            </CardHeader>

            <CardContent className="px-0">
                <ProductGrid
                    data={products}
                    className="lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-3"
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
