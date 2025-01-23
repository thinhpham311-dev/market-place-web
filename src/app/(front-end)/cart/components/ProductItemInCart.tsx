'use client'
import { useCallback, memo, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";

//store
import { toggleItemSelection, updateItem, removeItem } from "@/store/cart/stateSlice";

//components
import { Button, Checkbox } from "@/components/ui/atoms";
import { Card, CardContent, CardDescription, CardImage, CardTitle } from "@/components/ui/molecules";
import ProductItemQuantityInCart, { IProductItemQuantityInCartRef } from "./ProductItemQuantityInCart"
import ProductItemOptionsListInCart, { IProductItemOptionsListInCartRef } from "./ProductItemOptionsListInCart";

//datas
import { productData } from "@/constants/data";

//libs
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useToast } from "@/lib/hooks";
import { formatToCurrency } from "@/lib/formats";

//types
import { IOption } from "@/types/product";
import { IcartItem } from "@/types/cart"

//icons
import { Trash2 } from "lucide-react";

interface IProductItemInCartProps {
    item: IcartItem
    totalItems?: number,
};


function ProductItemInCart({ item: { name, image, price, discountPrice, _id, quantity, options = [], uniqueKey }, totalItems }: IProductItemInCartProps) {
    const product = useMemo(() => productData.find((item) => item._id === _id), [_id]);
    const productItemQuantityInCartRef = useRef<IProductItemQuantityInCartRef>(null)
    const productItemOptionsListInCartRef = useRef<IProductItemOptionsListInCartRef>(null)
    const dispatch = useAppDispatch();
    const { toast } = useToast();
    const { selectedItems } = useAppSelector((state) => state.cart.state);
    const router = useRouter();

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

    const handleRemoveItem = useCallback(() => {
        dispatch(removeItem({ uniqueKey }))
    }, [dispatch, uniqueKey])

    const handleCheckboxChange = useCallback((checked: boolean) => dispatch(toggleItemSelection({ uniqueKey, checked })), [dispatch, uniqueKey]);
    const handleRouterLinkToDetail = useCallback(() => router.push(`/products/${_id}`), [_id, router]);

    return (
        <Card layout="horizontal" className="mb-3 last:mb-0 grid grid-cols-8 gap-5 p-5">
            <CardImage onClick={handleRouterLinkToDetail} src={image ?? "https://res.cloudinary.com/dgincjt1i/image/upload/v1724934297/samples/man-on-a-street.jpg"} alt={name} className="rounded-lg aspect-square bg-slate-600 cursor-pointer p-0 md:col-span-1 col-span-3" />
            <CardContent className="grid grid-cols-12 items-center p-0 h-full md:col-span-7 col-span-5 gap-x-2 relative">
                <div className="md:col-span-4 col-span-12">
                    <CardTitle className="text-lg capitalize cursor-pointer" onClick={handleRouterLinkToDetail}>{name}</CardTitle>
                    <ProductItemOptionsListInCart
                        initialOptions={product?.options}
                        activeOptions={options}
                        ref={productItemOptionsListInCartRef}
                        handleUpdate={handleUpdateItem}
                    />
                </div>
                <div className="md:col-span-3 col-span-12">
                    <ProductItemQuantityInCart
                        defaultQuantity={quantity}
                        initialQuantity={product?.quantity}
                        ref={productItemQuantityInCartRef}
                        handleUpdate={handleUpdateItem}
                    />
                </div>
                <div className="md:col-span-2 col-span-12 block">
                    <span className="text-xs font-bold">Price:</span>
                    <CardDescription className="space-x-3 mb-2">
                        <p className="inline-flex items-center gap-x-1 text-xs"> <span className="font-bold">{formatToCurrency(discountPrice)}</span></p>
                        <p className="inline-flex items-center gap-x-1 line-through text-xs"><span>{formatToCurrency(price)}</span></p>
                    </CardDescription>
                </div>
                <div className="md:col-span-2 col-span-12 block">
                    <Button onClick={handleRemoveItem} variant="outline" size="sm" className="text-red-600 hover:text-red-700"><span><Trash2 /></span>Remove</Button>
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
