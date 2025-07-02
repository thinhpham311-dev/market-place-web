import React from 'react';
import { Button } from "@/components/ui/atoms";
import { FormGroup, FormSelect, FormInput } from "@/components/ui/organisms"
import { Search } from "lucide-react";
import { z } from "zod";

const categoriesOptions = [
    { name: "laptop", value: "laptop" },
    { name: "mobile", value: "mobile" }
];

const defaultValuesForSearchForm = { categories: "", textsearch: "" };

const FormSchema = z.object({
    categories: z.string(),
    textsearch: z.string()
});

const FormSearch: React.FC = () => {
    const onSubmit = (values: z.infer<typeof FormSchema>) => {
        console.log(values);
    };

    return (
        <FormGroup
            defaultValues={defaultValuesForSearchForm}
            onHandleSubmit={onSubmit}
            className="flex flex-row items-center space-x-2 w-full flex-1 justify-between"
            formSchema={FormSchema}
        >
            <FormSelect className="flex-none" name="categories" placeholder="All" options={categoriesOptions} formSchema={FormSchema} />
            <FormInput className="grow flex-1" name="textsearch" placeholder="Search..." formSchema={FormSchema} />
            <Button className="flex-none" type="submit" variant="outline" size="icon"><Search /></Button>
        </FormGroup>
    );
};

export default FormSearch;
