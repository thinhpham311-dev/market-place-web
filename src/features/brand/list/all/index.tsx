"use client";

import { useState, useMemo, useEffect } from "react";
import SectionSeeMoreButton from "@/components/shared/SectionSeeMoreButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BrandCarousel from "@/features/brand/components/BrandCarousel";
import BrandCard from "@/features/brand/components/BrandCard";
import LoadingSkeleton from "@/features/brand/components/BrandCarousel/LoadingSkeleton";
import { useFetchData } from "@/features/brand/list/all/hooks";
import { useTranslation } from "@/lib/hooks";
import type { TranslationKey } from "@/lib/i18n/translations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Grid3X3, Tag } from "lucide-react";
import type { Brand } from "@/features/brand/types";

interface BrandListSectionProps {
  titleKey?: TranslationKey;
  descriptionKey?: TranslationKey;
  compact?: boolean;
  logoOnly?: boolean;
  showSeeMore?: boolean;
  countLoadItems?: number;
}

export default function BrandListSection({
  titleKey = "featured_brands",
  descriptionKey = "featured_brands_desc",
  compact = false,
  logoOnly = true,
  showSeeMore = true,
  countLoadItems,
}: BrandListSectionProps) {
  const { t } = useTranslation();
  
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");
  const [allCategories, setAllCategories] = useState<any[]>([]);

  // Debounce search input to avoid hitting API on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Construct search/filter parameters for server-side
  const fetchParams = useMemo(() => {
    return {
      search: searchQuery || undefined,
      category_id: selectedCategoryId === "all" ? undefined : selectedCategoryId,
    };
  }, [searchQuery, selectedCategoryId]);

  const { brands = [], loading, error } = useFetchData(compact ? undefined : fetchParams);

  // Capture the full list of categories once initially loaded to preserve filters
  useEffect(() => {
    if (brands.length > 0 && selectedCategoryId === "all" && !searchQuery) {
      setAllCategories(brands);
    }
  }, [brands, selectedCategoryId, searchQuery]);

  const resolvedTitle = t(titleKey);
  const resolvedDescription = t(descriptionKey);
  const resolvedCountLoadItems = countLoadItems ?? (compact ? 6 : 8);

  // 1. Extract and flatten brands for carousel (when compact is true)
  const flattenedBrands = useMemo(() => {
    if (!Array.isArray(brands)) return [];
    const seenIds = new Set<string>();
    const list: Brand[] = [];
    
    for (const category of brands) {
      if (Array.isArray(category.brands)) {
        for (const b of category.brands) {
          const id = b.brand_id || b._id;
          if (id && !seenIds.has(id)) {
            seenIds.add(id);
            list.push({
              ...b,
              logo: b.brand_logo || b.logo,
            });
          }
        }
      }
    }
    return list;
  }, [brands]);

  // 2. Extract categories with brands for filter chips (when compact is false)
  const categoriesWithBrands = useMemo(() => {
    if (!Array.isArray(allCategories)) return [];
    return allCategories.filter(
      (cat: any) => Array.isArray(cat.brands) && cat.brands.length > 0
    );
  }, [allCategories]);

  // 3. Flatten brands dynamically from the filtered server response
  const filteredBrands = useMemo(() => {
    if (!Array.isArray(brands)) return [];
    
    const list: Brand[] = [];
    const seenIds = new Set<string>();
    
    for (const category of brands) {
      if (Array.isArray(category.brands)) {
        for (const b of category.brands) {
          const id = b.brand_id || b._id;
          if (id && !seenIds.has(id)) {
            seenIds.add(id);
            list.push({
              ...b,
              logo: b.brand_logo || b.logo,
            });
          }
        }
      }
    }
    
    return list.sort((a, b) => (a.brand_name || "").localeCompare(b.brand_name || ""));
  }, [brands]);

  const handleResetFilters = () => {
    setSearchInput("");
    setSearchQuery("");
    setSelectedCategoryId("all");
  };

  // --- Render Compact Section (Carousel) ---
  if (compact) {
    return (
      <Card className="relative w-full overflow-hidden rounded-none border-x-0 border-y border-amber-100/70 bg-gradient-to-br from-amber-50 via-orange-50/70 to-rose-50/60 shadow-none dark:border-amber-900/40 dark:from-stone-950 dark:via-stone-900 dark:to-orange-950/30">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.18),_transparent_55%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.12),_transparent_55%)]" />
        <div className="pointer-events-none absolute -right-8 bottom-0 h-28 w-28 rounded-full bg-orange-200/30 blur-3xl dark:bg-orange-700/15" />
        <div className="container mx-auto px-3 md:px-6">
          {!compact || !logoOnly ? (
            <CardHeader className="mb-0 px-0 pt-5 md:pt-6">
              <div className="flex-1">
                <CardTitle className="font-title capitalize">{resolvedTitle}</CardTitle>
                <CardDescription className="mt-3 line-clamp-2">{resolvedDescription}</CardDescription>
              </div>
            </CardHeader>
          ) : null}

          <CardContent className="relative space-y-5 px-0 py-5 md:py-6">
            <BrandCarousel
              itemsPerPage={resolvedCountLoadItems}
              data={flattenedBrands}
              isLoading={loading}
              error={error}
              logoOnly={logoOnly}
            />
            {showSeeMore ? (
              <div className="flex justify-center">
                <SectionSeeMoreButton href="/brands" />
              </div>
            ) : null}
          </CardContent>
        </div>
      </Card>
    );
  }

  // --- Render Full Page (Grid with filters and search) ---
  return (
    <div className="relative w-full min-h-[85vh] overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50/70 to-rose-50/60 py-8 md:py-12 dark:from-stone-950 dark:via-stone-900 dark:to-orange-950/30">
      {/* Decorative ambient blobs */}
      <div className="pointer-events-none absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-amber-200/20 blur-3xl dark:bg-amber-950/10" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-rose-200/20 blur-3xl dark:bg-rose-950/10" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 space-y-8">
        {/* Header / Hero */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-title capitalize bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent dark:from-amber-400 dark:via-orange-400 dark:to-rose-400">
            {resolvedTitle}
          </h1>
          <p className="text-stone-600 dark:text-stone-300 text-sm md:text-base leading-relaxed">
            {resolvedDescription}
          </p>
        </div>

        {/* Filters and Search Bar - Card Wrapper */}
        <Card className="border border-amber-100/50 bg-white/60 backdrop-blur-md dark:border-stone-800 dark:bg-stone-900/60 shadow-xl rounded-2xl p-4 md:p-6 space-y-6">
          {/* Search and Category Filter Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Search Input */}
            <div className="relative md:col-span-2">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400 dark:text-stone-500" />
              <Input
                type="text"
                placeholder={t("search_placeholder") || "Search brands..."}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-11 pr-10 py-6 text-base bg-white/70 dark:bg-stone-950/70 border-stone-200 dark:border-stone-800 rounded-xl focus-visible:ring-amber-500 focus-visible:ring-offset-0"
              />
              {searchInput && (
                <button
                  onClick={() => {
                    setSearchInput("");
                    setSearchQuery("");
                  }}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-stone-400 hover:text-stone-600 dark:text-stone-500 dark:hover:text-stone-300 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Selected Category Summary or quick info */}
            <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400 text-sm px-2">
              <Grid3X3 className="h-4 w-4 text-amber-500" />
              <span>
                Found <strong className="text-stone-800 dark:text-stone-200">{filteredBrands.length}</strong> brands
              </span>
            </div>
          </div>

          {/* Category Chips Container */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-stone-700 dark:text-stone-300">
              <Tag className="h-4 w-4 text-amber-500" />
              <span>{t("categories") || "Categories"}</span>
            </div>
            
            <div className="flex flex-wrap gap-2 max-h-[140px] overflow-y-auto pr-2 custom-scrollbar">
              <Button
                variant={selectedCategoryId === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedCategoryId("all");
                }}
                className={`rounded-full px-4 ${
                  selectedCategoryId === "all"
                    ? "bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-500 dark:hover:bg-amber-600 dark:text-stone-950"
                    : "border-amber-100 hover:bg-amber-50/50 hover:border-amber-300 dark:border-stone-800 dark:hover:bg-stone-800"
                }`}
              >
                {t("all_categories") || "All Categories"}
              </Button>
              {categoriesWithBrands.map((cat: any) => (
                <Button
                  key={cat.category_id}
                  variant={selectedCategoryId === cat.category_id ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setSelectedCategoryId(cat.category_id);
                  }}
                  className={`rounded-full px-4 capitalize ${
                    selectedCategoryId === cat.category_id
                      ? "bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-500 dark:hover:bg-amber-600 dark:text-stone-950"
                      : "border-amber-100 hover:bg-amber-50/50 hover:border-amber-300 dark:border-stone-800 dark:hover:bg-stone-800"
                  }`}
                >
                  {cat.category_name}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Brands Display Grid */}
        <div className="space-y-6">
          {loading ? (
            <div className="bg-white/40 dark:bg-stone-900/40 p-6 rounded-2xl border border-stone-100 dark:border-stone-800/50">
              <LoadingSkeleton count={18} logoOnly={logoOnly} />
            </div>
          ) : error ? (
            <Card className="border-red-200/50 bg-red-50/50 dark:border-red-950/50 dark:bg-red-950/20 p-8 text-center rounded-2xl">
              <p className="text-red-600 dark:text-red-400 font-semibold">{error}</p>
            </Card>
          ) : filteredBrands.length === 0 ? (
            <Card className="bg-white/40 dark:bg-stone-900/40 border border-dashed border-stone-200 dark:border-stone-800 p-12 text-center rounded-2xl flex flex-col items-center justify-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-amber-50 dark:bg-stone-950 flex items-center justify-center">
                <Search className="h-6 w-6 text-amber-500" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200">No brands found</h3>
                <p className="text-stone-500 dark:text-stone-400 text-sm max-w-sm">
                  We couldn't find any brands matching your search query or selected filters. Try adjusting them!
                </p>
              </div>
              <Button
                variant="outline"
                onClick={handleResetFilters}
                className="mt-2 border-amber-500/30 text-amber-600 hover:bg-amber-50 hover:text-amber-700 dark:text-amber-400 dark:hover:bg-amber-950/20"
              >
                Clear all filters
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredBrands.map((brand) => (
                <BrandCard key={brand._id || brand.brand_id} item={brand} logoOnly={logoOnly} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
