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
import { ChevronDown } from 'lucide-react';
import { useShoppingCartContext } from "@/features/cart/hooks";


interface CartItemVariantsDrawerProps {
    data: ICartItem
}

const CartItemVariantsDrawer = ({ data }: CartItemVariantsDrawerProps) => {
    const { itemId, itemSpuName, itemSkuTierIdx, itemSpuVariations } = data;
    const { loading, error } = useShoppingCartContext();
    const variantsNode = renderVariants(itemSpuVariations, itemSkuTierIdx);

    const skuTierIdx = useMemo(() =>
        Array.isArray(itemSkuTierIdx)
            ? itemSkuTierIdx.map(Number).filter(n => Number.isInteger(n))
            : []
        , [itemSkuTierIdx]);


    return (
        <Drawer key={`${SHOPPING_CART}_${itemId}`}>
            <DrawerTrigger asChild>
                <div>
                    <ButtonGroup aria-label="Button group">
                        <Button asChild variant="outline">
                            <span>{variantsNode}</span>
                        </Button>
                        <Button asChild variant="outline" size="icon">
                            <span>
                                <ChevronDown />
                            </span>
                        </Button>
                    </ButtonGroup>
                </div>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>{itemSpuName}</DrawerTitle>
                    <DrawerDescription>{variantsNode}</DrawerDescription>
                </DrawerHeader>
                <Card className="border-none shadow-none">
                    <CardContent className="p-0">
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
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button asChild variant="outline">
                            <span>Cancel</span>
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>

    );
};


export default CartItemVariantsDrawer;
