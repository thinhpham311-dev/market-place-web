"use client";

import React from "react";

//ui
import { Button } from "@/components/ui/button";

//components
import { FormGroup, FormSelect, FormInput } from "@/components/shared";

//icons
import { Search } from "lucide-react";

//libs
import { z } from "zod";
import { useTranslation } from "@/lib/hooks";

const defaultValuesForSearchForm = {
  categories: "in-market-place",
  textsearch: "",
};

const SearchForm: React.FC = () => {
  const { t } = useTranslation();
  const categoriesOptions = [
    { name: t("search_scope_marketplace"), value: "in-market-place" },
    { name: t("search_scope_shop"), value: "in-this-shop" },
  ];
  const categoryValues = categoriesOptions.map((option) => option.value) as [string, ...string[]];
  const FormSchema = z.object({
    categories: z.enum(categoryValues, {
      errorMap: () => ({ message: t("validation_choose_valid_search_scope") }),
    }),
    textsearch: z
      .string()
      .trim()
      .min(2, t("validation_enter_at_least_2_characters"))
      .max(100, t("validation_enter_no_more_than_100_characters")),
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log(values);
  };

  return (
    <FormGroup
      defaultValues={defaultValuesForSearchForm}
      onHandleSubmit={onSubmit}
      className="flex flex-row w-full items-center justify-between space-x-2"
      formSchema={FormSchema}
    >
      <div className="grid grid-cols-12 gap-x-2 flex-1">
        <FormInput
          className="xl:col-span-9 lg:col-span-8 md:col-span-7 col-span-12"
          name="textsearch"
          placeholder={t("search_placeholder")}
          formSchema={FormSchema}
          isRequired
        />
        <FormSelect
          className="xl:col-span-3 lg:col-span-4 md:col-span-5 col-span-12"
          name="categories"
          placeholder={t("search_scope_placeholder")}
          options={categoriesOptions}
          formSchema={FormSchema}
          isRequired
        />
      </div>
      <div>
        <Button type="submit" variant="outline" size="icon">
          <Search />
        </Button>
      </div>
    </FormGroup>
  );
};

export default SearchForm;
