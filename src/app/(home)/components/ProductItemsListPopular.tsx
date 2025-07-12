'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";

//components
import {
    Button, CarouselItem, Card, CardHeader, CardContent, CardTitle, CardDescription, Carousel, CarouselContent, CarouselNext, CarouselPrevious
} from '@/components/ui';
import { NotFound } from "@/components/layout";
import ProductItem from "./ProductItem"

//datas
// import { productData } from "@/constants/data";

//stores
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getProductList } from "@/features/product/list/popular/store/dataSlice";
import { injectReducer } from "@/store";
import reducer from "@/features/product/list/popular/store";

//icons
import { ArrowRight } from "lucide-react"

//types
import { cn } from "@/lib/utils"
import { IProduct } from "@/interfaces/product";


interface ICarouselListProps {
    data?: IProduct[]
    itemsPerPage?: number;
    className?: string
}
injectReducer("popularProductList", reducer)

const CarouselList = ({ data, itemsPerPage = 12, className }: ICarouselListProps) => {

    return (
        <Carousel>
            <CarouselContent className="-ml-2">
                {data?.slice(0, itemsPerPage).map((item) => {
                    return (
                        <CarouselItem key={item._id} className={cn("pl-2 ", className)}>
                            <ProductItem item={item} />
                        </CarouselItem>
                    )

                })}
            </CarouselContent>
            <CarouselPrevious className=" top-1/2 -translate-y-1/2 md:-left-5 -left-3 " />
            <CarouselNext className=" top-1/2 -translate-y-1/2 md:-right-5 -right-3" />
        </Carousel >
    );
}

export default function ProductItemsListPopular() {
    const router = useRouter()
    const dispatch = useAppDispatch();
    const { list: products = [], loading } = useAppSelector((state) => state.popularProductList.data);

    useEffect(() => {
        dispatch(getProductList({ limit: 12, sort: "createdAt", page: 1 }) as any);
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


