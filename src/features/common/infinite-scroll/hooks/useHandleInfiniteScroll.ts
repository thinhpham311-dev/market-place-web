import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
    nextPage,
    resetPagination,
    setTotalCount,
    setLimit,
    setPage,
} from "@/features/common/infinite-scroll/store/stateSlice";
import { INFINITE_SCROLL } from "@/features/common/infinite-scroll/constants";
import { selectInfiniteScrollByStoreKey } from "@/features/common/infinite-scroll/store/selectors";
import { injectReducer } from "@/store";
import reducer from "@/features/common/infinite-scroll/store";

interface IUseHandleInfiniteScroll {
    storeKey: string;
}

export function useHandleInfiniteScroll({
    storeKey
}: IUseHandleInfiniteScroll) {
    injectReducer(`${INFINITE_SCROLL}_${storeKey}`, reducer);
    const dispatch = useAppDispatch();

    const { currentPage, totalPages, limit } = useAppSelector(selectInfiniteScrollByStoreKey(storeKey));

    const goToNextPage = () => dispatch(nextPage());
    const resetInfiniteScroll = () => dispatch(resetPagination());
    const updateTotalItems = (count: number) => dispatch(setTotalCount(count));
    const updateLimit = (newLimit: number) => dispatch(setLimit(newLimit));
    const updatePage = (newPage: number) => dispatch(setPage(newPage));

    return {
        currentPage,
        limit,
        totalPages,
        goToNextPage,
        resetInfiniteScroll,
        updateTotalItems,
        updateLimit,
        updatePage,
    };
}
