"use client";

import { useMemo, useCallback } from "react";
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerFooter,
    DrawerClose,
    DrawerTitle,
    DrawerDescription,
} from "@/components/ui/drawer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import ErrorMsg from "./ErrorMsg"
import LoadingSkeleton from "./LoadingSkeleton";

import { ChevronDown, Save, Ban } from "lucide-react";
import { toast } from "sonner";

import OptionSelector from "@/features/common/option-selector";
import { useGetOptionSelectorValue } from "@/features/common/option-selector/hooks";
import { useShoppingCartContext } from "@/features/cart/hooks";
import { renderVariants } from "@/features/cart/utils/renderVariants";
import { checkIsSameVariant } from "@/features/cart/helpers/calculate";
import { SHOPPING_CART } from "@/features/cart/constants";
import { ICartItemModel } from "@/models/cart";;

interface CartItemVariantsDrawerProps {
    data: ICartItemModel;
}

const CartItemVariantsDrawer = ({ data }: CartItemVariantsDrawerProps) => {
    const { updateVariantsItem, loading, error } = useShoppingCartContext();

    const {
        itemId,
        itemSkuId,
        itemSpuName,
        itemSkuTierIdx,
        itemSpuVariations,
    } = data;

    const { selectedOptions } = useGetOptionSelectorValue({
        storeKey: `${SHOPPING_CART}_${itemId}`
    });

    const skuTierIdx = useMemo<number[]>(() => {
        if (!Array.isArray(itemSkuTierIdx)) return [];
        return itemSkuTierIdx
            .map(Number)
            .filter(Number.isInteger);
    }, [itemSkuTierIdx]);

    const variantsLabel = useMemo(
        () => renderVariants(itemSpuVariations, itemSkuTierIdx),
        [itemSpuVariations, itemSkuTierIdx]
    );

    const isDisabled = useMemo(
        () => checkIsSameVariant(skuTierIdx, selectedOptions),
        [skuTierIdx, selectedOptions]
    );

    const showSuccessToast = useCallback(() => {
        const id = toast.success("Update variants!", {
            description: (
                <span className="text-white">
                    The product <b>{itemSpuName}</b> – {variantsLabel} has been updated.
                </span>
            ),
            action: {
                label: "Close",
                onClick: () => toast.dismiss(id),
            },
        });
    }, [itemSpuName, variantsLabel]);

    const handleSave = useCallback(() => {
        updateVariantsItem({
            ...data,
            itemSkuTierIdx: selectedOptions,
        });

        setTimeout(showSuccessToast, 500);
    }, [data, selectedOptions, updateVariantsItem, showSuccessToast]);

    if (error?.byItem[itemSkuId]?.updateVariant) {
        return <ErrorMsg message={error?.byItem[itemSkuId].updateVariant.message} />;
    }

    if (loading.byItem[itemSkuId]?.updateVariant) {
        return <LoadingSkeleton />;
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <ButtonGroup aria-label="Variants selector">
                    <Button variant="outline" className="px-1.5 gap-0 font-bold">
                        {variantsLabel}
                    </Button>
                    <Button variant="outline" size="icon">
                        <ChevronDown />
                    </Button>
                </ButtonGroup>
            </DrawerTrigger>

            <DrawerContent>
                <div className="container mx-auto px-3">
                    <DrawerHeader>
                        <DrawerTitle>{itemSpuName}</DrawerTitle>
                        <DrawerDescription>{variantsLabel}</DrawerDescription>
                    </DrawerHeader>

                    <Card className="border-none shadow-none">
                        <CardContent className="p-3">
                            <OptionSelector
                                layout="horizontal"
                                storeKey={`${SHOPPING_CART}_${itemId}`}
                                initialOptions={itemSpuVariations}
                                defaultOptionIdx={skuTierIdx}

                            />
                        </CardContent>
                    </Card>

                    <DrawerFooter className="flex flex-row justify-end gap-2 py-5">
                        <DrawerClose asChild>
                            <Button
                                type="button"
                                disabled={isDisabled}
                                onClick={handleSave}
                            >
                                <Save />
                                <span>Save</span>
                            </Button>
                        </DrawerClose>

                        <DrawerClose asChild>
                            <Button variant="outline">
                                <Ban />
                                <span>Cancel</span>
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default CartItemVariantsDrawer;
