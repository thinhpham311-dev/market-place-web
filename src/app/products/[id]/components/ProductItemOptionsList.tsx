"use client"
import * as React from "react"
import { memo } from "react"

//components
import { OptionsListOfTab } from "./OptionsListOfTab"

//types
import { IOption } from "@/types/product"


//libs
import { PropertiesValidate } from "@/lib/handleError"

interface IProductItemOptionsListProps {
    options?: Array<IOption>
}

export interface IProductItemOptionsListRef {
    validateOptions: () => void,
    selectedOptions: (IOption | null)[]
    validationErrors?: string[]
}

const ProductItemOptionsList = React.forwardRef<IProductItemOptionsListRef, IProductItemOptionsListProps>(({ options }, ref) => {
    // State to store selected options
    const [validationErrors, setValidationErrors] = React.useState<string[]>([]);
    const [selectedOptions, setSelectedOptions] = React.useState<(IOption | null)[]>([]);
    const handleChooseOption = (index: number, selectedValue: IOption | null) => {
        if (!options) {
            return; // Thoát nếu không có options
        }

        // Cập nhật tùy chọn đã chọn
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[index] = selectedValue;

        // Tạo danh sách lỗi mới chỉ với những tùy chọn chưa được chọn
        const newValidationErrors = options?.map((option, idx) => {
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
            options || [],
            (option, index) => (selectedOptions[index] ? null : `The option ${option.label} is not selected`)
        );
    };

    React.useImperativeHandle(ref, () => ({
        validateOptions,
        selectedOptions,
        validationErrors
    }));

    return (
        <div className='space-y-5'>
            {options?.map((item, index) => {
                if (Array.isArray(item.value)) {
                    return (
                        <div key={index}>
                            <OptionsListOfTab
                                label={item.label}
                                data={item.value}
                                onChange={(selectedValue) => handleChooseOption(index, selectedValue)}
                            />
                            {validationErrors.includes(item.label) && (
                                <p className="text-red-500 text-xs my-2">{`${item.label} is required.`}</p>
                            )}
                        </div>
                    );
                }
                return null;
            })}
        </div>
    );
})


export default memo(ProductItemOptionsList)