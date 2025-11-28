"use client";

// ui
import {
    Card
} from "@/components/ui";
import { useQuantitySelectorContext } from "@/features/common/quantity-selector/hooks";


const QuantitySelectorWrapper = ({ children }: { children: React.ReactNode }) => {
    const { layout } = useQuantitySelectorContext();

    return (
        <Card layout={layout} className="border-none shadow-none bg-transparent items-center flex-wrap">
            {children}
        </Card>
    );
}

export default QuantitySelectorWrapper
