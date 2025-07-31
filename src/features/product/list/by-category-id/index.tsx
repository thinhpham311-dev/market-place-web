"use client";

import React from "react";

// components
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui";
import ProductGrid from "../components/ProductGrid";
import { Pagination, SortBy, Filter } from "@/features/common";

// hooks
import { useFetchData } from "@/features/product/list/by-category-id/hooks"

// constants
import { SORTBY_OPTIONS, FILTER_OPTIONS } from "./constants";
import { PRO_LIST_BY_CATEGORYID } from "./constants";


const ProListByCategoryId = ({ lastId }: { lastId?: string }) => {
    const { products, totalItems, loading, error } = useFetchData({ lastId });


    return (
        <Card className="border-0 shadow-none md:px-6 px-3">
            <CardContent className="px-0 grid grid-cols-12 gap-3">
                <div className="col-span-2 space-y-3">
                    <Filter
                        storeKey={PRO_LIST_BY_CATEGORYID}
                        data={FILTER_OPTIONS} />
                </div>

                <div className="col-span-10 flex flex-col space-y-3">
                    <Card>
                        <CardHeader className="p-3">
                            <div className="flex gap-4 justify-between items-center">
                                <div className="flex-1">
                                    <SortBy
                                        storeKey={PRO_LIST_BY_CATEGORYID}
                                        data={SORTBY_OPTIONS} />
                                </div>
                                <div>
                                    <Pagination
                                        storeKey={PRO_LIST_BY_CATEGORYID}
                                        isShowNav
                                        initialLimit={10}
                                        initialTotal={totalItems}
                                    />
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="p-3">
                            <ProductGrid
                                error={error}
                                countLoadItems={15}
                                data={products}
                                className="lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-3"
                                isLoading={loading}
                            />
                        </CardContent>

                        <CardFooter className="p-3 justify-center">
                            <Pagination
                                storeKey={PRO_LIST_BY_CATEGORYID}
                                isShowDot
                                isShowNav
                                initialLimit={15}
                                initialTotal={totalItems}
                            />
                        </CardFooter>
                    </Card>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProListByCategoryId;
