"use client";

import React, { useEffect, memo } from "react";
import { useRouter } from "next/navigation";

// Components
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
    CarouselItem,
} from "@/components/ui/molecules";
import { Button } from "@/components/ui/atoms";
import CategoryItem from "./CategoryItem";
import { NotFound } from "@/components/ui/organisms";

// Icons
import { ArrowRight } from "lucide-react";

// Store & hooks
import { getCategoryList } from "@/store/category/dataSlice";
import { injectReducer } from "@/store";
import reducer from "@/store/category";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";

// Types & utils
import { ICategory } from "@/interfaces/category";
import { cn } from "@/lib/utils";

// Inject reducer once globally
injectReducer("category", reducer);

interface CarouselListProps {
    data: ICategory[];
    itemsPerPage?: number;
    className?: string;
}


const CarouselList = memo(({ data, itemsPerPage = 12, className }: CarouselListProps) => (
    <Carousel>
        <CarouselContent className="-ml-2">
            {data.slice(0, itemsPerPage).map((item) => (
                <CarouselItem key={item._id} className={cn("pl-2", className)}>
                    <CategoryItem item={item} />
                </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className="top-1/2 -translate-y-1/2 md:-left-5 -left-3" />
        <CarouselNext className="top-1/2 -translate-y-1/2 md:-right-5 -right-3" />
    </Carousel>
));

CarouselList.displayName = "CarouselList";

const CategoriesPopularList: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { list: categories = [], loading } = useAppSelector((state) => state.category.data);

    useEffect(() => {
        dispatch(getCategoryList() as any);
    }, [dispatch]);

    return (
        <Card className="border-0 shadow-none rounded-none md:px-6 px-3 w-full">
            <CardHeader className="flex-row items-center px-0 space-x-3 mb-3">
                <div className="flex-1">
                    <CardTitle className="mb-3 capitalize">Categories</CardTitle>
                    <CardDescription className="md:line-clamp-2 line-clamp-1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquet lobortis erat, sed varius arcu iaculis id.
                    </CardDescription>
                </div>
                <Button
                    variant="outline"
                    size="icon"
                    className="float-end"
                    onClick={() => router.push("/categories/1")}
                >
                    <ArrowRight className="h-4 w-4" />
                </Button>
            </CardHeader>

            <CardContent className="px-0">
                {loading ? (
                    <p className="text-muted-foreground text-sm">Loading...</p>
                ) : categories.length > 0 ? (
                    <CarouselList data={categories} className="lg:basis-1/6 md:basis-1/4 basis-1/3" />
                ) : (
                    <NotFound />
                )}
            </CardContent>
        </Card>
    );
};

export default memo(CategoriesPopularList);
