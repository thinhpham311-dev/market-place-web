'use client'

import { useRouter } from "next/navigation";

//components
import { Button } from "@/components/ui/atoms"
import {
    CarouselItem, Card, CardHeader, CardContent, CardTitle, CardDescription, Carousel, CarouselContent, CarouselNext, CarouselPrevious
} from '@/components/ui/molecules';
import ProductItem from "./ProductItem"

//datas
import { productData } from "@/constants/data";

//icons
import { ArrowRight } from "lucide-react"

//types
import { cn } from "@/lib/utils"
import { NotFound } from "@/components/ui/organisms";
import { IProduct } from "@/types/product";


interface ICarouselListProps {
    data?: IProduct[]
    itemsPerPage?: number;
    className?: string
}

const CarouselList = ({ data, itemsPerPage = 12, className }: ICarouselListProps) => {

    return (
        <Carousel>
            <CarouselContent className="-ml-2">
                {data?.slice(0, itemsPerPage).map((item) => {
                    if (item.quantity > 0) {
                        return (
                            <CarouselItem key={item._id} className={cn("pl-2 ", className)}>
                                <ProductItem item={item} />
                            </CarouselItem>
                        )
                    }
                })}
            </CarouselContent>
            <CarouselPrevious className=" top-1/2 -translate-y-1/2 md:-left-5 -left-3 " />
            <CarouselNext className=" top-1/2 -translate-y-1/2 md:-right-5 -right-3" />
        </Carousel >
    );
}

export default function ProductItemsListPopular() {
    const router = useRouter()

    return (
        <Card className="border-0 shadow-none	 md:px-6 px-3 w-full">
            <CardHeader className="flex-row  items-center px-0 space-x-3 mb-3" >
                <div className="p-0 flex-1">
                    <CardTitle className="mb-3 capitalize">Popular Products</CardTitle>
                    <CardDescription className="md:line-clamp-2 line-clamp-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquet lobortis erat, sed varius arcu iaculis id</CardDescription>
                </div>

                <Button variant="outline" size="icon" className="float-end" onClick={() => router.push("/categories/1")}>
                    <ArrowRight className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="px-0">
                {productData && productData.length > 0 ? <CarouselList data={productData} className=" lg:basis-1/6  md:basis-1/3 basis-1/2" /> : <NotFound />}
            </CardContent>
        </Card>
    );
}


