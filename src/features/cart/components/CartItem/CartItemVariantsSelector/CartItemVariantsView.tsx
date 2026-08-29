"use client";

import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { IVariationModel } from "@/models/spu";
import { renderVariants } from "@/features/cart/utils/renderVariants";

interface CartItemVariantsViewProps {
  itemTierIdx: number[];
  itemVariants: IVariationModel[];
}

const CartItemVariantsView = ({
  itemTierIdx = [],
  itemVariants = [],
}: CartItemVariantsViewProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const variantsNode = renderVariants(itemVariants, itemTierIdx);

  if (!itemVariants || itemVariants.length === 0) {
    return null;
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full space-y-1">
      <CollapsibleTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-1 text-[11px] text-primary font-medium hover:underline focus:outline-none py-0.5"
        >
          {isOpen ? (
            <>
              <span>Thu gọn</span>
              <ChevronUp className="h-3 w-3 shrink-0" />
            </>
          ) : (
            <>
              <span>Xem thêm</span>
              <ChevronDown className="h-3 w-3 shrink-0" />
            </>
          )}
        </button>
      </CollapsibleTrigger>

      <CollapsibleContent className="pt-1">
        <div className="flex items-center flex-wrap gap-1 p-0 rounded-md shadow-sm">
          {variantsNode}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CartItemVariantsView;
