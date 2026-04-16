"use client";

import React from "react";
import { useFetchData } from "./hooks";
import { useFetchData as useBrandFetchData } from "@/features/brand/list/by-category-id/hooks";

import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Pagination, SortBy, Filter } from "@/features/common";
import SpuGrid from "@/features/product/components/ProGrid";

// // constants
import { SORTBY_OPTIONS, FILTER_OPTIONS } from "./constants";
import { PRO_LIST_BY_BRANDID } from "./constants";
 

const ProListByBrandId = ({ lastId }: { lastId?: string }) => {
  const { products, totalItems, loading, error } = useFetchData({ lastId });
    const { brands = [] } = useBrandFetchData({ lastId });

  const filterOptions = React.useMemo(() => {

    const otherFilters = FILTER_OPTIONS.filter((item) => item.key !== "brands");

    return [ ...otherFilters];
  }, [brands]);
  return (
    <Card className="border-none px-3 shadow-none md:px-6">
      <CardContent className="grid items-stretch gap-3 px-0 md:grid-cols-12">
        <div className="space-y-3 md:col-span-3 lg:col-span-2">
          <Filter
            storeKey={PRO_LIST_BY_BRANDID}
            initialValue={{
              data: filterOptions,
              filter: {},
            }}
          />
        </div>

        <div className="flex h-full flex-col md:col-span-9 lg:col-span-10">
          <Card className="flex h-full flex-col">
            <CardHeader className="p-3">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <SortBy
                    storeKey={PRO_LIST_BY_BRANDID}
                    initialValue={{
                      defaultData: SORTBY_OPTIONS,
                      defaultValue: SORTBY_OPTIONS[0] ?? null,
                    }}
                  />
                </div>
                <div className="shrink-0">
                  <Pagination
                    storeKey={PRO_LIST_BY_BRANDID}
                    initialValue={{
                      defaultLimit: 20,
                      isShowNav: true,
                      defaultTotalItems: totalItems,
                    }}
                  />
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 p-3">
              <SpuGrid
                error={error}
                isLoading={loading}
                countLoadItems={20}
                data={products}
                className="lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-2"
              />
            </CardContent>

            <CardFooter className="mt-auto justify-center border-t pb-3 pt-6">
              <Pagination
                storeKey={PRO_LIST_BY_BRANDID}
                initialValue={{
                  defaultLimit: 20,
                  isShowDot: true,
                  isShowNav: true,
                  isShowLabel: true,
                  defaultTotalItems: totalItems,
                }}
              />
            </CardFooter>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProListByBrandId;
