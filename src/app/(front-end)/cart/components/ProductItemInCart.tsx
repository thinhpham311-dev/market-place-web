'use client'
import { useCallback, memo, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toggleItemSelection, updateItem } from "@/store/cart/stateSlice";
import { Card, CardContent, CardDescription, CardImage, CardTitle, Counter } from "@/components/ui/molecules";
import { Checkbox, Badge, Button, Separator } from "@/components/ui/atoms";
import { OptionsListOfTab } from "./OptionsListOfTab";
import DropdownOptionsList from "./DropdownOptionsList";
import { formatToCurrency } from "@/lib/formats";
import { productData } from "@/constants/data";
import { useToast } from "@/lib/hooks";
import { IOption } from "@/types/product";
import { IcartItem } from "@/types/cart"

interface IProductItemInCartProps {
    item: IcartItem
    totalItems?: number,
};


function ProductItemInCart({ item: { name, image, price, discountPrice, _id, quantity, options = [], uniqueKey }, totalItems }: IProductItemInCartProps) {
    const product = useMemo(() => productData.find((item) => item._id === _id), [_id]);
    const dispatch = useAppDispatch();
    const { toast } = useToast();
    const { selectedItems } = useAppSelector((state) => state.cart.state);
    const [selectedOptions, setSelectedOptions] = useState<(IOption | null)[]>(options);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const router = useRouter();

    const handleChooseOption = useCallback(
        (index: number, selectedValue: IOption | null) => {
            setSelectedOptions((prev) => {
                const updatedOptions = [...prev];
                updatedOptions[index] = selectedValue;

                const errors = options.reduce<string[]>((acc, option, idx) => {
                    if (!updatedOptions[idx]) {
                        acc.push(option.label);
                    }
                    return acc;
                }, []);
                setValidationErrors(errors);

                return updatedOptions;
            });
        },
        [options]
    );

    const handleUpdateItem = useCallback(
        (updates: { options?: (IOption | null)[]; quantity?: number }) => {
            const newQuantity = updates.quantity ?? quantity;
            const newOptions = updates.options ?? options;

            // Nếu không có thay đổi, thoát sớm
            if (newQuantity === quantity && JSON.stringify(newOptions) === JSON.stringify(options)) {
                return;
            }

            dispatch(updateItem({ uniqueKey, quantity: newQuantity, options: newOptions }));
            if (updates.options) {
                toast({
                    title: "Options Updated",
                    description: "The item options have been updated successfully.",
                });
            }
        },
        [dispatch, uniqueKey, quantity, options, toast]
    );

    const handleUpdateOptions = useCallback(() => handleUpdateItem({ options: selectedOptions }), [handleUpdateItem, selectedOptions]);
    const handleUpdateQuantity = useCallback((newQuantity: number) => handleUpdateItem({ quantity: newQuantity }), [handleUpdateItem, quantity]);
    const handleCheckboxChange = useCallback((checked: boolean) => dispatch(toggleItemSelection({ uniqueKey, checked })), [dispatch, uniqueKey]);
    const handleRouterLinkToDetail = useCallback(() => router.push(`/products/${_id}`), [_id, router]);

    return (
        <Card layout="horizontal" className="mb-3 last:mb-0 grid grid-cols-8 gap-5 p-5">
            <CardImage onClick={handleRouterLinkToDetail} src={image ?? "https://res.cloudinary.com/dgincjt1i/image/upload/v1724934297/samples/man-on-a-street.jpg"} alt={name} className="rounded-lg aspect-square bg-slate-600 cursor-pointer p-0 md:col-span-1 col-span-3" />
            <CardContent className="grid grid-cols-12 items-center p-0 h-full md:col-span-7 col-span-5 gap-x-2 relative">
                <div className="md:col-span-5 col-span-12">
                    <CardTitle className="text-lg capitalize cursor-pointer" onClick={handleRouterLinkToDetail}>{name}</CardTitle>
                    {options?.length > 0 && (
                        <div className="space-x-1">
                            {options.map((option, index) => (
                                <Badge variant="outline" key={`${option?.label.split("").join("-")}-${index}`}>{option?.label}</Badge>
                            ))}
                            <DropdownOptionsList btnTitle="Update">
                                {product?.options?.map((item, index) => (
                                    <div key={`${item.label}-${index}`}>
                                        <OptionsListOfTab
                                            onChange={(value) => handleChooseOption(index, value)}
                                            label={item.label}
                                            data={item.value || []}
                                            defaultValue={options[index] || null}
                                        />
                                        {validationErrors.includes(item.label) && <p className="text-red-500 text-xs my-2">{`${item.label} is required.`}</p>}
                                    </div>
                                ))}
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
                    <Counter initialValue={quantity} onQuantityChange={handleUpdateQuantity} />
                </div>
                <div className="md:col-span-3 col-span-12 block">
                    <span className="text-xs font-bold">Price:</span>
                    <CardDescription className="space-x-3 mb-2">
                        <p className="inline-flex items-center gap-x-1 text-xs"> <span className="font-bold">{formatToCurrency(discountPrice)}</span></p>
                        <p className="inline-flex items-center gap-x-1 line-through text-xs"><span>{formatToCurrency(price)}</span></p>
                    </CardDescription>
                </div>
                <div className="col-span-1 flex justify-center absolute top-2 right-2">
                    {totalItems && totalItems > 1 && (
                        <Checkbox id={uniqueKey} checked={selectedItems.includes(uniqueKey)} onCheckedChange={handleCheckboxChange} />
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

export default memo(ProductItemInCart);
