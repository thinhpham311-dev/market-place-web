"use client"

import React from "react";

//components
import { Card, CardContent } from "@/components/ui";
import ProductGrid from "../components/ProductGrid";
import ProductSort from "../components/ProductSort";
import { FilterSidebar, PaginationCustom } from "@/features/common";

//stores
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { injectReducer } from "@/store";
import { getProductListByCategories } from "./store/dataSlice";
import reducer from "./store";

injectReducer("proListByCategoryId", reducer);

const ProListByCategoryId = ({ ids }: { ids: string[] }) => {
    const dispatch = useAppDispatch();
    const filters = useAppSelector((state) => state.filter.state);
    const { sortBy } = useAppSelector((state => state.sortBy.state));
    const { list: products = [], loading = false } = useAppSelector((state) => state.proListByCategoryId.data || {});

    React.useEffect(() => {
        if (!ids || ids.length === 0) return;

        const lastId = ids.filter(id => id !== undefined).at(-1);

        const promise = dispatch(
            getProductListByCategories({
                limit: 15,
                sort: sortBy,
                page: 1,
                ids: lastId,
                filter: filters || {},
            }) as any
        );

        return () => {
            // ✅ Cleanup: cancel request khi validIds thay đổi hoặc component unmount
            promise.abort();
        };
    }, [dispatch, ids, filters, sortBy]);

    return (
        <Card className="border-0 shadow-none md:px-6 px-3">
            <CardContent className="px-0 grid grid-cols-12 gap-3">
                <div className="col-span-2 space-y-3">
                    <FilterSidebar />
                </div>
                <div className="col-span-10 flex flex-col space-y-3">
                    <ProductSort />
                    <ProductGrid
                        data={products}
                        className="lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-3"
                        isLoading={loading}
                    />
                    <PaginationCustom />
                </div>
            </CardContent>
        </Card>
    );
};

export default ProListByCategoryId;
