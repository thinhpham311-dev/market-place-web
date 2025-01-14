'use client'
import { useCallback, memo, useState, useMemo } from "react"
import { useRouter } from "next/navigation"

//stores
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { toggleItemSelection, updateItem } from "@/store/cart/stateSlice"

//components
import { Card, CardContent, CardDescription, CardImage, CardTitle, Counter } from "@/components/ui/molecules"
import { Checkbox, Badge, Button, Separator } from "@/components/ui/atoms"
import { OptionsListOfTab } from "./OptionsListOfTab"
import DropdownOptionsList from "./DropdownOptionsList"

//types
import { IcartItem } from "@/types/cart"
import { IOption } from "@/types/product"

//format
import { formatToCurrency } from "@/lib/formats"

//datas
import { productData } from "@/constants/data"

//hooks
import { useToast } from "@/lib/hooks"

interface IProductItemInCartProps {
    item: IcartItem
    totalItems?: number,
};

function ProductItemInCart({ item: { name, image, price, discountPrice, _id, quantity, options = [], uniqueKey }, totalItems }: IProductItemInCartProps) {
    const dispatch = useAppDispatch();
    const { toast } = useToast();
    const { selectedItems } = useAppSelector((state) => state.cart.state);
    const [selectedOptions, setSelectedOptions] = useState<(IOption | null)[]>(options);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const router = useRouter();

    const product = useMemo(() => {
        return productData?.find((item) => item?._id === _id);
    }, [_id]);

    const handleChooseOption = useCallback((index: number, selectedValue: IOption | null) => {
        if (index < 0 || index >= options.length) {
            return;
        }

        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[index] = selectedValue;

        const newValidationErrors = options.reduce<string[]>((errors, option, idx) => {
            if (!newSelectedOptions[idx]) {
                errors.push(option.label);
            }
            return errors;
        }, []);

        setSelectedOptions(newSelectedOptions);
        setValidationErrors(newValidationErrors);
    }, [options, selectedOptions]);

    const validateOptions = () => {
        return options.map((option, index) => (selectedOptions[index] ? "" : option.label)).filter(Boolean);
    };

    const handleUpdateOptions = useCallback(() => {
        const errors = validateOptions();

        if (errors.length > 0) {
            setValidationErrors(errors);
            toast({
                title: "Missing Options",
                description: `Please select values for: ${errors.join(", ")}`,
            });
            return;
        }

        dispatch(updateItem({ uniqueKey, quantity, options: selectedOptions }));
        toast({
            title: "Options Updated",
            description: "The item options have been updated successfully.",
        });
    }, [dispatch, selectedOptions, quantity, options, uniqueKey, toast]);

    const handleRouterLinkToDetail = useCallback(() => {
        router.push(`/products/${_id}`);
    }, [_id, router]);

    const handleCheckboxChange = useCallback((checked: boolean) => {
        dispatch(toggleItemSelection({ uniqueKey, checked }));
    }, [dispatch, uniqueKey]);

    const handleQuantityChange = useCallback((newQuantity: number) => {
        if (newQuantity >= 0) {
            dispatch(updateItem({ uniqueKey, quantity: newQuantity, options }));
        }
    }, [dispatch, uniqueKey, options]);

    return (
        <Card layout="horizontal" className="mb-3 last:mb-0 items-center grid grid-cols-8 gap-3 p-5">
            <CardImage
                onClick={handleRouterLinkToDetail}
                src={image ?? "https://res.cloudinary.com/dgincjt1i/image/upload/v1724934297/samples/man-on-a-street.jpg"}
                alt={name}
                className="rounded-lg aspect-square bg-slate-600 cursor-pointer p-0 md:col-span-1 col-span-3"
            />
            <CardContent className="grid grid-cols-12 items-center p-0 h-full md:col-span-7 col-span-5 gap-x-2 relative">
                <div className="md:col-span-5 col-span-12">
                    <CardTitle className="text-lg capitalize cursor-pointer" onClick={handleRouterLinkToDetail}>
                        {name}
                    </CardTitle>
                    {options?.length > 0 && (
                        <div className="space-x-1">
                            {options.map((option) => (
                                <Badge variant="outline" key={option.label.split("").join("-")}>{option.label}</Badge>
                            ))}
                            <DropdownOptionsList btnTitle="Update">
                                {product?.options?.map((item, index) => {
                                    const defaultValueForOption = options[index] || null;

                                    return (
                                        <div key={`${item.label}-${index}`}>
                                            <OptionsListOfTab
                                                onChange={(selectedValue) => handleChooseOption(index, selectedValue)}
                                                label={item.label}
                                                data={item.value || []}
                                                defaultValue={defaultValueForOption}
                                            />
                                            {validationErrors.includes(item.label) && (
                                                <p className="text-red-500 text-xs my-2">{`${item.label} is required.`}</p>
                                            )}
                                        </div>
                                    );
                                })}
                                <Separator />
                                <div className="flex justify-end mt-2">
                                    <Button onClick={handleUpdateOptions}>Save Options</Button>
                                </div>
                            </DropdownOptionsList>
                        </div>
                    )}
                </div>
                <div className="md:col-span-3 col-span-12">
                    <span className="text-xs font-bold">Qty:</span>
                    <Counter value={quantity} onQuantityChange={handleQuantityChange} />
                </div>
                <div className="md:col-span-3 col-span-12 block">
                    <span className="text-xs font-bold">Price:</span>
                    <CardDescription className="space-x-3 mb-2">
                        <p className="inline-flex items-center gap-x-1 text-xs"> <span className="font-bold"> {formatToCurrency(discountPrice)}</span></p>
                        <p className="inline-flex items-center gap-x-1 line-through text-xs"><span>{formatToCurrency(price)}</span></p>
                    </CardDescription>
                </div>
                <div className="col-span-1 flex justify-center absolute top-2 right-2">
                    {totalItems && totalItems > 1 && (
                        <Checkbox
                            id={uniqueKey}
                            checked={selectedItems.includes(uniqueKey)}
                            onCheckedChange={(checked) => handleCheckboxChange(Boolean(checked))}
                        />
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

export default memo(ProductItemInCart);
