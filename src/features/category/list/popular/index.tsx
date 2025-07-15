"use client";

import React, { useEffect, memo } from "react";
import { useRouter } from "next/navigation";

// Components
import {
    Button,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,

} from "@/components/ui";
import CategoryCarousel from "../components/CategoryCarousel";

// Icons
import { ArrowRight } from "lucide-react";

// Store & hooks
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { getCategoryList } from "./store/dataSlice";
import { injectReducer } from "@/store";
import reducer from "./store";


injectReducer("catPopularList", reducer);

const CatPopularList: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { list: categories = [], loading } = useAppSelector((state) => state.catPopularList.data);
    useEffect(() => {
        dispatch(getCategoryList() as any);
    }, [dispatch]);

    return (
        <Card className="border-0 shadow-none rounded-none md:px-6 px-3 w-full">
            <CardHeader className="flex-row items-center px-0 space-x-3 mb-3">
                <div className="flex-1">
                    <CardTitle className="mb-3 capitalize">Popular Categories</CardTitle>
                    <CardDescription className="md:line-clamp-2 line-clamp-1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquet lobortis erat, sed varius arcu iaculis id.
                    </CardDescription>
                </div>
                <Button
                    variant="outline"
                    size="icon"
                    className="float-end"
                    onClick={() => router.push("/1")}
                >
                    <ArrowRight className="h-4 w-4" />
                </Button>
            </CardHeader>

            <CardContent className="px-0">
                <CategoryCarousel data={categories} isLoading={loading} className="lg:basis-1/6 md:basis-1/4 basis-1/3" />
            </CardContent>
        </Card>
    );
};

export default memo(CatPopularList);
