"use client";
import { useMemo } from "react";
import {
    Drawer, DrawerTrigger, DrawerContent,
    DrawerHeader, DrawerFooter,
    DrawerClose, DrawerTitle, DrawerDescription,
} from "@/components/ui/drawer";
import {
    Card,
    CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import OptionSelector from "@/features/common/option-selector"
import { ICartItem } from "@/interfaces/cart";
import { renderVariants } from "@/features/cart/utils/renderVariants"
import { SHOPPING_CART } from "@/features/cart/constants";
import { ChevronDown, Save, Ban } from 'lucide-react';
import { useShoppingCartContext } from "@/features/cart/hooks";
import { useGetOptionSelectorValue } from "@/features/common/option-selector/hooks";
import { toast } from "sonner"

interface CartItemVariantsDrawerProps {
    data: ICartItem
}

const CartItemVariantsDrawer = ({ data }: CartItemVariantsDrawerProps) => {
    const {
        updateVariantsItem,
        loading, error } = useShoppingCartContext();
    const {
        itemId,
        itemSpuName,
        itemSkuTierIdx,
        itemSpuVariations
    } = data;
    const { selectedOptions } = useGetOptionSelectorValue(SHOPPING_CART, `${SHOPPING_CART}_${itemId}`)


    const variantsNode = renderVariants(itemSpuVariations, itemSkuTierIdx);

    const skuTierIdx = useMemo(() =>
        Array.isArray(itemSkuTierIdx)
            ? itemSkuTierIdx.map(Number).filter(n => Number.isInteger(n))
            : []
        , [itemSkuTierIdx]);

    const handleSave = () => {
        updateVariantsItem({
            ...data,
            itemSkuTierIdx: selectedOptions
        });
        setTimeout(() => {
            const id = toast.success("update quantity!", {
                description: <span>The product {itemSpuName} - ({renderVariants(itemSpuVariations, itemSkuTierIdx)}) has been removed from your cart.</span>,
                action: {
                    label: "Close",
                    onClick: () => {
                        toast.dismiss(id);
                    },
                },
            });
        }, 500);
    }

    return (
        <Drawer key={`${SHOPPING_CART}_${itemId}`}>
            <DrawerTrigger asChild>
                <div>
                    <ButtonGroup aria-label="Button group">
                        <Button asChild variant="ghost">
                            <span className="font-bold">{variantsNode}</span>
                        </Button>
                        <Button asChild variant="ghost" size="icon">
                            <span>
                                <ChevronDown />
                            </span>
                        </Button>
                    </ButtonGroup>
                </div>
            </DrawerTrigger>
            <DrawerContent>
                <div className="container mx-auto px-3">
                    <DrawerHeader>
                        <DrawerTitle>{itemSpuName}</DrawerTitle>
                        <DrawerDescription>{variantsNode}</DrawerDescription>
                    </DrawerHeader>
                    <Card className="border-none shadow-none">
                        <CardContent className="p-3">
                            <OptionSelector
                                layout="horizontal"
                                reducerKey={SHOPPING_CART}
                                storeKey={`${SHOPPING_CART}_${itemId}`}
                                initialOptions={itemSpuVariations}
                                defaultOptionIdx={skuTierIdx}
                                loading={loading}
                                error={error}
                            />
                        </CardContent>
                    </Card>
                    <DrawerFooter className="flex flex-row justify-end">
                        <DrawerClose asChild>
                            <Button type="button" variant="default" onClick={handleSave}>
                                <Save />  <span> Save</span>
                            </Button>
                        </DrawerClose>
                        <DrawerClose asChild>
                            <Button variant="outline">
                                <Ban /> <span>Cancel</span>
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>

    );
};


export default CartItemVariantsDrawer;
