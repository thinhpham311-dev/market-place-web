'use client'
import { useState, useEffect } from "react"

//components
import { Button, Card, CardContent } from "@/components/ui"
import ProductItem from "./ProductItem";
import { NotFound, FilterSidebar, SortBar } from "@/components/layout";

//datas
// import { productData } from "@/constants/data"

//stores
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { injectReducer } from "@/store";
import { getProductListByCategories } from "@/features/product/list/by-category/store/dataSlice";
import reducer from "@/features/product/list/by-category/store";

//types
import { IProduct } from "@/interfaces/product";

//libs
import { useUniqueId } from "@/lib/hooks";
import { cn } from "@/lib/utils"
import { IFilter } from "@/interfaces/filter";


interface IGridListProps {
    data: Array<IProduct>;
    totalData: number;
    itemsPerPage?: number;
    className?: string;
    isLoading: boolean
}

injectReducer("productListByCategories", reducer)

const GridListWithLoading = ({ data, itemsPerPage = 12, totalData, className, isLoading }: IGridListProps) => {
    const id = useUniqueId()
    const [visibleItems, setVisibleItems] = useState(itemsPerPage);

    const handleLoadMore = () => {
        setVisibleItems((prev) => prev + itemsPerPage); // Tăng số lượng mục hiển thị
    };

    if (isLoading) return <LoadingPlaceholder />;

    if (!data || data.length === 0) return <NotFound />;


    return (
        <div className={cn("grid w-full", className)}>
            {data?.slice(0, visibleItems).map((item, index) => {
                // if (item.quantity > 0) {
                return (
                    <ProductItem key={`${id}-${index}`} item={item} />
                )
                // }
            })}
            {visibleItems < totalData && (
                <div className="lg:col-span-6 md:col-span-3 col-span-2 my-10">
                    <Button variant="outline" className="block mx-auto text-xs" onClick={handleLoadMore}>
                        See More...
                    </Button>
                </div>
            )}
        </div>
    );
};

const LoadingPlaceholder = () => (
    <CardContent className="px-0">
        <div className="text-center">Loading...</div>
    </CardContent>
);


export default function ProductitemsListByCategoryId({ id }: { id: string }) {
    const dispatch = useAppDispatch();
    const [filters, setFilters] = useState<IFilter>({});

    const {
        list: products = [],
        loading = false,
    } = useAppSelector((state) => state.productListByCategories.data || {});

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
                    <FilterSidebar filters={filters} onChange={setFilters} />
                </div>
                <div className="col-span-10">
                    <SortBar
                        sortBy={filters.sortBy}
                        onChange={(sort) => setFilters((prev) => ({ ...prev, sortBy: sort }))} />
                    <GridListWithLoading
                        data={products}
                        totalData={products.length}
                        itemsPerPage={12}
                        className="lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-3"
                        isLoading={loading}
                    />
                </div>
            </CardContent>
        </Card>
    );
}


