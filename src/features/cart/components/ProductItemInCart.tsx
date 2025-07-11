import { useCallback, memo, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";

//ui
import { Button, Checkbox, Card, CardContent, CardDescription, CardHeader, CardImage, CardTitle } from "@/components/ui";

//components
import ProductItemOptionsListInCart, { IProductItemOptionsListInCartRef } from "./ProductItemOptionsListInCart"
import ProductItemQuantityInCart, { IProductItemQuantityInCartRef } from "./ProductItemQuantityInCart";

//actions
import { removeItem } from "@/store/cart/stateSlice"
import { toggleItemSelection, updateItem } from "@/store/cart/stateSlice";

//libs
import { useAppDispatch, useAppSelector, useToast } from "@/lib/hooks";
import { formatToCurrency } from "@/lib/formats";

//types
import { IcartItem } from "@/interfaces/cart";
import { IOption } from "@/interfaces/product"

//datas
import { productData } from "@/constants/data";

//icons
import { Trash2 } from "lucide-react";

interface IProductItemInCartProps {
    item: IcartItem;
    totalItems?: number;
}

function ProductItemInCart({ item: { product_name, image, product_price,
    // discountPrice,
    _id, quantity, options = [], uniqueKey }, totalItems }: IProductItemInCartProps) {
    const { toast } = useToast()
    const dispatch = useAppDispatch();
    const product = useMemo(() => productData.find((item) => item._id === _id), [_id]);
    const productItemQuantityInCartRef = useRef<IProductItemQuantityInCartRef>(null)
    const productItemOptionsListInCartRef = useRef<IProductItemOptionsListInCartRef>(null)
    const { selectedItems } = useAppSelector((state) => state.cart.state);
    const router = useRouter();

    const handleRouterLinkToDetail = useCallback(() => {
        router.push(`/products/${_id}`);
    }, [router, _id]);

    const handleCheckboxChange = useCallback(
        (checked: boolean) => {
            dispatch(toggleItemSelection({ uniqueKey, checked }));
        },
        [dispatch, uniqueKey]
    );

    const handleUpdateItem = useCallback(
        (updates: { options?: (IOption | null)[]; quantity?: number }) => {
            const newQuantity = updates.quantity ?? quantity;
            const newOptions = updates.options ?? options;
            console.log(newQuantity)
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

    return (
        <Card layout="horizontal" className=" flex justify-center items-center  p-2 gap-x-2  mb-3">
            {totalItems && totalItems > 1 && (
                <Checkbox id={uniqueKey} checked={selectedItems.includes(uniqueKey)} onCheckedChange={handleCheckboxChange} />
            )}
            <div className="relative last:mb-0 items-start grid grid-cols-8 gap-3">
                <CardHeader className="p-0 flex flex-row flex-wrap gap-1 md:col-span-3 col-span-3">
                    <CardImage
                        onClick={handleRouterLinkToDetail}
                        src={image ?? "https://res.cloudinary.com/dgincjt1i/image/upload/v1751873400/Image-not-found_qxnjwm.png"}
                        alt=""
                        className="rounded-sm bg-slate-600 cursor-pointer p-0 col-span-1 mb-0 basis-full"
                    />
                    <Button onClick={handleRemoveItem} variant="outline" size="sm" className="w-full text-red-600 hover:text-red-700"><span><Trash2 /></span>Remove</Button>
                </CardHeader>
                <CardContent className="flex flex-col p-0 h-full md:col-span-5 col-span-5 content-center space-y-2">
                    <CardTitle onClick={handleRouterLinkToDetail} className="text-lg capitalize cursor-pointer">
                        {product_name}
                    </CardTitle>
                    <ProductItemOptionsListInCart
                        initialOptions={product?.options}
                        activeOptions={options}
                        ref={productItemOptionsListInCartRef}
                        handleUpdate={handleUpdateItem}
                    />
                    <CardDescription className="space-x-2 mb-2 inline">
                        {/* <p className="inline-flex items-center gap-x-1 text-xs">
                            <span className="font-bold">{formatToCurrency(discountPrice)}</span>
                        </p> */}
                        <p className="inline-flex items-center gap-x-1 line-through text-xs">
                            <span>{formatToCurrency(product_price)}</span>
                        </p>
                    </CardDescription>
                    <ProductItemQuantityInCart
                        ref={productItemQuantityInCartRef}
                        handleUpdate={handleUpdateItem}
                        initialQuantity={product?.quantity}
                        defaultQuantity={quantity} />
                </CardContent>
            </div>
        </Card>
    );
}

export default memo(ProductItemInCart);
