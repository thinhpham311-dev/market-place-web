"use client";

import React from "react";

// components
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import SpuGrid from "@/features/product/components/ProGrid";
import { Pagination, SortBy, Filter } from "@/features/common";

// // hooks
import { useFetchData } from "@/features/product/list/by-category-id/hooks";

// // constants
import { SORTBY_OPTIONS, FILTER_OPTIONS } from "./constants";
import { PRO_LIST_BY_CATEGORYID } from "./constants";

const ProListByCategoryId = ({ lastId }: { lastId?: string }) => {
  const { products, totalItems, loading, error } = useFetchData({ lastId });

  return (
    <Card className="border-none shadow-nonee md:px-6 px-3">
      <CardContent className="px-0 grid grid-cols-12 gap-3">
        <div className="col-span-2 space-y-3">
          <Filter
            storeKey={PRO_LIST_BY_CATEGORYID}
            initialValue={{
              data: FILTER_OPTIONS,
              filter: {},
            }}
          />
        </div>

        <div className="col-span-10 flex flex-col space-y-3">
          <Card className="h-full">
            <CardHeader className="p-3">
              <div className="flex gap-4 justify-between items-center">
                <div className="flex-1">
                  <SortBy
                    storeKey={PRO_LIST_BY_CATEGORYID}
                    initialValue={{
                      data: SORTBY_OPTIONS,
                      sortBy: null,
                    }}
                  />
                </div>
                <div>
                  <Pagination
                    reducerKey={PRO_LIST_BY_CATEGORYID}
                    storeKey={PRO_LIST_BY_CATEGORYID}
                    isShowNav
                    initialValue={{
                      limit: 10,
                      totalItems,
                      totalPages: 0,
                      currentPage: 1,
                    }}
                  />
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-3">
              <SpuGrid
                error={error}
                isLoading={loading}
                countLoadItems={20}
                data={products}
                className="lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-3"
              />
            </CardContent>

            <CardFooter className="p-3 justify-center">
              <Pagination
                reducerKey={PRO_LIST_BY_CATEGORYID}
                storeKey={PRO_LIST_BY_CATEGORYID}
                isShowDot
                isShowNav
                isShowLabel
                initialValue={{
                  limit: 20,
                  currentPage: 1,
                  totalItems,
                  totalPages: 0,
                }}
              />
            </CardFooter>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProListByCategoryId;
