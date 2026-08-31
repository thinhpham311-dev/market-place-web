import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

// Actions and selectors
import { getProductListByShop } from "@/features/product/list/by-shop-id/store/dataSlice";
import { selectProByShopIdByStoreKey } from "@/features/product/list/by-shop-id/store/selectors";
import { useGetPaginationValue } from "@/features/common/pagination/hooks";
import { useGetFilterValue } from "@/features/common/filter/hooks";
import { useGetSortByValue } from "@/features/common/sort-by/hooks";

// Reducer & constants
import reducer from "@/features/product/list/by-shop-id/store";
import { injectReducer, removeReducer } from "@/store";
import { PRO_LIST_BY_SHOPID, DEFAULT_SHOP_ID, SORTBY_OPTIONS } from "@/features/product/list/by-shop-id/constants";
import type { Sort } from "@/features/common/sort-by/types";

interface UseFetchDataParams {
  lastId?: string;
  shopId?: string;
  initialPage?: number;
  initialLimit?: number;
  initialSort?: Sort;
}

export function useFetchData({
  lastId,
  shopId,
  initialPage = 1,
  initialLimit = 20,
  initialSort = SORTBY_OPTIONS[0],
}: UseFetchDataParams = {}) {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [resolvedRequestKey, setResolvedRequestKey] = useState<string | null>(null);

  const targetShopId = lastId || shopId || DEFAULT_SHOP_ID;

  // Extract query parameters from browser URL if present
  const paramPage = Number(searchParams?.get("page")) || initialPage;
  const paramLimit = Number(searchParams?.get("limit")) || initialLimit;
  const paramSort = searchParams?.get("sort") || searchParams?.get("sortBy");
  const matchedSort = SORTBY_OPTIONS.find((s) => s.value === paramSort) || initialSort;

  // Inject and clean up reducer
  useEffect(() => {
    injectReducer(PRO_LIST_BY_SHOPID, reducer);
    return () => {
      removeReducer(PRO_LIST_BY_SHOPID);
    };
  }, []);

  // Pagination state
  const { currentPage = 1, limit = 20 } = useGetPaginationValue({
    storeKey: PRO_LIST_BY_SHOPID,
    initialValue: {
      currentPage: paramPage,
      limit: paramLimit,
      pages: [],
      totalItems: 0,
      totalPages: 1,
    },
  });

  // Filter state
  const { filter } = useGetFilterValue({ storeKey: PRO_LIST_BY_SHOPID });

  // Sort state
  const { sortBy } = useGetSortByValue({
    storeKey: PRO_LIST_BY_SHOPID,
    initialState: {
      data: SORTBY_OPTIONS,
      sortBy: matchedSort,
    },
  });

  const {
    products = [],
    loading = false,
    error = null,
    totalItems = 0,
    status = "idle",
  } = useAppSelector(selectProByShopIdByStoreKey(PRO_LIST_BY_SHOPID)) || {};

  const sortValue = typeof sortBy === "object" ? sortBy?.value : sortBy;

  // Always synchronize state changes (page, limit, sort, filter) directly onto the browser URL address bar
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);

    params.set("page", String(currentPage || 1));
    params.set("limit", String(limit || 20));

    if (sortValue) {
      params.set("sort", String(sortValue));
    }

    if (filter && typeof filter === "object") {
      Object.entries(filter).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== "") {
          if (Array.isArray(val)) {
            if (val.length > 0) params.set(key, val.join(","));
          } else {
            params.set(key, String(val));
          }
        }
      });
    }

    const queryString = params.toString();
    const newUrl = `${pathname}?${queryString}`;
    if (window.location.search !== `?${queryString}`) {
      window.history.replaceState(null, "", newUrl);
    }
  }, [pathname, currentPage, limit, sortValue, filter]);

  const requestKey = JSON.stringify({ targetShopId, currentPage, limit, filter, sortBy });

  const isRequestLoading = Boolean(targetShopId) && resolvedRequestKey !== requestKey;

  // Fetch product list
  useEffect(() => {
    if (!targetShopId) {
      setResolvedRequestKey(null);
      return;
    }

    const promise = dispatch(
      getProductListByShop({
        limit,
        page: currentPage,
        offset: (currentPage - 1) * limit,
        sort: sortValue,
        sortBy,
        filter,
        ids: targetShopId,
      }) as any,
    );

    promise.finally?.(() => {
      setResolvedRequestKey(requestKey);
    });

    return () => {
      promise.abort?.();
    };
  }, [dispatch, requestKey, targetShopId, currentPage, limit, filter, sortBy, sortValue]);

  return {
    products: isRequestLoading ? [] : products,
    totalItems,
    loading: isRequestLoading || loading || status === "idle",
    error,
    status,
  };
}
