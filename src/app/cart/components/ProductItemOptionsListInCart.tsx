'use client'
import * as React from "react";

//components
import { Badge, Button, Separator } from "@/components/ui/atoms";
import { OptionsListOfTab } from "./OptionsListOfTab";
import DropdownOptionsList from "./DropdownOptionsList";

//types
import { IOption } from "@/interfaces/product";

//libs
import { useToast } from "@/lib/hooks";
import { PropertiesValidate } from "@/lib/handleError"


interface IProductItemOptionsListInCartProps {
    activeOptions?: Array<IOption>
    initialOptions?: Array<IOption>
    handleUpdate: (updates: { options?: (IOption | null)[]; quantity?: number; }) => void
};

export interface IProductItemOptionsListInCartRef {
    validateOptions: () => void
}

const ProductItemOptionsListInCart = React.forwardRef<IProductItemOptionsListInCartRef, IProductItemOptionsListInCartProps>(({ activeOptions = [], initialOptions = [], handleUpdate }, ref) => {

    const { toast } = useToast()
    const [selectedOptions, setSelectedOptions] = React.useState<(IOption | null)[]>(activeOptions);

    const handleChooseOption = React.useCallback(
        (index: number, selectedValue: IOption | null) => {
            setSelectedOptions((prev) => {
                const updatedOptions = [...prev];
                updatedOptions[index] = selectedValue;

                return updatedOptions;
            });
        },
        [activeOptions]
    );

    const validateOptions = () => {
        return PropertiesValidate(
            activeOptions || [],
            (option, index) => (selectedOptions[index] ? null : `The option ${option.label} is not selected`)
        );
    };

    const handleUpdateOptions = React.useCallback(() => {
        const errors = validateOptions();

        if (errors.length > 0) {
            toast({
                title: "Error",
                description: `Please select a value for: ${errors.join(", ")}`,
                variant: "destructive",
            });
            return;
        }
        handleUpdate({ options: selectedOptions })
    }, [handleUpdate, selectedOptions]);

    React.useImperativeHandle(ref, () => ({
        validateOptions
    }));

    return (
        <>
            {activeOptions?.length > 0 && (
                <div className="space-x-1">

                    <DropdownOptionsList btnTitle={
                        <>
                            {activeOptions?.map((option, index) => (
                                <Badge variant="outline" key={`${option?.label.split("").join("-")}-${index}`}>{option?.label}</Badge>
                            ))}
                        </>

                    }>
                        {initialOptions?.map((item, index) => (
                            <div key={`${item?.label}-${index}`}>
                                <OptionsListOfTab
                                    onChange={(value) => handleChooseOption(index, value)}
                                    label={item?.label}
                                    data={Array.isArray(item.value) ? item.value : []} // Ensure data is an array
                                    defaultValue={selectedOptions[index] || null} // Align defaultValue with selectedOptions
                                />
                            </div>
                        ))}
                        <Separator />
                        <div className="flex justify-end mt-2">
                            <Button onClick={handleUpdateOptions}>Save Options</Button>
                        </div>
                    </DropdownOptionsList>
                </div >
            )}
        </>
    );
})

export default React.memo(ProductItemOptionsListInCart);
