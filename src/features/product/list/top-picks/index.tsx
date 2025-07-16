'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";

//components
import {
    Button, Card, CardHeader, CardContent, CardTitle, CardDescription
} from '@/components/ui';
import ProductRow from "../components/ProductCarousel"

//datas
// import { productData } from "@/constants/data";

//stores
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getProductList } from "./store/dataSlice";
import reducer from "./store";
import { injectReducer } from "@/store";

//icons
import { ArrowRight } from "lucide-react"


injectReducer("proTopPicksList", reducer)

export default function ProTopPicksList() {
    const router = useRouter()
    const dispatch = useAppDispatch();
    const { list: products = [], loading } = useAppSelector((state) => state.proTopPicksList.data);

    useEffect(() => {
        dispatch(getProductList({ limit: 12, sort: "ctime", page: 1 }) as any);
    }, [dispatch]);

    return (
        <Card className="border-0 shadow-non grid grid-cols-12">
            <CardHeader className="col-span-12 flex-row  items-center mb-3" >
                <div className="p-0 flex-1">
                    <CardTitle className="mb-3 capitalize">Top Picks from Shop</CardTitle>
                    <CardDescription className="md:line-clamp-2 line-clamp-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquet lobortis erat, sed varius arcu iaculis id</CardDescription>
                </div>

                <Button variant="outline" size="icon" className="float-end" onClick={() => router.push("/categories/1")}>
                    <ArrowRight className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="col-span-12">
                <ProductRow data={products} isLoading={loading} className="lg:basis-1/6 md:basis-1/4 basis-1/3" />
            </CardContent>
        </Card>
    );
}


