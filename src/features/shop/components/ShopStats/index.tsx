import React from "react";
import { ItemContent, Item, ItemTitle, ItemDescription } from "@/components/ui/item";

const ShopStats = () => {
    const stats = [
        { label: "Rating", value: "5.0 ★" },
        { label: "Products", value: "120" },
        { label: "Follower", value: "3.2k" },
        { label: "Joined", value: "2022" },
        { label: "Response Rate", value: "98%" },
        { label: "Response Time", value: "1h" },
    ];

    return (
        <ItemContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-5">
                {stats.map((item) => (
                    <Item key={item.label} size="sm" className="p-0">
                        <ItemContent className="flex flex-row justify-between text-sm md:text-base">
                            <ItemTitle className="font-semibold">{item.label}: </ItemTitle>
                            <ItemDescription>{item.value}</ItemDescription>
                        </ItemContent>
                    </Item>
                ))}
            </div>
        </ItemContent>
    );
};

export default ShopStats;
