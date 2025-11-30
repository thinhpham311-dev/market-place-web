"use client";


import { Card, CardContent } from "@/components/ui/card";
import AddToCartButton from "./ProActionButtons/AddToCartButton";
import BuyNowButton from "./ProActionButtons/BuyNowButton";


const ProActions = () => {

    return (
        <Card className="border-none shadow-none lg:static md:fixed sm:fixed fixed bottom-0 left-0 z-50 w-full">
            <CardContent className="container mx-auto p-3 flex gap-3">
                <AddToCartButton />
                <BuyNowButton />
            </CardContent>
        </Card>
    );
};

export default ProActions
