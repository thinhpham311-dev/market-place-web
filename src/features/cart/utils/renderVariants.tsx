import { IVariationModel } from "@/models/spu";
import { Badge } from "@/components/ui/badge"

export const renderVariants = (
    variants: IVariationModel[],
    itemTierIdx: number[]
) =>
    variants.map((variant, index) => {
        const option =
            itemTierIdx[index] !== undefined
                ? variant.values?.[itemTierIdx[index]]
                : null;

        return (
            <Badge
                key={index}
                variant="default"
                className="cursor-pointer mx-1"
            >
                {option?.label}
            </Badge>
        );
    });
