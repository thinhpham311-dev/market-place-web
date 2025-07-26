'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui';
import {
    //  Pagination,
    SortBy
} from "@/features/common";
// import { useAppSelector } from '@/lib/hooks';
import { SORTBY_OPTIONS } from "@/features/common/sort/constants"


const ProductSort: React.FC = () => {
    // const totalItems = useAppSelector(
    //     (state) => state.proListByCategoryId?.data?.total ?? 0
    // );

    return (
        <Card className="p-3">
            <CardContent className="flex gap-4 justify-between items-center p-0">
                <div className="flex-1">
                    <SortBy data={SORTBY_OPTIONS} />
                </div>
                {/* <div className='flex-none'>
                    <Pagination storeKey='with-sort' isShowNav limit={15} total={totalItems} />
                </div> */}
            </CardContent>
        </Card>
    );
};

export default ProductSort;
