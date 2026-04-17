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
import { useFetchData, useVisualSearch } from "@/features/product/list/search-image/hooks";

import {
  IMAGE_RESULT_LIMIT,
  PRO_SEARCH_IMAGE_LIST,
} from "@/features/product/list/search-image/constants";

import { SEARCH_IMAGE_SESSION_KEY } from "@/constants/app/app.constant";

export default function SearchPageContent() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();

  const keyword = useMemo(
    () => searchParams.get("keyword")?.trim() ?? "",
    [searchParams]
  );

  const imageName = useMemo(
    () => searchParams.get("imageName")?.trim() ?? "",
    [searchParams]
  );

  const isImageSearch = searchParams.get("imageSearch") === "1";

  const [imagePreview, setImagePreview] = useState("");

  const { products, loading, error } = useFetchData({
    keyword,
    storeKey: PRO_SEARCH_IMAGE_LIST,
  });

  /**
   * Load image preview
   */
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!isImageSearch) {
      setImagePreview("");
      return;
    }

    const stored = window.sessionStorage.getItem(
      SEARCH_IMAGE_SESSION_KEY
    );

    setImagePreview(stored || "");
  }, [isImageSearch]);

  /**
   * Visual search hook
   */
  const {
    results: visualResults,
    visualLoading,
    visualError,
  } = useVisualSearch({
    imagePreview,
    products,
    loading,
    error
  });

  /**
   * Merge states
   */
  const finalLoading = loading || visualLoading;
  const finalError =
    (typeof error === "string" ? error : null) || visualError;

  /**
   * Conditions
   */
  const shouldShowTextResults = keyword.length >= 2;
  const shouldShowVisualSection = isImageSearch;
  const hasSearchInput =
    shouldShowTextResults || shouldShowVisualSection;

  /**
   * Empty
   */
  if (!hasSearchInput) {
    return (
      <div className="container mx-auto my-5">
        <EmptyState message={t("search_empty_state")} />
      </div>
    );
  }

  /**
   * Missing image
   */
  if (shouldShowVisualSection && !imagePreview) {
    return (
      <div className="container mx-auto my-5">
        <EmptyState message={t("search_image_missing")} />
      </div>
    );
  }

  return (
    <div className="container mx-auto my-5 space-y-6">
      {/* Summary */}
      <div className="rounded-2xl bg-card px-3 md:px-6">
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
            <p className="text-lg font-semibold">
              {t("search_summary_title")}
            </p>

            {keyword && (
              <p className="text-sm text-muted-foreground">
                {t("search_keyword_label")}:{" "}
                <span className="font-medium text-foreground">
                  {keyword}
                </span>
              </p>
            )}

            {shouldShowVisualSection && (
              <p className="text-sm text-muted-foreground">
                {t("search_image_label")}:{" "}
                <span className="font-medium text-foreground">
                  {imageName || t("search_image_captured")}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Visual */}
      {shouldShowVisualSection && (
        <ProductListSection
          title={t("search_image_results_title")}
          description={t("search_image_results_desc")}
        >
          <ProGrid
            countLoadItems={IMAGE_RESULT_LIMIT}
            data={visualResults}
            error={finalError}
            isLoading={finalLoading}
            className="lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-3"
          />
        </ProductListSection>
      )}

      {/* Text */}
      {shouldShowTextResults && (
        <ProSearchList keyword={keyword} />
      )}
    </div>
  );
}