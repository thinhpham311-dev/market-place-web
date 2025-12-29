interface IDiscountBadgeProps {
  percent: number;
  isFlashSale?: boolean | 0;
}

const DiscountBadge = ({ percent = 0, isFlashSale = false }: IDiscountBadgeProps) => (
  <>
    {isFlashSale && (
      <span className="text-sm text-red-500 bg-red-100 px-2 py-0.5 rounded">-{percent}%</span>
    )}
  </>
);

export default DiscountBadge;
