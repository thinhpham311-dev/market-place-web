'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";

//components
import {
    Card, CardHeader, CardContent, CardTitle, CardDescription
} from '@/components/ui/card';
import {
    Button
} from '@/components/ui/button';
import ProCarousel from "@/features/product/components/ProCarousel"

//datas
// import { productData } from "@/constants/data";

//stores
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getProductList } from "./store/dataSlice";
import { selectProRecommendedListByStoreKey } from "./store/selectors"
import reducer from "./store";
import { injectReducer } from "@/store";

import { PRO_RECOMMENDDED_LIST } from "./constants";

//icons
import { ArrowRight } from "lucide-react"

injectReducer(PRO_RECOMMENDDED_LIST, reducer)

export default function ProRecommendedList() {
    const router = useRouter()
    const dispatch = useAppDispatch();
    const { products = [], loading, error = null } = useAppSelector(
        selectProRecommendedListByStoreKey(PRO_RECOMMENDDED_LIST)
    );

    useEffect(() => {
        const promise = dispatch(getProductList({ limit: 12, sort: "ctime", page: 1 }) as any);
        return () => {
            promise.abort()
        }
    }, [dispatch]);

    return (
        <Card className="border-none shadow-none grid grid-cols-12">
            <CardHeader className="col-span-12 flex-row  items-center mb-3" >
                <div className="p-0 flex-1">
                    <CardTitle className="mb-3 capitalize">Recommended For You</CardTitle>
                    <CardDescription className="md:line-clamp-2 line-clamp-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquet lobortis erat, sed varius arcu iaculis id</CardDescription>
                </div>

                <Button variant="outline" size="icon" className="float-end" onClick={() => router.push("/categories/1")}>
                    <ArrowRight className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="col-span-12 ">
                <ProCarousel
                    countLoadItems={15}
                    data={products}
                    isLoading={loading}
                    error={error}
                    className="lg:basis-1/6 md:basis-1/4 basis-1/3" />
            </CardContent>
        </Card>
    );
}


