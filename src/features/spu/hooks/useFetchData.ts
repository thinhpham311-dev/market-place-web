'use client';
import { useEffect, useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

// Actions and selectors
import { selectSpuDetailByStoreKey } from "../store/selectors";
import { getSpuDetail } from "../store/dataSlice";


// Reducer & constants
import reducer from "@/features/spu/store";
import { injectReducer, removeReducer } from "@/store";

//types
import { ISpuPro } from "@/interfaces/spu";

//constants
import { SPU_KEY } from "@/features/spu/constants";


interface IUseFetchDataParams {
    product_id?: string;
    storeKey: string;
}

export function useFetchData({ product_id, storeKey }: IUseFetchDataParams) {

    useLayoutEffect(() => {
        const reducerKey = `${SPU_KEY}_${storeKey}`;
        injectReducer(reducerKey, reducer);
        return () => {
            removeReducer(reducerKey);
        };
    }, [storeKey]);

    const dispatch = useAppDispatch();

    const {
        spu,
        loading = false,
        error = null,
        status = "",
    } = useAppSelector(selectSpuDetailByStoreKey(storeKey));

    useEffect(() => {
        const promise = dispatch(getSpuDetail({
            product_id
        } as ISpuPro) as any);

        return () => {
            promise.abort?.();
        };
    }, [dispatch,
        product_id
    ]);

    return { spu, loading, error, status };
}
