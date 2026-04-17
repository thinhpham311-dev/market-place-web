"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

//ui
import { Button } from "@/components/ui/button";

//components
import { FormGroup, FormSelect, FormInput } from "@/components/shared";

//icons
import { Camera, Search } from "lucide-react";

//libs
import { z } from "zod";
import { useTranslation } from "@/lib/hooks";
import { SEARCH_SESSION_KEY } from "@/constants/app/app.constant";

type SearchFormProps = {
  showCategorySelect?: boolean;
};

const SearchForm: React.FC<SearchFormProps> = ({ showCategorySelect = false }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [isMacLikeDevice, setIsMacLikeDevice] = useState(false);
  const categoriesOptions = [
    { name: t("search_scope_marketplace"), value: "in-market-place" },
    { name: t("search_scope_shop"), value: "in-this-shop" },
  ];
  const categoryValues = categoriesOptions.map((option) => option.value) as [string, ...string[]];
  const FormSchema = z.object({
    ...(showCategorySelect
      ? {
          categories: z.enum(categoryValues, {
            errorMap: () => ({ message: t("validation_choose_valid_search_scope") }),
          }),
        }
      : {}),
    textsearch: z
      .string()
      .trim()
      .min(2, t("validation_enter_at_least_2_characters"))
      .max(100, t("validation_enter_no_more_than_100_characters")),
  });
  const defaultValuesForSearchForm = {
    ...(showCategorySelect ? { categories: "in-market-place" } : {}),
    textsearch: "",
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const navigatorWithUserAgentData = window.navigator as Navigator & {
      userAgentData?: { platform?: string };
    };
    const platform =
      navigatorWithUserAgentData.userAgentData?.platform ??
      window.navigator.platform ??
      window.navigator.userAgent;

    setIsMacLikeDevice(/Mac|iPhone|iPad|iPod/i.test(platform));
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== "k") {
        return;
      }

      const activeElement = document.activeElement;
      const isTypingTarget =
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        activeElement instanceof HTMLSelectElement ||
        (activeElement instanceof HTMLElement && activeElement.isContentEditable);

      if (isTypingTarget && activeElement === searchInputRef.current) {
        return;
      }

      event.preventDefault();
      searchInputRef.current?.focus();
      searchInputRef.current?.select();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const shortcutLabel = isMacLikeDevice ? "\u2318K" : "Ctrl K";

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    const params = new URLSearchParams();
    const keyword = values.textsearch.trim();

    if (keyword) {
      params.set("keyword", keyword);
    }

    if (showCategorySelect && typeof values.categories === "string") {
      params.set("scope", values.categories);
    }

    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(SEARCH_SESSION_KEY);
    }

    router.push(`/search?${params.toString()}`);
  };

  const handleSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== "string" || typeof window === "undefined") {
        return;
      }

      window.sessionStorage.setItem(SEARCH_SESSION_KEY, reader.result);

      const params = new URLSearchParams();
      params.set("imageSearch", "1");
      params.set("imageName", file.name);

      if (showCategorySelect) {
        params.set("scope", pathname?.startsWith("/shop/") ? "in-this-shop" : "in-market-place");
      }

      router.push(`/search?${params.toString()}`);
    };

    reader.readAsDataURL(file);
    event.target.value = "";
  };

  return (
    <FormGroup
      defaultValues={defaultValuesForSearchForm}
      onHandleSubmit={onSubmit}
      className="flex flex-row w-full items-center justify-between space-x-2"
      formSchema={FormSchema}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleSelectImage}
      />
      <div className="grid grid-cols-12 gap-x-2 flex-1">
        <FormInput
          className={
            showCategorySelect
              ? "xl:col-span-9 lg:col-span-8 md:col-span-7 col-span-12"
              : "col-span-12"
          }
          name="textsearch"
          placeholder={t("search_placeholder")}
          inputClassName="pr-20"
          inputRef={searchInputRef}
          endAdornment={
            <div className="pointer-events-none absolute inset-y-0 right-3 hidden items-center sm:flex">
              <span className="rounded-md border border-stone-200 bg-stone-50 px-2 py-1 text-[11px] font-medium uppercase tracking-wide text-stone-500 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-400">
                {shortcutLabel}
              </span>
            </div>
          }
          formSchema={FormSchema}
          isRequired
        />
        {showCategorySelect && (
          <FormSelect
            className="xl:col-span-3 lg:col-span-4 md:col-span-5 col-span-12"
            name="categories"
            placeholder={t("search_scope_placeholder")}
            options={categoriesOptions}
            formSchema={FormSchema}
            isRequired
          />
        )}
      </div>
      <div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            aria-label={t("search_by_image")}
            title={t("search_by_image")}
          >
            <Camera />
          </Button>
          <Button type="submit" variant="outline" size="icon">
            <Search />
          </Button>
        </div>
      </div>
    </FormGroup>
  );
};

export default SearchForm;
