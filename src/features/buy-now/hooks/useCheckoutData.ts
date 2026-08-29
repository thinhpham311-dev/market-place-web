"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useShoppingCartContext } from "@/features/cart/hooks";
import type {
  CheckoutAddressValues,
  CheckoutPaymentOption,
} from "@/features/checkout/types/checkout";
import { useAppDispatch, useAppSelector, useTranslation } from "@/lib/hooks";
import reducer from "@/features/checkout/store";
import { injectReducer, removeReducer } from "@/store";
import { CHECKOUT_KEY } from "@/features/checkout/constants";
import { selectCheckoutByStoreKey } from "@/features/checkout/store/selectors";
import {
  resetCheckoutState,
  setCheckoutAddressValue,
  setCheckoutPaymentMethod,
  setCheckoutSubmitting,
} from "@/features/checkout/store/stateSlice";
import type { PaymentMethod } from "@/types/payment";
import { apiPostSpuDetail } from "@/features/spu/services";
import { apiPostSkuDetail } from "@/features/sku/services";
import { apiPostCheckoutReview, apiPostCheckoutAdd } from "../services";

export function useCheckoutData() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const router = useRouter();

  const product_id = searchParams.get("product_id");
  const sku_tier_idx = searchParams.get("sku_tier_idx");
  const qty = parseInt(searchParams.get("qty") || "1", 10);

  const { data: cartData, loading } = useShoppingCartContext();
  const dispatch = useAppDispatch();

  const signedIn = useAppSelector((state) => state.auth.session.signedIn);
  const authUser = useAppSelector((state) => state.auth.user);
  const userId = authUser?._id || authUser?.id || "1001";
  const cartId = cartData?.cart_id;

  const [spu, setSpu] = useState<any>(null);
  const [sku, setSku] = useState<any>(null);
  const [reviewData, setReviewData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    injectReducer(CHECKOUT_KEY, reducer);

    return () => {
      dispatch(resetCheckoutState());
      removeReducer(CHECKOUT_KEY);
    };
  }, [dispatch]);

  const { paymentMethod, isSubmitting, addressValues } = useAppSelector(
    selectCheckoutByStoreKey(CHECKOUT_KEY),
  );

  useEffect(() => {
    if (!product_id || !sku_tier_idx) {
      setIsLoading(false);
      return;
    }

    async function loadData() {
      try {
        setIsLoading(true);
        // 1. Fetch SPU detail
        const spuRes: any = await apiPostSpuDetail({ product_id } as any);
        const spuData = spuRes.data?.metadata || spuRes.data;

        // 2. Fetch SKU detail
        const skuTierIdxArray = sku_tier_idx ? sku_tier_idx.split(",").map(Number) : [];
        const skuRes: any = await apiPostSkuDetail({
          product_id,
          sku_tier_idx: skuTierIdxArray,
        } as any);
        const skuData = skuRes.data?.metadata || skuRes.data;

        setSpu(spuData);
        setSku(skuData);

        // 3. Call API review
        if (spuData && skuData && cartId) {
          const shop_order_ids = [
            {
              shopId: spuData.product_shop.shop_id,
              shop_discounts: [],
              item_products: [
                {
                  skuId: skuData.sku_id,
                  quantity: qty,
                  price: skuData.sku_price,
                  productId: spuData.product_id,
                },
              ],
            },
          ];

          const reviewRes: any = await apiPostCheckoutReview({
            cartId,
            userId,
            shop_order_ids,
          });

          setReviewData(reviewRes.data?.metadata || reviewRes.data);
        }
      } catch (err) {
        console.error("Failed to load Buy Now checkout data:", err);
        toast.error("Failed to load Buy Now checkout data");
      } finally {
        setIsLoading(false);
      }
    }

    if (cartId) {
      loadData();
    }
  }, [product_id, sku_tier_idx, qty, cartId, userId]);

  const paymentOptions: CheckoutPaymentOption[] = useMemo(
    () => [
      {
        label: t("checkout_payment_cod"),
        value: "cod",
        description: t("checkout_payment_cod_desc"),
      },
      {
        label: t("checkout_payment_bank_transfer"),
        value: "bank_transfer",
        description: t("checkout_payment_bank_transfer_desc"),
      },
      {
        label: t("checkout_payment_stripe"),
        value: "stripe",
        description: t("checkout_payment_stripe_desc"),
      },
    ],
    [t],
  );

  const checkoutItems = useMemo(() => {
    if (!spu || !sku) return [];
    return [
      {
        itemSkuId: sku.sku_id,
        itemSkuPrice: sku.sku_price,
        itemSkuStock: sku.sku_stock,
        itemSkuTierIdx: sku.sku_tier_idx,
        itemSpuName: spu.product_name,
        itemSpuImage: spu.product_image,
        itemSpuVariations: spu.product_variations,
        itemSpuSlug: spu.product_slug,
        itemSpuId: spu.product_id,
        itemShopId: spu.product_shop.shop_id,
        itemShopName: spu.product_shop.shop_name,
        itemShopSlug: spu.product_shop.shop_slug,
        itemQuantity: qty,
        itemTotalPrice: sku.sku_price * qty,
      },
    ];
  }, [spu, sku, qty]);

  const summary = useMemo(() => {
    if (!reviewData?.checkoutOrder) {
      const subTotal = (sku?.sku_price || 0) * qty;
      return {
        itemCount: qty,
        subTotal,
        shipping: 0,
        tax: 0,
        total: subTotal,
      };
    }

    const { totalPrice, totalCheckout, freeShip } = reviewData.checkoutOrder;
    return {
      itemCount: qty,
      subTotal: totalPrice,
      shipping: freeShip || 0,
      tax: 0,
      total: totalCheckout,
    };
  }, [qty, sku, reviewData]);

  const setAddressValue = useCallback(
    <K extends keyof CheckoutAddressValues>(key: K, value: CheckoutAddressValues[K]) => {
      dispatch(setCheckoutAddressValue({ key, value }));
    },
    [dispatch],
  );

  const setPaymentMethod = useCallback(
    (value: PaymentMethod) => {
      dispatch(setCheckoutPaymentMethod(value));
    },
    [dispatch],
  );

  const submitOrder = useCallback(async () => {
    if (!signedIn) {
      toast.error(t("checkout_sign_in_before_payment_error"));
      return;
    }

    if (!spu || !sku) {
      toast.error(t("checkout_empty_error"));
      return;
    }

    try {
      dispatch(setCheckoutSubmitting(true));

      const payload = {
        cartId,
        userId,
        shop_order_ids: [
          {
            shopId: spu.product_shop.shop_id,
            shop_discounts: [],
            item_products: [
              {
                skuId: sku.sku_id,
                quantity: qty,
                price: sku.sku_price,
                productId: spu.product_id,
              },
            ],
          },
        ],
        user_address: addressValues,
        user_payment: {
          method: paymentMethod,
        },
      };

      await apiPostCheckoutAdd(payload);
      toast.success(t("checkout_order_placed_success"));
      router.push("/user/purchase");
    } catch (error: any) {
      console.error("Order submission failed:", error);
      toast.error(error?.message || "Order submission failed");
    } finally {
      dispatch(setCheckoutSubmitting(false));
    }
  }, [spu, sku, qty, signedIn, cartId, userId, addressValues, paymentMethod, router, t, dispatch]);

  return {
    signedIn,
    paymentMethod,
    paymentOptions,
    checkoutItems,
    summary,
    isSubmitting,
    isCartLoading: isLoading || loading.actions.showList,
    addressValues,
    setPaymentMethod,
    setAddressValue,
    submitOrder,
  };
}
