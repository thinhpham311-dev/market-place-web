import { removeAllItems } from "@/features/cart/store/stateSlice";
import {
    getItemInCart,
    addItemIntoCart,
    updateItemInCart,
} from "@/features/cart/store/dataSlice";
import type { ICartItem } from "@/interfaces/cart";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectCartDataByStoreKey } from "@/features/cart/store/selectors"
import { selectCartStateByStoreKey } from "@/features/cart/store/selectors"

interface IMergeCartOnLogin {
    user_id: string,
    storeKey: string
}

export const mergeCartOnLogin =
    async ({ user_id = "1001", storeKey }: IMergeCartOnLogin) => {
        const dispatch = useAppDispatch()

        const { cart } = useAppSelector(selectCartDataByStoreKey(storeKey));
        const { items } = useAppSelector(selectCartStateByStoreKey(storeKey))

        const merged: ICartItem[] = [...cart];
        items.forEach((item: ICartItem) => {
            const existing = merged.find((i) => i.sku_id === item.sku_id);
            if (existing) {
                existing.quantity += item.quantity;
            } else {
                merged.push(item);
            }
        });

        for (const item of merged) {
            const existOnServer = cart.find(
                (i: ICartItem) => i.sku_id === item.sku_id
            );
            if (existOnServer) {
                await dispatch(updateItemInCart({ user_id, ...item } as ICartItem & { user_id: string }) as any);
            } else {
                await dispatch(addItemIntoCart({ user_id, ...item } as ICartItem & { user_id: string }) as any);
            }
        }

        await dispatch(getItemInCart({ user_id } as ICartItem & { user_id: string }) as any);
        dispatch(removeAllItems());
    };
