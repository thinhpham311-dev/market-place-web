'use client'
import React from "react";
import { useRouter } from "next/navigation";

//components
import {
    Button, Card, CardHeader, CardContent, CardTitle, CardDescription
} from '@/components/ui';
import SpuCarousel from "@/features/product/components/ProCarousel"

//hooks
import { useFetchData } from "@/features/product/list/bundle-deal/hooks";

//icons
import { ArrowRight } from "lucide-react"

export default function ProBundleDealList() {
    const router = useRouter()
    const { products, loading, error } = useFetchData();

    return (
        <Card className="border-none shadow-none grid grid-cols-12">
            <CardHeader className="col-span-12 flex-row  items-center mb-3 " >
                <div className="flex-1">
                    <CardTitle className="mb-3 capitalize">Bundle Deals</CardTitle>
                    <CardDescription className="md:line-clamp-2 line-clamp-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquet lobortis erat, sed varius arcu iaculis id</CardDescription>
                </div>
                <Button variant="outline" size="icon" className="float-end" onClick={() => router.push("/categories/1")}>
                    <ArrowRight className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="col-span-12">
                <SpuCarousel
                    countLoadItems={6}
                    error={error}
                    data={products}
                    isLoading={loading}
                    className="lg:basis-1/6 md:basis-1/4 basis-1/3"
                />
            </CardContent>
        </Card>
    );
}


