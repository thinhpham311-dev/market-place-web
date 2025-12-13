import { VariantOption } from "@/interfaces/spu";
import { Badge } from "@/components/ui/badge"

export const renderVariants = (variants: VariantOption[], itemTierIdx: number[]) =>
    variants.map((variant, index) => {
        const option = itemTierIdx[index] !== undefined
            ? variant.value?.[itemTierIdx[index]]
            : null;

        return (
            <Badge variant="default" className="cursor-pointer mx-1" key={index}>
                {option?.label ?? "N/A"}
            </Badge>
        );
    });

