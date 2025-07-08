'use client'
import * as React from "react"

// components
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/molecules"
import ProductItem from "./ProductItem"
import { Button } from "@/components/ui/atoms"
import { NotFound } from "@/components/ui/organisms"

// icons
import { ArrowRight } from "lucide-react"

// // data
// import { productData } from "@/constants/data"

//stores
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getProductList } from "@/store/product/list/all/dataSlice";
import { injectReducer } from "@/store";
import reducer from "@/store/product/list/all";

//types 
import { IProduct } from "@/interfaces/product"


//libs
import { cn } from "@/lib/utils"

injectReducer("recommendedForYouList", reducer)


interface ICarouselListProps {
    data: Array<IProduct>,
    itemsPerPage?: number;
    className?: string
}

const CarouselList = ({ data, itemsPerPage = 12, className }: ICarouselListProps) => {

    return (
        <Carousel>
            <CarouselContent className="-ml-2">
                {data?.slice(0, itemsPerPage).map((item, index) => {
                    // if (item.quantity > 0) {
                    return (
                        <CarouselItem key={index} className={cn("pl-2 ", className)}>
                            <ProductItem item={item} />
                        </CarouselItem>
                    )
                    // }
                })}
            </CarouselContent>
            <CarouselPrevious className=" top-1/2 -translate-y-1/2 md:-left-5 -left-3 " />
            <CarouselNext className=" top-1/2 -translate-y-1/2 md:-right-5 -right-3" />
        </Carousel >
    );
}

export default function ProductItemsListTopPicksFromShop() {
    const dispatch = useAppDispatch();
    const { list: products = [], loading } = useAppSelector((state) => state.recommendedForYouList.data);

    React.useEffect(() => {
        dispatch(getProductList({ limit: 12, sort: "createdAt", page: 1 }) as any);
    }, [dispatch]);

    return (
        <Card className="border-0 p-0 shadow-none">
            <CardHeader className="flex-row items-center px-0 space-x-3 mb-3">
                <div className="p-0 flex-1">
                    <CardTitle className="mb-3 capitalize">Recommended For You</CardTitle>
                    <CardDescription className="md:line-clamp-2 line-clamp-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquet lobortis erat, sed varius arcu iaculis id</CardDescription>
                </div>
                <Button variant="outline" size="icon" className="float-end">
                    <ArrowRight className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="p-0">
                {loading ? (
                    <p className="text-muted-foreground text-sm">Loading...</p>
                ) : products.length > 0 ? (
                    <CarouselList data={products} className="lg:basis-1/6 md:basis-1/4 basis-1/3" />
                ) : (
                    <NotFound />
                )}
            </CardContent>
        </Card>
    );
}
