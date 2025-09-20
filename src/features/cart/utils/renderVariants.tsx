import { VariantOption } from "@/interfaces/spu";

export const renderVariants = (variants: VariantOption[], itemTierIdx: number[]) =>
    variants.map((variant, index) => {
        const option = itemTierIdx[index] !== undefined
            ? variant.value?.[itemTierIdx[index]]
            : null;

        return (
            <span className="cursor-pointer" key={index}>
                {option?.label ?? "N/A"}
                {index < variants.length - 1 && ", "}
            </span>
        );
    });

