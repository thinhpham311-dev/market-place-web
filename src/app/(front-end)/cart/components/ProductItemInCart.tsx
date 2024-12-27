'use client'
import { useCallback, memo } from "react"
import { useRouter } from "next/navigation"

//stores
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { toggleItemSelection, updateItemQuantity } from "@/store/cart/stateSlice"

//components
import { Card, CardContent, CardDescription, CardImage, CardTitle, Counter } from "@/components/ui/molecules"
import { Checkbox } from "@/components/ui/atoms/checkbox"

//types
import { IcartItem } from "@/types/cart"

//format
import { formatToCurrency } from "@/lib/formats"

interface IProductItemInCartProps {
    item: IcartItem
    totalItems?: number,
};


function ProductItemInCart({ item: { name, image, price, discountPrice, id, quantity }, totalItems }: IProductItemInCartProps) {
    const dispatch = useAppDispatch()
    const { selectedItems } = useAppSelector((state) => state.cart.state); // Giả sử bạn có root state
    const router = useRouter()

    const handleRouterLinkToDetail = () => {
        router.push(`/products/${id}`)
    }

    const handleCheckboxChange = (id: string, checked: boolean) => {
        dispatch(toggleItemSelection({ id, checked }))
    };

    const handleQuantityChange = useCallback((newQuantity: number) => {
        if (newQuantity >= 0) {
            dispatch(updateItemQuantity({ id, quantity: newQuantity }));
        }
    }, [dispatch]);

    return (
        <Card layout="horizontal" className=" mb-3  last:mb-0 items-center grid grid-cols-8 gap-3 p-5">
            <CardImage
                onClick={handleRouterLinkToDetail}
                src={image ?? "https://res.cloudinary.com/dgincjt1i/image/upload/v1724934297/samples/man-on-a-street.jpg"}
                alt=""

                className=" rounded-lg h-full bg-slate-600 cursor-pointer p-0 col-span-1"
            />
            <CardContent className="grid grid-cols-12 items-center p-0  h-full col-span-7  space-y-2 ">
                <CardTitle
                    onClick={handleRouterLinkToDetail}
                    className=" text-lg capitalize cursor-pointer col-span-5">
                    {name}
                </CardTitle>
                <div className="py-3 col-span-3"><Counter value={quantity} onQuantityChange={handleQuantityChange} /></div>
                <CardDescription className="space-x-3 mb-2 inline col-span-3">
                    <p className="inline-flex items-center gap-x-1 text-xs"> <span className="font-bold "> {formatToCurrency(discountPrice)}</span></p>
                    <p className="inline-flex items-center gap-x-1 line-through text-xs"><span>{formatToCurrency(price)}</span></p>
                </CardDescription>
                <div className="col-span-1 flex  justify-center">
                    {
                        totalItems && totalItems > 1 &&
                        <Checkbox
                            id={id}
                            checked={selectedItems.includes(id)}
                            onCheckedChange={(checked) => handleCheckboxChange(id, Boolean(checked))}
                        />
                    }
                </div>
            </CardContent>
        </Card>
    );
}

export default memo(ProductItemInCart)