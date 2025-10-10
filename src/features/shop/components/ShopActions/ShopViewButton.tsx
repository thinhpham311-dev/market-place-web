"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { Eye } from "lucide-react";

interface ShopViewButtonProps {
    slug?: string;
    id?: string | number;
}

const ShopViewButton: React.FC<ShopViewButtonProps> = ({ slug, id }) => {
    const router = useRouter();

    const handleView = () => {
        if (slug && id) {
            router.push(`/shop/${slug}-s.${id}`);
        }
    };

    return (
        <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={handleView}
        >
            <Eye className="w-4 h-4 mr-1" />
            <span>View</span>
        </Button>
    );
};

export default ShopViewButton;
