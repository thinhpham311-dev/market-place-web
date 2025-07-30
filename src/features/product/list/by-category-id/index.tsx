"use client";

import React from "react";

// components
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui";
import ProductGrid from "../components/ProductGrid";
import { Pagination, SortBy, Filter } from "@/features/common";

// hooks
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

// stores
import reducer from "./store";
import { injectReducer } from "@/store";
import { selectPaginationByStoreKey } from "@/features/common/pagination/store/selectors";
import { selectSortByStoreKey } from "@/features/common/sort/store/selectors";
import { selectFilterStoreKey } from "@/features/common/filter/store/selectors";
import { selectProByCategoryIdByStoreKey } from "@/features/product/list/by-category-id/store/selectors";
import { getProductListByCategories } from "./store/dataSlice";
import { resetPagination } from "@/features/common/pagination/store/stateSlice";

// constants
import { SORTBY_OPTIONS, FILTER_OPTIONS } from "./constants";
import { PRO_LIST_BY_CATEGORYID } from "./constants";

injectReducer(PRO_LIST_BY_CATEGORYID, reducer);

const ProListByCategoryId = ({ lastId }: { lastId?: string }) => {
    const dispatch = useAppDispatch();

    const {
        currentPage: pageCurrentValue,
        limit: limitCurrentValue
    } = useAppSelector(
        selectPaginationByStoreKey(PRO_LIST_BY_CATEGORYID)
    );

    const {
        sortBy: { value: sortCurrentValue }
    } = useAppSelector(
        selectSortByStoreKey(PRO_LIST_BY_CATEGORYID)
    );

    const {
        filter: filterCurrentValue
    } = useAppSelector(
        selectFilterStoreKey(PRO_LIST_BY_CATEGORYID)
    );

    const {
        products = [],
        loading = false,
        totalItems = 0,
        error = null
    } = useAppSelector(
        selectProByCategoryIdByStoreKey(PRO_LIST_BY_CATEGORYID)
    );
    React.useEffect(() => {
        dispatch(resetPagination());
    }, [dispatch, lastId]);

    React.useEffect(() => {
        const promise = dispatch(
            getProductListByCategories({
                limit: limitCurrentValue,
                sort: sortCurrentValue,
                page: pageCurrentValue,
                ids: lastId,
                filter: filterCurrentValue,
            }) as any
        );

        return () => {
            promise.abort();
        };
    }, [
        dispatch,
        lastId,
        filterCurrentValue,
        sortCurrentValue,
        pageCurrentValue,
        limitCurrentValue
    ]);

    return (
        <Card className="border-0 shadow-none md:px-6 px-3">
            <CardContent className="px-0 grid grid-cols-12 gap-3">
                <div className="col-span-2 space-y-3">
                    <Filter
                        storeKey={PRO_LIST_BY_CATEGORYID}
                        data={FILTER_OPTIONS} />
                </div>

                <div className="col-span-10 flex flex-col space-y-3">
                    <Card>
                        <CardHeader className="p-3">
                            <div className="flex gap-4 justify-between items-center">
                                <div className="flex-1">
                                    <SortBy
                                        storeKey={PRO_LIST_BY_CATEGORYID}
                                        data={SORTBY_OPTIONS} />
                                </div>
                                <div>
                                    <Pagination
                                        storeKey={PRO_LIST_BY_CATEGORYID}
                                        isShowNav
                                        limit={15}
                                        total={totalItems}
                                    />
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="p-3">
                            <ProductGrid
                                error={error}
                                countLoadItems={15}
                                data={products}
                                className="lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-3"
                                isLoading={loading}
                            />
                        </CardContent>

                        <CardFooter className="p-3 justify-center">
                            <Pagination
                                storeKey={PRO_LIST_BY_CATEGORYID}
                                isShowDot
                                isShowNav
                                limit={15}
                                total={totalItems}
                            />
                        </CardFooter>
                    </Card>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProListByCategoryId;
