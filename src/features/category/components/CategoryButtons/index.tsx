
import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    ScrollArea, ScrollBar
} from "@/components/ui/scroll-area";
import NotFound from "./NotFound";
import LoadingSkeleton from "./LoadingSkeleton";
import { Category } from "@/features/category/types";
import CategoryButton from "../CategoryButton";

interface ButtonsProps {
    data: Category[];
    error: Error | null;
    ids: string[];
    isLoading?: boolean;
}

const CategoryButtons: React.FC<ButtonsProps> = ({
    data = [],
    ids,
    error,
    isLoading = false,
}) => {
    const lastId = ids.at(-1);

    if (!isLoading && (!data || data.length === 0) && error) {
        return <NotFound message={error.message || "Something went wrong."} />;
    }

    if (isLoading && (!data || data.length === 0)) {
        return <LoadingSkeleton count={6} className="h-10" />;
    }

    if (!isLoading && (!data || data.length === 0)) {
        return <NotFound message="No categories found." />;
    }

    const current = data?.find((cat) => cat.category_id === lastId && cat.isLeaf);
    if (current && current.parent_id) {
        return (
            <Card className="border-none shadow-none">
                <CardContent className="p-3">

                    <div className="w-auto">
                        <CategoryButton
                            className="w-auto"
                            isLoading={isLoading}
                            category={current}
                            isActive={current.category_id === lastId}
                            lastId={lastId}
                        />
                    </div>
                </CardContent>
            </Card>
        );
    }



    return (

        <Card className="border-none shadow-none">
            <CardContent className="p-3">

                <ScrollArea>
                    <div className="flex w-max space-x-2">
                        {data.filter(
                            (category) => !category.isLeaf || category.parent_id === null
                        ).map((category: Category, index: number) => (
                            <CategoryButton
                                key={category.category_id || index}
                                isLoading={isLoading}
                                category={category}
                                isActive={category?.category_id === lastId}
                                lastId={lastId}
                            />
                        ))}
                        <ScrollBar orientation="horizontal" />
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default CategoryButtons;
