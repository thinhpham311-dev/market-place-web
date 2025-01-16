import { useCallback, memo } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toggleItemSelection, updateItem } from "@/store/cart/stateSlice";
import {
    Card, CardContent, CardDescription, CardImage, CardTitle, Counter,
} from "@/components/ui/molecules";
import { Checkbox, Badge } from "@/components/ui/atoms";
import { formatToCurrency } from "@/lib/formats";
import { IcartItem } from "@/types/cart";

interface IProductItemInCartProps {
    item: IcartItem;
    totalItems?: number;
}

function ProductItemInCart({ item: { name, image, price, discountPrice, _id, quantity, options = [], uniqueKey }, totalItems }: IProductItemInCartProps) {
    const dispatch = useAppDispatch();
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

    const handleChange = useCallback(
        (newQuantity: number) => {
            if (newQuantity >= 0 && newQuantity !== quantity) {
                dispatch(updateItem({ uniqueKey, quantity: newQuantity, options }));
            }
        },
        [dispatch, uniqueKey, options, quantity] // Ensure dependencies include the current `quantity`.
    );

    return (
        <Card layout="horizontal" className="relative mb-3 last:mb-0 items-start grid grid-cols-3 gap-3">
            <CardImage
                onClick={handleRouterLinkToDetail}
                src={image ?? "https://res.cloudinary.com/dgincjt1i/image/upload/v1724934297/samples/man-on-a-street.jpg"}
                alt=""
                className="rounded-sm bg-slate-600 cursor-pointer p-0 col-span-1 my-2 mx-2"
            />
            <CardContent className="py-2 px-0 h-full col-span-2 content-center space-y-2">
                <CardTitle onClick={handleRouterLinkToDetail} className="text-lg capitalize cursor-pointer">
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
                <Counter value={quantity} onQuantityChange={handleChange} />
                <CardDescription className="gap-1 flex flex-row">
                    {options.map((option, index) => (
                        <Badge variant="outline" key={`${option?.label.split("").join("-")}-${index}`}>{option?.label}</Badge>
                    ))}
                </CardDescription>
            </CardContent>
            {totalItems && totalItems > 1 && (
                <Checkbox
                    id={uniqueKey}
                    checked={selectedItems.includes(uniqueKey)}
                    className="absolute top-3 right-3"
                    onCheckedChange={handleCheckboxChange}
                />
            )}
        </Card>
    );
}

export default memo(ProductItemInCart);
