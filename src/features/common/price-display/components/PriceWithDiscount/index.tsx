import PriceText from "./PriceText";
import OldPrice from "./OldPrice";
import DiscountBadge from "./DiscountBadge";
import { usePriceDisplayContext } from "@/features/common/price-display/hooks";
import LoadingSkeleton from "../Loading"

const PriceWithDiscount = () => {
    const { defaultPrice, currentPrice, flashSalePrice, loading } = usePriceDisplayContext();


    if (loading) {
        return <LoadingSkeleton />;
    }

    // Tính toán giá hiện tại và giá cũ
    const hasFlashSale = flashSalePrice && flashSalePrice > 0 && flashSalePrice < currentPrice;
    const hasDiscountFromDefault = !hasFlashSale && defaultPrice && defaultPrice > currentPrice;

    const current = hasFlashSale ? flashSalePrice : currentPrice;
    const old = hasFlashSale ? currentPrice : (hasDiscountFromDefault ? defaultPrice : undefined);

    // Tính phần trăm giảm giá
    const calculateDiscountPercent = () => {
        if (hasFlashSale && currentPrice > 0) {
            return Math.round(((currentPrice - flashSalePrice) / currentPrice) * 100);
        }
        if (hasDiscountFromDefault && defaultPrice) {
            return Math.round(((defaultPrice - currentPrice) / defaultPrice) * 100);
        }
        return 0;
    };

    const discountPercent = calculateDiscountPercent();
    const hasDiscount = discountPercent > 0;



    return (
        <div className="price-with-discount">
            <div className="flex items-center gap-2">
                <PriceText value={current} className={hasDiscount ? "text-red-600 font-bold" : ""} />
                {old !== undefined && (
                    <OldPrice value={old} />
                )}
                {hasDiscount && (
                    <DiscountBadge
                        percent={discountPercent}
                        isFlashSale={hasFlashSale}
                    />
                )}
            </div>

            {/* Hiển thị thông tin chi tiết về khuyến mãi */}
            {hasFlashSale && (
                <div className="flash-sale-timer mt-1 text-sm text-red-500">
                    ⚡ Flash sale: Kết thúc sau 02:15:33
                </div>
            )}
        </div>
    );
};

export default PriceWithDiscount;