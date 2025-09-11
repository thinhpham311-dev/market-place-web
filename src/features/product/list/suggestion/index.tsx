'use client';

import {
    Card, CardHeader, CardContent, CardTitle, CardDescription
} from "@/components/ui";
import SpuGrid from "@/features/product/components/ProGrid";
// import LoadMoreTrigger from "@/features/common/infinite-scroll";
import Pagination from "@/features/common/pagination";

//hooks
import { useFetchData } from "@/features/product/list/suggestion/hooks";

import { PRO_SUGGESTION_LIST } from "@/features/product/list/suggestion/constants";


export default function ProSuggestionList() {

    const { products, totalItems, error, status } = useFetchData({
        storeKey: PRO_SUGGESTION_LIST,
    });


    return (
        <Card className="border-none shadow-nonee  grid grid-cols-12">
            <CardHeader className="items-center col-span-12 space-x-3 mb-3">
                <CardTitle className="mb-3 capitalize text-center mx-auto">
                    Suggestion today
                </CardTitle>
                <CardDescription className="mb-3 capitalize text-center mx-auto">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </CardDescription>
            </CardHeader>

            <CardContent className="col-span-12 space-y-3">
                <SpuGrid
                    countLoadItems={24}
                    error={error}
                    data={products}
                    className=" grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"
                    status={status}
                />
                <Pagination
                    storeKey={PRO_SUGGESTION_LIST}
                    isShowDot
                    isShowNav
                    initialLimit={24}
                    initialTotal={totalItems}
                />
            </CardContent>
        </Card>
    );
}
