'use client'
//components
import { GridListWithLoading } from "@/components/ui/organisms"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/molecules';

//datas
import { productData } from "@/constants/data"

export default function Page() {
    return (
        <div className="space-y-10">
            <Card className="border-0 md:px-6 px-3">
                <CardHeader className=" px-0 space-x-3 mb-3" >
                    <CardTitle className=" capitalize text-center mx-auto">Categories</CardTitle>
                    <CardDescription className="capitalize text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras auctor sollicitudin nulla ac ultrices.</CardDescription>
                </CardHeader>
                <CardContent className="px-0">
                    <GridListWithLoading data={productData} itemsPerPage={12} className="lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-3" />
                </CardContent>
            </Card >
        </div>
    );
}


