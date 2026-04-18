import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/lib/hooks";
import {VoucherStatus} from "@/models/discount";

 function VoucherStatusBadge({ status }: { status: VoucherStatus }) {
  const { t } = useTranslation();

  if (status === "used") {
    return (
      <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">{t("voucher_used")}</Badge>
    );
  }

  if (status === "expired") {
    return <Badge variant="secondary">{t("voucher_expired")}</Badge>;
  }

  return (
    <Badge className="bg-orange-500 text-white hover:bg-orange-500">{t("voucher_available")}</Badge>
  );
}

export default VoucherStatusBadge