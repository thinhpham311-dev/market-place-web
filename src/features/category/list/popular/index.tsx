"use client";

import { useRouter } from "next/navigation";

// Components
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import {
    Button,
} from "@/components/ui/button";
import CategoryCarousel from "@/features/category/components/CategoryCarousel";

// Icons
import { ArrowRight } from "lucide-react";

// hooks
import { useFetchData } from "@/features/category/list/popular/hooks";


const CatPopularList: React.FC = () => {
    const router = useRouter();
    const { categories, loading, error } = useFetchData();


    return (
        <Card className="border-none shadow-nonee rounded-none md:px-6 px-3 w-full">
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
                <CategoryCarousel
                    countLoadItems={6}
                    data={categories}
                    isLoading={loading}
                    error={error}
                    className="lg:basis-1/6 md:basis-1/4 basis-1/3"
                />
            </CardContent>
        </Card>
    );
};

export default CatPopularList;
