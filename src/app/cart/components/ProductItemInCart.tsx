'use client'
import { useCallback, memo, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";

//store
import { toggleItemSelection, updateItem, removeItem } from "@/features/cart/store/stateSlice";

//ui
import { Button, Checkbox, Card, CardHeader, CardContent, CardDescription, CardImage, CardTitle } from "@/components/ui";

//components
import ProductItemQuantityInCart, { IProductItemQuantityInCartRef } from "./ProductItemQuantityInCart"
import ProductItemOptionsListInCart, { IProductItemOptionsListInCartRef } from "./ProductItemOptionsListInCart";

//datas
import { productData } from "@/constants/data";

//libs
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useToast } from "@/lib/hooks";
import { formatToCurrency } from "@/lib/formats";

//types
import { IOption } from "@/interfaces/product";
import { IcartItem } from "@/interfaces/cart"

//icons
import { Trash2 } from "lucide-react";

interface IProductItemInCartProps {
    item: IcartItem
    totalItems?: number,
};


function ProductItemInCart({ item: { product_name, image, product_price,
    // discountPrice,
    _id, quantity, options = [], uniqueKey }, totalItems }: IProductItemInCartProps) {
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
        <Card className=" flex justify-center items-center  p-2 gap-x-2 mb-3" layout="horizontal">
            {totalItems && totalItems > 1 && (
                <Checkbox id={uniqueKey} checked={selectedItems.includes(uniqueKey)} onCheckedChange={handleCheckboxChange} />
            )}

            <div className="mb-3 last:mb-0 grid grid-cols-8 gap-2">
                <CardHeader className="p-0 flex flex-row flex-wrap gap-1 md:col-span-1 col-span-3">
                    <CardImage
                        onClick={handleRouterLinkToDetail}
                        src={image ?? "https://res.cloudinary.com/dgincjt1i/image/upload/v1751873400/Image-not-found_qxnjwm.png"}
                        alt=""
                        className="rounded-sm bg-slate-600 cursor-pointer p-0 col-span-1 mb-0 basis-full"
                    />
                    <Button onClick={handleRemoveItem} variant="outline" size="sm" className="w-full text-red-600 hover:text-red-700 md:hidden flex"><Trash2 /><span>Remove</span></Button>
                </CardHeader>

                <CardContent className="grid grid-cols-12 items-center p-0 h-full md:col-span-7 col-span-5 gap-x-2 relative">
                    <div className="md:col-span-4 col-span-12">
                        <CardTitle className="text-lg capitalize cursor-pointer" onClick={handleRouterLinkToDetail}>{product_name}</CardTitle>
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
                    <div className="md:col-span-4 col-span-12 block">
                        <span className="text-xs font-bold">Price:</span>
                        <CardDescription className="flex gap-x-2 mb-2">
                            {/* <p className="inline-flex items-center gap-x-1 text-xs"> <span className="font-bold">{formatToCurrency(discountPrice)}</span></p> */}
                            <p className="inline-flex items-center gap-x-1 line-through text-xs"><span>{formatToCurrency(product_price)}</span></p>
                        </CardDescription>
                    </div>
                    <div className="md:col-span-1 col-span-12 md:block hidden">
                        <Button onClick={handleRemoveItem} variant="outline" size="icon" className="text-red-600 hover:text-red-700"><Trash2 /></Button>
                    </div>
                </CardContent>
            </div>
        </Card>
    );
}

export default memo(ProductItemInCart);
