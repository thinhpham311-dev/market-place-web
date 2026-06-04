"use client";

import React from "react";
import { usePathname } from "next/navigation";

// components
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import SpuGrid from "@/features/product/components/ProGrid";
import { Pagination, SortBy, Filter } from "@/features/common";
import { useFetchData as useBrandFetchData } from "@/features/brand/list/by-category-id/hooks";
import { useGetPaginationValue } from "@/features/common/pagination/hooks";
import { useAppDispatch } from "@/lib/hooks";
import { setPage } from "@/features/common/pagination/store/stateSlice";
import { withEnsureInit } from "@/features/common/pagination/helpers";
import { useGetSortByValue } from "@/features/common/sort-by/hooks";
import { setSortBy } from "@/features/common/sort-by/store/stateSlice";
import type { Sort } from "@/features/common/sort-by/types";

// // hooks
import { useFetchData } from "@/features/product/list/by-category-id/hooks";

// // constants
import { SORTBY_OPTIONS, FILTER_OPTIONS } from "./constants";
import { PRO_LIST_BY_CATEGORYID } from "./constants";

const getPageFromValue = (value?: string | null) => {
  const parsedPage = Number(value);
  return Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
};

const getSortOption = (sortValue?: string | null): Sort => {
  return SORTBY_OPTIONS.find((option) => option.value === sortValue) ?? SORTBY_OPTIONS[0];
};

const CategoryListUrlSync = ({
  initialPage,
  initialSort,
}: {
  initialPage: number;
  initialSort: Sort;
}) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const previousSortRef = React.useRef<string | null>(null);
  const { currentPage } = useGetPaginationValue({
    storeKey: PRO_LIST_BY_CATEGORYID,
    initialValue: {
      currentPage: initialPage,
      limit: 20,
      pages: [],
      totalItems: 0,
      totalPages: 1,
    },
  });
  const { sortBy } = useGetSortByValue({
    storeKey: PRO_LIST_BY_CATEGORYID,
    initialState: {
      data: SORTBY_OPTIONS,
      sortBy: initialSort,
    },
  });

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const rawPage = params.get("page");
    const rawSort = params.get("sort");
    const urlPage = getPageFromValue(params.get("page"));
    const urlSort = getSortOption(params.get("sort"));
    const nextSort = sortBy ?? initialSort;

    if (
      rawPage === String(currentPage) &&
      rawSort === nextSort.value &&
      urlPage === currentPage &&
      urlSort.value === nextSort.value
    ) {
      return;
    }

    params.set("page", String(currentPage));
    params.set("sort", nextSort.value);
    const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;

    window.history.replaceState(window.history.state, "", nextUrl);
  }, [currentPage, initialSort, pathname, sortBy]);

  React.useEffect(() => {
    dispatch(
      setSortBy({
        storeKey: PRO_LIST_BY_CATEGORYID,
        sortBy: initialSort,
        data: SORTBY_OPTIONS,
      }),
    );
    dispatch(
      withEnsureInit(setPage({ key: PRO_LIST_BY_CATEGORYID, page: initialPage }), [
        PRO_LIST_BY_CATEGORYID,
      ]),
    );
  }, [dispatch, initialPage, initialSort]);

  React.useEffect(() => {
    const currentSortValue = sortBy?.value ?? initialSort.value;

    if (previousSortRef.current === null) {
      previousSortRef.current = currentSortValue;
      return;
    }

    if (previousSortRef.current !== currentSortValue && currentPage !== 1) {
      dispatch(
        withEnsureInit(setPage({ key: PRO_LIST_BY_CATEGORYID, page: 1 }), [PRO_LIST_BY_CATEGORYID]),
      );
    }

    previousSortRef.current = currentSortValue;
  }, [currentPage, dispatch, initialSort.value, sortBy]);

  return null;
};

const ProListByCategoryId = ({
  lastId,
  initialPage = 1,
  initialSortValue,
}: {
  lastId?: string;
  initialPage?: number;
  initialSortValue?: string;
}) => {
  const initialSort = React.useMemo(() => getSortOption(initialSortValue), [initialSortValue]);
  const { products, totalItems, loading, error } = useFetchData({
    lastId,
    initialPage,
    initialSort,
  });
  const { brands = [] } = useBrandFetchData({ lastId });

  const filterOptions = React.useMemo(() => {
    const brandFilter = {
      label: "Brands",
      labelKey: "brands",
      key: "brands",
      type: "checkbox",
      items: brands.map((brand: any) => ({
        key: brand.brand_id || brand._id,
        label: brand.brand_name || "Brand",
        value: brand.brand_id || brand._id,
      })),
    };

    const otherFilters = FILTER_OPTIONS.filter((item) => item.key !== "brands");

    return [brandFilter, ...otherFilters];
  }, [brands]);

  return (
    <Card className="border-none px-3 shadow-none md:px-6">
      <CategoryListUrlSync initialPage={initialPage} initialSort={initialSort} />
      <CardContent className="grid items-stretch gap-3 px-0 md:grid-cols-12">
        <div className="space-y-3 md:col-span-3 lg:col-span-2">
          <Filter
            storeKey={PRO_LIST_BY_CATEGORYID}
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
                    storeKey={PRO_LIST_BY_CATEGORYID}
                    initialValue={{
                      defaultData: SORTBY_OPTIONS,
                      defaultValue: initialSort,
                    }}
                  />
                </div>
                <div className="shrink-0">
                  {/* <Pagination
                    storeKey={PRO_LIST_BY_CATEGORYID}
                    initialValue={{
                      defaultLimit: 20,
                      isShowNav: true,
                      defaultTotalItems: totalItems,
                    }}
                  /> */}
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

            <CardFooter className="mt-auto justify-center border-t pb-3 pt-3">
              <Pagination
                storeKey={PRO_LIST_BY_CATEGORYID}
                initialValue={{
                  defaultCurrentPage: initialPage,
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

export default ProListByCategoryId;
