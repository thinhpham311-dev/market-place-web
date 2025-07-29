'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";

//components
import {
    Button, Card, CardHeader, CardContent, CardTitle, CardDescription
} from '@/components/ui';
import ProductGrid from "../components/ProductCarousel";
//datas
// import { productData } from "@/constants/data";

//stores
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getProductList } from "./store/dataSlice";
import reducer from "./store";
import { injectReducer } from "@/store";

//icons
import { ArrowRight } from "lucide-react"


injectReducer("proSearchList", reducer)

export default function ProSearchList() {
    const router = useRouter()
    const dispatch = useAppDispatch();
    const { list: products = [], loading, error = null } = useAppSelector((state) => state.proSearchList.data);

    useEffect(() => {
        const promise = dispatch(getProductList({ limit: 12, sort: "createdAt", page: 1 }) as any);
        return () => {
            promise.abort()
        }

    }, [dispatch]);

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
            </CardContent>
        </Card>
    );
}


