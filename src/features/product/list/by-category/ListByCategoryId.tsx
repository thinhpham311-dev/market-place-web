'use client'
import { useState, useEffect } from "react"

//components
import { Card, CardContent } from "@/components/ui"
import ProductGrid from "../components/ProductGrid";
import FilterSidebar from "@/features/common/FilterSidebar";
import SortBar from "@/features/common/SortBar";

//datas
// import { productData } from "@/constants/data"

//stores
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { injectReducer } from "@/store";
import { getProductListByCategories } from "@/features/product/list/by-category/store/dataSlice";
import reducer from "@/features/product/list/by-category/store";

//libs
import { IFilter } from "@/interfaces/filter";

injectReducer("proListByCategoryId", reducer)

export default function ProductitemsListByCategoryId({ id }: { id: string }) {
    const dispatch = useAppDispatch();
    const [filters, setFilters] = useState<IFilter>({});

    const {
        list: products = [],
        loading = false,
    } = useAppSelector((state) => state.proListByCategoryId.data || {});

    useEffect(() => {
        if (id) {
            dispatch(getProductListByCategories({
                limit: 12,
                sort: "createdAt",
                page: 1,
                ids: id,
            }) as any);
        }
    }, [dispatch, id]);

    return (
        <Card className="border-0 md:px-6 px-3">
            <CardContent className="px-0 grid grid-cols-12 gap-3">
                <div className="col-span-2 space-y-3">
                    <FilterSidebar />
                </div>
                <div className="col-span-10">
                    <SortBar
                        sortBy={filters.sortBy}
                        onChange={(sort) => setFilters((prev) => ({ ...prev, sortBy: sort }))} />
                    <ProductGrid
                        data={products}
                        className="lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-3"
                        isLoading={loading}
                    />
                </div>
            </CardContent>
        </Card>
    );
}


