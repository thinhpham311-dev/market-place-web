import { useEffect, useState } from "react";
import { ISpuModel } from "@/models/spu";
import {
  createAverageHash,
  getHammingDistance,
} from "@/features/product/list/search-image/utils";
import { IMAGE_RESULT_LIMIT } from "@/features/product/list/search-image/constants";
import { useTranslation } from "@/lib/hooks";

export interface UseVisualSearchParams {
  imagePreview: string;
  products: ISpuModel[];
  loading: boolean;
  error: unknown;
}

export function useVisualSearch({
  imagePreview,
  products,
  loading,
  error,
}: UseVisualSearchParams) {
      const { t } = useTranslation();

  const [results, setResults] = useState<ISpuModel[]>([]);
  const [visualLoading, setVisualLoading] = useState(false);
  const [visualError, setVisualError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      // 🚫 API chưa xong → không chạy
      if (loading) return;

      // ❌ API lỗi → dừng luôn
      if (error) {
        setResults([]);
        setVisualError(typeof error === "string" ? error : t("search_image_results_error"));
        return;
      }

      if (!imagePreview) {
        setResults([]);
        return;
      }

      if (!products?.length) {
        setResults([]);
        return;
      }

      setVisualLoading(true);
      setVisualError(null);

      try {
        const queryHash = await createAverageHash(imagePreview);

        const scored = (
          await Promise.all(
            products.map(async (product) => {
              if (!product.product_image) return null;

              try {
                const hash = await createAverageHash(product.product_image);
                return {
                  product,
                  score: getHammingDistance(queryHash, hash),
                };
              } catch {
                return null;
              }
            })
          )
        )
          .filter(Boolean)
          .sort((a: any, b: any) => a.score - b.score)
          .slice(0, IMAGE_RESULT_LIMIT)
          .map((item: any) => item.product);

        if (!cancelled) {
          setResults(scored);
        }
      } catch {
        if (!cancelled) {
          setResults([]);
          setVisualError(t("search_image_results_error"));
        }
      } finally {
        if (!cancelled) {
          setVisualLoading(false);
        }
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [imagePreview, products, loading, error, t]);

  return {
    results,
    visualLoading,
    visualError,
  };
}