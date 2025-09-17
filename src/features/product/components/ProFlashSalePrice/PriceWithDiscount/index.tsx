import PriceText from "./PriceText";
import OldPrice from "./OldPrice";
import DiscountBadge from "./DiscountBadge"

interface IPriceWithDiscountProps {
    current?: number;
    old?: number;
    currency?: string;
    discountPercent: number;
}

const PriceWithDiscount = ({
    current = 0,
    old = 0,
    discountPercent = 0,
}: IPriceWithDiscountProps) => (
    <div className="flex items-center gap-2">
        <PriceText value={current} />
        <OldPrice value={old} />
        <DiscountBadge percent={discountPercent} />
    </div>
);

export default PriceWithDiscount;