import { formatToCurrency } from "@/utils/formats";
import { usePriceDisplayContext } from "@/features/common/price-display/hooks";

const PriceRange = () => {
  const { minPrice = 0, maxPrice = 0 } = usePriceDisplayContext();

  if (minPrice === 0 && maxPrice === 0) {
    return null;
  }

  return (
    <h3 className="text-2xl font-bold text-blue-600">
      {formatToCurrency(minPrice)}
      {maxPrice && maxPrice !== minPrice && <> - {formatToCurrency(maxPrice)}</>}
    </h3>
  );
};

export default PriceRange;
