import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/lib/hooks";
import { IVoucherModel } from "@/models/discount";
import { formatToCurrency } from "@/utils/formats";

function VoucherDiscountValue({ voucher }: { voucher: IVoucherModel }) {
  const { t } = useTranslation();

  if (voucher.discountType === "percentage") {
    return (
      <span>
        {voucher.discountValue}%{" "}
        {voucher.maxDiscountAmount > 0
          ? `(${t("voucher_max_discount")}: ${formatToCurrency(voucher.maxDiscountAmount)})`
          : ""}
      </span>
    );
  }

  return <span>{formatToCurrency(voucher.discountValue || voucher.discountAmount)}</span>;
}

export default VoucherDiscountValue;
