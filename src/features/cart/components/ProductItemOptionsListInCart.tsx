'use client'
import * as React from "react";

//components
import { Badge, Button, Separator } from "@/components/ui";
import OptionsListOfTab from "./OptionsListOfTab";
import DropdownOptionsList from "./DropdownOptionsList";

//types
import { IOption } from "@/interfaces/product";

//libs
import { useToast } from "@/lib/hooks";
import { PropertiesValidate } from "@/lib/handleError"


interface IProductItemOptionsListInCartProps {
    activeOptions?: Array<IOption>
    initialOptions?: Array<IOption>
    handleUpdate: (updates: { options?: (IOption | null)[]; newQuantity?: number; }) => void
};

export interface IProductItemOptionsListInCartRef {
    validateOptions: () => void
}

const ProductItemOptionsListInCart = React.forwardRef<IProductItemOptionsListInCartRef, IProductItemOptionsListInCartProps>(({ activeOptions = [], initialOptions = [], handleUpdate }, ref) => {
    const { toast } = useToast()
    const [validationErrors, setValidationErrors] = React.useState<string[]>([]);
    const [selectedOptions, setSelectedOptions] = React.useState<(IOption | null)[]>(activeOptions);

    const handleChooseOption = (index: number, selectedValue: IOption | null) => {
        if (!activeOptions) {
            return; // Thoát nếu không có options
        }

        // Cập nhật tùy chọn đã chọn
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[index] = selectedValue;

        // Tạo danh sách lỗi mới chỉ với những tùy chọn chưa được chọn
        const newValidationErrors = activeOptions?.map((option, idx) => {
            // Nếu tùy chọn chưa được chọn, thêm lỗi vào danh sách
            if (!newSelectedOptions[idx]) {
                return option.label;
            }
            return null;
        })
            .filter(Boolean) as string[]; // Loại bỏ giá trị null hoặc undefined

        // Cập nhật lại các trạng thái
        setSelectedOptions(newSelectedOptions);
        setValidationErrors(newValidationErrors);
    };

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
                                {validationErrors.includes(item.label) && (
                                    <p className="text-red-500 text-xs my-2">{`${item.label} is required.`}</p>
                                )}
                            </div>
                        ))}
                        <Separator />
                        <div className="flex justify-end mt-2">
                            <Button onClick={handleUpdateOptions}>Save Options</Button>
                        </div>
                    </DropdownOptionsList>
                </div>
            )}
        </>
    );
})

export default React.memo(ProductItemOptionsListInCart);
