import React from "react";
import { useRouter } from "next/navigation";
import { CardFooter, Button } from "@/components/ui";
import { ChevronRightIcon } from "lucide-react";
import { useShopInfoContext } from "@/features/shop/hooks"



const ShopActions = () => {
    const router = useRouter()
    const { shopInfo } = useShopInfoContext();

    const { shop_slug, shop_id } = shopInfo || {};

    const handleNavigateToShop = () => {
        router.push(`/shop/${shop_slug}-${shop_id}`);
    };
    return (
        <CardFooter className="p-3 flex justify-center md:justify-end w-full md:w-auto">
            <Button
                variant="link"
                size="icon"
                className="w-full md:w-auto"
                onClick={handleNavigateToShop}
            >
                <ChevronRightIcon className="w-6 h-6" />
            </Button>
        </CardFooter>
    );
};

export default ShopActions;
