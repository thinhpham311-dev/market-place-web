
interface IPriceRangeProps {
    min?: number;
    max?: number;
    currency: string;
}

const PriceRange = ({
    min = 0,
    max = 0,
    currency,
}: IPriceRangeProps) => (
    <h3 className="text-2xl font-bold text-blue-600">
        {min.toLocaleString("vi-VN")} {currency}
        {max && max !== min && (
            <> - {max.toLocaleString("vi-VN")} {currency}</>
        )}
    </h3>
);

export default PriceRange