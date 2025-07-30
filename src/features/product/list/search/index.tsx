'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";

//components
import {
    Button, Card, CardHeader, CardContent, CardTitle, CardDescription
} from '@/components/ui';
import ProductGrid from "../components/ProductCarousel";
import Pagination from "@/features/common/pagination";
//datas
// import { productData } from "@/constants/data";

//stores
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getProductList } from "./store/dataSlice";
import { selectPaginationByStoreKey } from "@/features/common/pagination/store/selectors";
import { selectProSearchListByStoreKey } from "./store/selectors";
import reducer from "./store";
import { injectReducer } from "@/store";

//icons
import { ArrowRight } from "lucide-react"

///constants
import { PRO_SEARCH_LIST } from "./constants";

injectReducer(PRO_SEARCH_LIST, reducer)

export default function ProSearchList() {
    const router = useRouter()
    const dispatch = useAppDispatch();

    const {
        currentPage: pageCurrentValue,
        limit: limitCurrentValue
    } = useAppSelector(
        selectPaginationByStoreKey(PRO_SEARCH_LIST)
    );

    const {
        products = [],
        loading,
        totalItems = 0,
        error = null
    } = useAppSelector(
        selectProSearchListByStoreKey(PRO_SEARCH_LIST)
    );

    useEffect(() => {
        const promise = dispatch(getProductList({
            limit: limitCurrentValue,
            sort: "ctime",
            page: pageCurrentValue
        }) as any);
        return () => {
            promise.abort()
        }

    }, [dispatch, pageCurrentValue, limitCurrentValue]);

    return (
        <Card className="border-0 shadow-non grid grid-cols-12">
            <CardHeader className="col-span-12 flex-row  items-center mb-3" >
                <div className="p-0 flex-1">
                    <CardTitle className="mb-3 capitalize">Popular Products</CardTitle>
                    <CardDescription className="md:line-clamp-2 line-clamp-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquet lobortis erat, sed varius arcu iaculis id</CardDescription>
                </div>
                <Button variant="outline" size="icon" className="float-end" onClick={() => router.push("/categories/1")}>
                    <ArrowRight className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="col-span-12">
                <ProductGrid
                    countLoadItems={12}
                    error={error}
                    data={products}
                    className="lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-3"
                    isLoading={loading}
                />
                <Pagination
                    storeKey={PRO_SEARCH_LIST}
                    isShowDot
                    isShowNav
                    limit={15}
                    total={totalItems}
                />
            </CardContent>
        </Card>
    );
}


