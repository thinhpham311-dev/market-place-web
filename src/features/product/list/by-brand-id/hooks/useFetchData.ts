import { useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

// Actions and selectors
import { getProductListByBrand } from "@/features/product/list/by-brand-id/store/dataSlice";
import { selectProByBrandIdByStoreKey } from "@/features/product/list/by-brand-id/store/selectors";
import { useGetPaginationValue } from "@/features/common/pagination/hooks";
import { useGetFilterValue } from "@/features/common/filter/hooks";
import { useGetSortByValue } from "@/features/common/sort-by/hooks";

// Reducer & constants
import reducer from "@/features/product/list/by-brand-id/store";
import { injectReducer, removeReducer } from "@/store";
import { PRO_LIST_BY_BRANDID, SORTBY_OPTIONS } from "@/features/product/list/by-brand-id/constants";
import type { Sort } from "@/features/common/sort-by/types";

interface UseFetchDataParams {
  lastId?: string;
  initialPage?: number;
  initialLimit?: number;
  initialSort?: Sort;
}

export function useFetchData({
  lastId,
  initialPage = 1,
  initialLimit = 20,
  initialSort = SORTBY_OPTIONS[0],
}: UseFetchDataParams = {}) {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [resolvedRequestKey, setResolvedRequestKey] = useState<string | null>(null);

  // Extract query parameters from browser URL if present
  const paramPage = Number(searchParams?.get("page")) || initialPage;
  const paramLimit = Number(searchParams?.get("limit")) || initialLimit;
  const paramSort = searchParams?.get("sort") || searchParams?.get("sortBy");
  const matchedSort = SORTBY_OPTIONS.find((s) => s.value === paramSort) || initialSort;

  // Extract filter query parameters from URL
  const initialFilter = useMemo(() => {
    if (!searchParams) return {};
    const parsed: Record<string, any> = {};
    searchParams.forEach((value, key) => {
      if (["page", "limit", "sort", "sortBy", "brandId", "ids"].includes(key)) return;
      if (!value) return;
      if (value.includes(",")) {
        parsed[key] = value
          .split(",")
          .filter(Boolean)
          .map((v) => (!isNaN(Number(v)) ? Number(v) : v));
      } else {
        parsed[key] = [!isNaN(Number(value)) ? Number(value) : value];
      }
    });
    return parsed;
  }, [searchParams]);

  // Inject and clean up reducer
  useEffect(() => {
    injectReducer(PRO_LIST_BY_BRANDID, reducer);
    return () => {
      removeReducer(PRO_LIST_BY_BRANDID);
    };
  }, []);

  // Pagination state
  const { currentPage = 1, limit = 20 } = useGetPaginationValue({
    storeKey: PRO_LIST_BY_BRANDID,
    initialValue: {
      currentPage: paramPage,
      limit: paramLimit,
      pages: [],
      totalItems: 0,
      totalPages: 1,
    },
  });

  // Filter state
  const { filter } = useGetFilterValue({
    storeKey: PRO_LIST_BY_BRANDID,
    initialValue: {
      data: [],
      filter: initialFilter,
    },
  });

  // Sort state
  const { sortBy } = useGetSortByValue({
    storeKey: PRO_LIST_BY_BRANDID,
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
  } = useAppSelector(selectProByBrandIdByStoreKey(PRO_LIST_BY_BRANDID)) || {};

  const sortValue = typeof sortBy === "object" ? sortBy?.value : sortBy;

  // Always synchronize state changes (page, limit, sort, filter) directly onto the browser URL address bar
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams();

    params.set("page", String(currentPage || 1));
    params.set("limit", String(limit || 20));

    if (sortValue) {
      params.set("sort", String(sortValue));
    }

    if (filter && typeof filter === "object") {
      Object.entries(filter).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== "") {
          if (Array.isArray(val)) {
            if (val.length > 0) {
              params.set(key, val.join(","));
            }
          } else {
            params.set(key, String(val));
          }
        }
      });
    }

    const queryString = params.toString();
    const newUrl = `${pathname}${queryString ? `?${queryString}` : ""}`;
    if (window.location.search !== (queryString ? `?${queryString}` : "")) {
      window.history.replaceState(null, "", newUrl);
    }
  }, [pathname, currentPage, limit, sortValue, filter]);

  const requestKey = JSON.stringify({ lastId, currentPage, limit, filter, sortBy });

  const isRequestLoading = Boolean(lastId) && resolvedRequestKey !== requestKey;

  // Fetch product list
  useEffect(() => {
    if (!lastId) {
      setResolvedRequestKey(null);
      return;
    }

    const promise = dispatch(
      getProductListByBrand({
        limit,
        page: currentPage,
        sortBy,
        filter,
        ids: lastId,
      }) as any,
    );

    promise.finally?.(() => {
      setResolvedRequestKey(requestKey);
    });

    return () => {
      promise.abort?.();
    };
  }, [dispatch, requestKey, lastId, currentPage, limit, filter, sortBy, sortValue]);

  return {
    products: isRequestLoading ? [] : products,
    totalItems,
    loading: isRequestLoading || loading || status === "idle",
    error,
    status,
    paramPage,
    paramLimit,
    matchedSort,
    initialFilter,
  };
}
