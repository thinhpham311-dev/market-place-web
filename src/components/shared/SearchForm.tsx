import React from "react";

//ui
import { Button } from "@/components/ui/button";

//components
import { FormGroup, FormSelect, FormInput } from "@/components/shared";

//icons
import { Search } from "lucide-react";

//libs
import { z } from "zod";

const categoriesOptions = [
  { name: "In Market Place", value: "in-market-place" },
  { name: "In This Shop", value: "in-this-shop" },
];

// chỉnh defaultValues để có sẵn giá trị mặc định
const defaultValuesForSearchForm = {
  categories: "in-market-place",
  textsearch: "",
};

const FormSchema = z.object({
  categories: z.string(),
  textsearch: z.string(),
});

const SearchForm: React.FC = () => {
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
          placeholder="Search..."
          formSchema={FormSchema}
        />
        <FormSelect
          className="xl:col-span-3 lg:col-span-4 md:col-span-5 col-span-12"
          name="categories"
          placeholder="All"
          options={categoriesOptions}
          formSchema={FormSchema}
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
