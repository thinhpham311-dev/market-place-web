import { formatToCurrency } from "@/lib/formats"


interface IPriceRangeProps {
    min?: number;
    max?: number;
}

const PriceRange = ({
    min = 0,
    max = 0,
}: IPriceRangeProps) => (
    <h3 className="text-2xl font-bold text-blue-600">
        {formatToCurrency(min)}
        {max && max !== min && (
            <> - {formatToCurrency(max)} </>
        )}
    </h3>
);

export default PriceRange