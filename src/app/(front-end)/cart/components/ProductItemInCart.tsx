'use client'
import { useCallback, memo, useMemo } from "react"
import { useRouter } from "next/navigation"

//stores
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { toggleItemSelection, updateItem } from "@/store/cart/stateSlice"

//components
import { Card, CardContent, CardDescription, CardImage, CardTitle, Counter } from "@/components/ui/molecules"
import { Checkbox, Badge } from "@/components/ui/atoms"
import { OptionsListOfTab } from "./OptionsListOfTab"
import DropdownOptionsList from "./DropdownOptionsList"

//types
import { IcartItem } from "@/types/cart"
import { IProduct } from "@/types/product"

//format
import { formatToCurrency } from "@/lib/formats"

//datas
import { productData } from "@/constants/data"

interface IProductItemInCartProps {
    item: IcartItem
    totalItems?: number,
};


function ProductItemInCart({ item: { name, image, price, discountPrice, _id, quantity, options = [], uniqueKey }, totalItems }: IProductItemInCartProps) {
    const dispatch = useAppDispatch()
    const { selectedItems } = useAppSelector((state) => state.cart.state); // Giả sử bạn có root state
    const router = useRouter()

    const { product } = useMemo(() => {
        const product: IProduct | undefined = productData?.find((item) => item?._id === _id);
        return { product };
    }, [_id]);

    const handleRouterLinkToDetail = () => {
        router.push(`/products/${_id}`)
    }

    const handleCheckboxChange = (uniqueKey: string, checked: boolean) => {
        dispatch(toggleItemSelection({ uniqueKey, checked }))
    };

    const handleQuantityChange = useCallback((newQuantity: number) => {
        if (newQuantity >= 0) {
            dispatch(updateItem({ uniqueKey, quantity: newQuantity, options }));
        }
    }, [dispatch, uniqueKey]);

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
                    <p>
                        {name}
                    </p>
                    <div className="space-x-1">

                        {options?.map((option) =>
                            <Badge variant="outline" key={option.label.split("").join("-")}>{option.label}</Badge>
                        )}
                        <DropdownOptionsList btnTitle="Update" >
                            {product?.options?.map((item) => (
                                <OptionsListOfTab key={item.label} label={item.label} data={item.value || []} />
                            ))}
                        </DropdownOptionsList>
                    </div>
                </CardTitle>
                <div className="py-3 col-span-3">
                    <span className="text-xs font-bold">Qty:</span>
                    <Counter value={quantity} onQuantityChange={handleQuantityChange} />
                </div>
                <div className="col-span-3 block">
                    <span className="text-xs font-bold">Price:</span>
                    <CardDescription className="space-x-3 mb-2">
                        <p className="inline-flex items-center gap-x-1 text-xs"> <span className="font-bold "> {formatToCurrency(discountPrice)}</span></p>
                        <p className="inline-flex items-center gap-x-1 line-through text-xs"><span>{formatToCurrency(price)}</span></p>
                    </CardDescription>
                </div>
                <div className="col-span-1 flex  justify-center">
                    {
                        totalItems && totalItems > 1 &&
                        <Checkbox
                            id={uniqueKey}
                            checked={selectedItems.includes(uniqueKey)}
                            onCheckedChange={(checked) => handleCheckboxChange(uniqueKey, Boolean(checked))}
                        />
                    }
                </div>
            </CardContent>
        </Card>
    );
}

export default memo(ProductItemInCart)