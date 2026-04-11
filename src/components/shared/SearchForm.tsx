"use client";

import React, { useRef } from "react";
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
import { SEARCH_IMAGE_SESSION_KEY } from "@/features/search/constants";

type SearchFormProps = {
  showCategorySelect?: boolean;
};

const SearchForm: React.FC<SearchFormProps> = ({ showCategorySelect = false }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
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

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    const params = new URLSearchParams();
    params.set("keyword", values.textsearch.trim());

    if (showCategorySelect && values.categories) {
      params.set("scope", values.categories);
    }

    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(SEARCH_IMAGE_SESSION_KEY);
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

      window.sessionStorage.setItem(SEARCH_IMAGE_SESSION_KEY, reader.result);

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
          className={showCategorySelect ? "xl:col-span-9 lg:col-span-8 md:col-span-7 col-span-12" : "col-span-12"}
          name="textsearch"
          placeholder={t("search_placeholder")}
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
