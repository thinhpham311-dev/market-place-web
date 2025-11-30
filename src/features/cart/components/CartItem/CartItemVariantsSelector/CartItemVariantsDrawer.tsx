"use client";

import {
    Drawer, DrawerTrigger, DrawerContent,
    DrawerHeader, DrawerFooter,
    DrawerClose, DrawerTitle, DrawerDescription
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
// import OptionSelector from "@/features/common/option-selector"
import { ICartItem } from "@/interfaces/cart";
import { renderVariants } from "@/features/cart/utils/renderVariants"
// import { SHOPPING_CART } from "@/features/cart/constants";
import { ChevronDown } from 'lucide-react';


interface CartItemVariantsDrawerProps {
    data: ICartItem
}

const CartItemVariantsDrawer = ({ data }: CartItemVariantsDrawerProps) => {
    const { itemSpuId, itemSpuName, itemSkuTierIdx, itemSpuVariations } = data;
    const variantsNode = renderVariants(itemSpuVariations, itemSkuTierIdx);

    return (
        <Drawer key={itemSpuId}>
            <DrawerTrigger asChild>
                <ButtonGroup aria-label="Button group">
                    <Button asChild variant="outline" size="sm">
                        <span>{variantsNode}</span>
                    </Button>
                    <Button asChild variant="outline" size="icon">
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                </ButtonGroup>
            </DrawerTrigger>

            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>{itemSpuName}</DrawerTitle>
                    <DrawerDescription>{variantsNode}</DrawerDescription>
                </DrawerHeader>

                <p>abc</p>

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
