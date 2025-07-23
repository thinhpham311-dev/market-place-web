'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui';
import { PaginationCustom, SortBar } from "@/features/common"
import { useAppSelector } from '@/lib/hooks';

const ProductSort: React.FC = () => {
    const { total: totalItems = 0 } =
        useAppSelector((state) => state.proListByCategoryId.data || {});


    return (
        <Card className=" p-3 ">
            <CardContent className=" flex gap-4 justify-between items-center p-0">
                <SortBar />
                <PaginationCustom
                    showNavigation
                    totalItems={totalItems}
                />
            </CardContent>
        </Card>
    );
};

export default ProductSort;
