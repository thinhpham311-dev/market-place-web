'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui';
import { PaginationCustom, SortBar } from "@/features/common"

const ProductSort: React.FC = () => {

    return (
        <Card className=" p-3 ">
            <CardContent className=" flex gap-4 justify-between items-center p-0">
                <SortBar />
                <PaginationCustom />
            </CardContent>
        </Card>
    );
};

export default ProductSort;
