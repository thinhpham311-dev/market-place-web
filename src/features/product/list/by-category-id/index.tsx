"use client";

import React from "react";

// components
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import SpuGrid from "@/features/product/components/ProGrid";
import { Pagination, SortBy, Filter } from "@/features/common";
import { useFetchData as useBrandFetchData } from "@/features/brand/list/all/hooks";

// // hooks
import { useFetchData } from "@/features/product/list/by-category-id/hooks";

// // constants
import { SORTBY_OPTIONS, FILTER_OPTIONS } from "./constants";
import { PRO_LIST_BY_CATEGORYID } from "./constants";

const ProListByCategoryId = ({ lastId }: { lastId?: string }) => {
  const { products, totalItems, loading, error, status } = useFetchData({ lastId });
  const { brands = [] } = useBrandFetchData();

  const filterOptions = React.useMemo(() => {
    const brandFilter = {
      label: "Brands",
      labelKey: "brands",
      key: "brands",
      type: "checkbox",
      items: brands.map((brand) => ({
        key: brand.brand_id || brand._id,
        label: brand.brand_name || "Brand",
        value: brand.brand_id || brand._id,
      })),
    };

    const otherFilters = FILTER_OPTIONS.filter((item) => item.key !== "brands");

    return [brandFilter, ...otherFilters];
  }, [brands]);

  return (
    <Card className="border-none shadow-nonee md:px-6 px-3">
      <CardContent className="px-0 grid grid-cols-12 gap-3">
        <div className="col-span-2 space-y-3">
          <Filter
            storeKey={PRO_LIST_BY_CATEGORYID}
            initialValue={{
              data: filterOptions,
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
                      defaultData: SORTBY_OPTIONS,
                      defaultValue: SORTBY_OPTIONS[0] ?? null,
                    }}
                  />
                </div>
                <div>
                  <Pagination
                    storeKey={PRO_LIST_BY_CATEGORYID}
                    initialValue={{
                      isShowNav: true,
                      defaultTotalItems: totalItems,
                    }}
                  />
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-3">
              <SpuGrid
                error={error}
                isLoading={loading}
                status={status}
                countLoadItems={20}
                data={products}
                className="lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-3"
              />
            </CardContent>

            <CardFooter className="p-3 justify-center">
              <Pagination
                storeKey={PRO_LIST_BY_CATEGORYID}
                initialValue={{
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

export default ProListByCategoryId;
