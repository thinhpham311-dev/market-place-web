import React from "react";
import { useRouter } from "next/navigation";
import { ItemActions, Button } from "@/components/ui";
import { UserCheck, UserPlus, Eye } from "lucide-react";
import { useShopInfoContext } from "@/features/shop/hooks";

const ShopHeaderActions = () => {
    const router = useRouter();
    const { shopInfo } = useShopInfoContext();
    const { shop_id, shop_slug } = shopInfo || {};
    const [isFollowing, setIsFollowing] = React.useState(false);
    const handleFollow = () => {
        setIsFollowing(!isFollowing);
    };

    const handleView = () => {
        router.push(`/shop/${shop_slug}-${shop_id}`);
    };


    return (
        <ItemActions className="flex-col gap-2">
            <Button variant="outline" size="sm" className="w-full" onClick={handleFollow}>
                {isFollowing ? <>
                    <UserPlus className="w-4 h-4 mr-1" />
                    <span>Follow</span>
                </>
                    :
                    <>
                        <UserCheck className="w-4 h-4 mr-1" />
                        <span>Following</span>
                    </>}

            </Button>

            <Button variant="outline" size="sm" className="w-full" onClick={handleView}>
                <Eye className="w-4 h-4 mr-1" />
                <span>View</span>
            </Button>
        </ItemActions>
    );
};

export default ShopHeaderActions;
