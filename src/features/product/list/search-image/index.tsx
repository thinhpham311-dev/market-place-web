"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Camera, Search as SearchIcon } from "lucide-react";

import { useTranslation } from "@/lib/hooks";
import EmptyState from "@/components/shared/feedback/EmptyState";
import ProductListSection from "@/features/product/components/ProductListSection";
import ProGrid from "@/features/product/components/ProGrid";
import ProSearchList from "@/features/product/list/search";
import { apiPostProductsList } from "@/features/product/list/search/services";
import { ISpuModel } from "@/models/spu";
import { SEARCH_IMAGE_SESSION_KEY, IMAGE_RESULT_LIMIT, PRODUCT_SAMPLE_LIMIT } from "@/features/product/list/search-image/constants";
import {ScoredProduct} from "./types"
import { createAverageHash, getHammingDistance } from "@/features/product/list/search-image/utils";


export default function SearchPageContent() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const keyword = useMemo(() => searchParams.get("keyword")?.trim() ?? "", [searchParams]);
  const imageName = useMemo(() => searchParams.get("imageName")?.trim() ?? "", [searchParams]);
  const isImageSearch = searchParams.get("imageSearch") === "1";
  const [imagePreview, setImagePreview] = useState("");
  const [visualResults, setVisualResults] = useState<ISpuModel[]>([]);
  const [visualLoading, setVisualLoading] = useState(false);
  const [visualError, setVisualError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (!isImageSearch) {
      setImagePreview("");
      return;
    }

    setImagePreview(window.sessionStorage.getItem(SEARCH_IMAGE_SESSION_KEY) || "");
  }, [isImageSearch]);

  useEffect(() => {
    let cancelled = false;

    async function runImageSearch() {
      if (!imagePreview) {
        setVisualResults([]);
        return;
      }

      setVisualLoading(true);
      setVisualError(null);

      try {
        const queryHash = await createAverageHash(imagePreview);
        const response = await apiPostProductsList({
          limit: PRODUCT_SAMPLE_LIMIT,
          page: 1,
          search: keyword || undefined,
          sortBy: "ctime",
        } as any);
        const products =
          ((((response as any)?.data as any)?.metadata?.list ?? []) as ISpuModel[]) || [];

        const scoredProducts = (
          await Promise.all(
            products.map(async (product) => {
              try {
                const productHash = await createAverageHash(product.product_image);
                return {
                  product,
                  score: getHammingDistance(queryHash, productHash),
                };
              } catch {
                return null;
              }
            }),
          )
        )
          .filter((item): item is ScoredProduct => item !== null)
          .sort((left, right) => left.score - right.score)
          .slice(0, IMAGE_RESULT_LIMIT)
          .map((item) => item.product);

        if (!cancelled) {
          setVisualResults(scoredProducts);
        }
      } catch {
        if (!cancelled) {
          setVisualResults([]);
          setVisualError(t("search_image_results_error"));
        }
      } finally {
        if (!cancelled) {
          setVisualLoading(false);
        }
      }
    }

    runImageSearch();

    return () => {
      cancelled = true;
    };
  }, [imagePreview, keyword, t]);

  const shouldShowTextResults = keyword.length >= 2;
  const shouldShowVisualSection = isImageSearch;
  const hasSearchInput = shouldShowTextResults || shouldShowVisualSection;

  if (!hasSearchInput) {
    return (
      <div className="container mx-auto my-5">
        <EmptyState message={t("search_empty_state")} />
      </div>
    );
  }

  return (
    <div className="container mx-auto my-5 space-y-6 ">
      <div className="rounded-2xl border-none bg-card px-3 md:px-6 shadow-none">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          {imagePreview ? (
            <Image
              src={imagePreview}
              alt={imageName || t("search_by_image")}
              width={96}
              height={96}
              unoptimized
              className="h-24 w-24 rounded-xl border object-cover"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-xl border bg-muted text-muted-foreground">
              {shouldShowVisualSection ? (
                <Camera className="h-8 w-8" />
              ) : (
                <SearchIcon className="h-8 w-8" />
              )}
            </div>
          )}
          <div className="space-y-2">
            <p className="text-lg font-semibold">{t("search_summary_title")}</p>
            {keyword ? (
              <p className="text-sm text-muted-foreground">
                {t("search_keyword_label")}:{" "}
                <span className="font-medium text-foreground">{keyword}</span>
              </p>
            ) : null}
            {shouldShowVisualSection ? (
              <p className="text-sm text-muted-foreground">
                {t("search_image_label")}:{" "}
                <span className="font-medium text-foreground">
                  {imageName || t("search_image_captured")}
                </span>
              </p>
            ) : null}
          </div>
        </div>
      </div>

      {shouldShowVisualSection ? (
        <ProductListSection
          title={t("search_image_results_title")}
          description={t("search_image_results_desc")}
        >
          <ProGrid
            countLoadItems={IMAGE_RESULT_LIMIT}
            data={visualResults}
            error={visualError}
            isLoading={visualLoading}
            className="lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-3"
          />
        </ProductListSection>
      ) : null}

      {shouldShowTextResults ? <ProSearchList keyword={keyword} /> : null}
    </div>
  );
}
