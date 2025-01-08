'use client'
import { useCallback, memo } from "react"
import { useRouter } from "next/navigation"

//stores
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import {
    toggleItemSelection,
    updateItem
} from "@/store/cart/stateSlice"

//components
import {
    Card, CardContent, CardDescription, CardImage, CardTitle, Counter,
} from "@/components/ui/molecules"
import { Checkbox, Badge } from "@/components/ui/atoms"
// import CollapsibleChooseOptions from "./CollapsibleChooseOptions"

//types
import { IcartItem } from "@/types/cart"

//format
import { formatToCurrency } from "@/lib/formats"



interface IProductItemInCartProps {
    item: IcartItem
    totalItems?: number,
};

function ProductItemInCart({ item: { name, image, price, discountPrice, _id, quantity, options = [], uniqueKey }, totalItems }: IProductItemInCartProps) {
    const dispatch = useAppDispatch();
    const { selectedItems } = useAppSelector((state) => state.cart.state); // Giả sử bạn có root state
    const router = useRouter();

    const handleRouterLinkToDetail = () => {
        router.push(`/products/${_id}`);
    };

    const handleCheckboxChange = (uniqueKey: string, checked: boolean) => {
        dispatch(toggleItemSelection({ uniqueKey, checked })); // Sử dụng uniqueKey từ prop
    };

    const handleQuantityChange = useCallback((newQuantity: number) => {
        if (newQuantity >= 0) {
            dispatch(updateItem({ uniqueKey, quantity: newQuantity, options })); // Sử dụng uniqueKey từ prop
        }
    }, [dispatch, options, uniqueKey]);

    return (
        <Card layout="horizontal" className="relative mb-3 last:mb-0 items-start grid grid-cols-3 gap-3">
            <CardImage
                onClick={handleRouterLinkToDetail}
                src={image ?? "https://res.cloudinary.com/dgincjt1i/image/upload/v1724934297/samples/man-on-a-street.jpg"}
                alt=""
                className="rounded-sm bg-slate-600 cursor-pointer p-0 col-span-1 my-2 mx-2"
            />
            <CardContent className="py-2 px-0 h-full col-span-2 content-center space-y-2">
                <CardTitle
                    onClick={handleRouterLinkToDetail}
                    className="text-lg capitalize cursor-pointer">
                    {name}
                </CardTitle>
                <CardDescription className="space-x-2 mb-2 inline">
                    <p className="inline-flex items-center gap-x-1 text-xs">
                        <span className="font-bold">{formatToCurrency(discountPrice)}</span>
                    </p>
                    <p className="inline-flex items-center gap-x-1 line-through text-xs">
                        <span>{formatToCurrency(price)}</span>
                    </p>
                </CardDescription>
                <Counter value={quantity} onQuantityChange={handleQuantityChange} />
                <CardDescription className="gap-1 flex flex-row">
                    {options?.map((option) =>
                        <Badge variant="outline" key={option.label.split("").join("-")}>{option.label}</Badge>
                    )}
                </CardDescription>
            </CardContent>
            {totalItems && totalItems > 1 && (
                <Checkbox
                    id={uniqueKey}
                    checked={selectedItems.includes(uniqueKey)}
                    className="absolute top-3 right-3"
                    onCheckedChange={(checked) => handleCheckboxChange(uniqueKey, Boolean(checked))}
                />
            )}
            {/* <CardFooter className="col-span-8">
                <CollapsibleChooseOptions />
            </CardFooter> */}
        </Card>
    );
}


export default memo(ProductItemInCart)