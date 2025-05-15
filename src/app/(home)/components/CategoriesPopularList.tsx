"use client"
import * as React from "react"
import { memo } from "react"
import { useRouter } from "next/navigation";


//components
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Carousel, CarouselContent, CarouselNext, CarouselPrevious, CarouselItem } from "@/components/ui/molecules"
import { Button } from "@/components/ui/atoms"
import CategoryItem from "./CategoryItem";
import { NotFound } from "@/components/ui/organisms";


//icons
import { ArrowRight } from "lucide-react"
import { ICategory } from "@/types/category";
import { cn } from "@/lib/utils"

//datas
import { categoriesData } from "@/constants/data/categories"

interface ICarouselListProps {
    data?: ICategory[];
    itemsPerPage?: number;
    className?: string
}

const CarouselList = ({ data, itemsPerPage = 12, className }: ICarouselListProps) => {

    return (
        <Carousel>
            <CarouselContent className="-ml-2">
                {data?.slice(0, itemsPerPage).map((item) => {
                    return (
                        <CarouselItem key={item._id} className={cn("pl-2 ", className)}>
                            <CategoryItem item={item} />
                        </CarouselItem>
                    )

                })}
            </CarouselContent>
            <CarouselPrevious className=" top-1/2 -translate-y-1/2 md:-left-5 -left-3 " />
            <CarouselNext className=" top-1/2 -translate-y-1/2 md:-right-5 -right-3" />
        </Carousel >
    );
}

const CategoriesPopularList = () => {
    const router = useRouter()
    return (
        <Card className="border-0 shadow-none md:px-6 px-3 w-full">
            <CardHeader className="flex-row  items-center px-0 space-x-3 mb-3" >
                <div className="p-0 flex-1">
                    <CardTitle className="mb-3 capitalize">Categories</CardTitle>
                    <CardDescription className="md:line-clamp-2 line-clamp-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquet lobortis erat, sed varius arcu iaculis id</CardDescription>
                </div>

                <Button variant="outline" size="icon" className="float-end" onClick={() => router.push("/categories/1")}>
                    <ArrowRight className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="px-0">
                {categoriesData && categoriesData.length > 0 ? <CarouselList data={categoriesData} className=" lg:basis-1/6  md:basis-1/4 basis-1/3" /> : <NotFound />}
            </CardContent>
        </Card>
    );
}


export default memo(CategoriesPopularList)