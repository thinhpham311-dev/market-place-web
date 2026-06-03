import { useEffect, useState } from "react";
import { ISpuModel } from "@/models/spu";
import {
  IRecentProductListRequest,
  IRecentProductListResponse,
} from "@/features/product/list/recent/interfaces";
import { apiGetRecentProducts } from "@/features/product/list/recent/services";
import { useTranslation } from "@/lib/hooks";

function normalizeRecentProducts(payload: IRecentProductListResponse | ISpuModel[]): ISpuModel[] {
  if (Array.isArray(payload)) {
    return payload;
  }

  const candidates = [
    payload?.metadata?.list,
    payload?.metadata?.data,
    payload?.data,
    payload?.list,
  ];

  return candidates.find(Array.isArray) ?? [];
}

export function useFetchData({ limit = 12 }: IRecentProductListRequest = {}) {
  const { t } = useTranslation();
  const [products, setProducts] = useState<ISpuModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchRecentProducts() {
      setLoading(true);
      setError(null);

      try {
        const response = await apiGetRecentProducts({ limit, signal: controller.signal });
        setProducts(normalizeRecentProducts(response.data as IRecentProductListResponse));
      } catch (error: any) {
        if (error?.name === "CanceledError" || error?.code === "ERR_CANCELED") {
          return;
        }

        setProducts([]);
        setError(error?.message || t("common_something_went_wrong"));
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchRecentProducts();

    return () => {
      controller.abort();
    };
  }, [limit, t]);

  return { products, loading, error };
}
