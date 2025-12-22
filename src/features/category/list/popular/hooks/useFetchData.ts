import { useEffect, useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getCategoryList } from "@/features/category/list/popular/store/dataSlice";
import { selectCatPopularListByStoreKey } from "@/features/category/list/popular/store/selectors";
//stores
import reducer from "@/features/category/list/popular/store";
import { injectReducer, removeReducer } from "@/store";

//constants
import { CAT_POPULAR_LIST } from "@/features/category/list/popular/constants";


export function useFetchData() {
    useLayoutEffect(() => {
        injectReducer(CAT_POPULAR_LIST, reducer)

        return () => {
            removeReducer(CAT_POPULAR_LIST)
        }
    }, [CAT_POPULAR_LIST])

    const dispatch = useAppDispatch();

    const { categories, totalItems, loading, error = null } = useAppSelector(
        selectCatPopularListByStoreKey(CAT_POPULAR_LIST)
    );


    useEffect(() => {
        const promise = dispatch(getCategoryList({}) as any);
        return () => {
            promise.abort();
        };
    }, [dispatch]);

    return { categories, totalItems, loading, error };
}
