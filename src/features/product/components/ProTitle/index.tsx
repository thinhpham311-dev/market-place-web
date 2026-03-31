"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useSpuContext } from "@/features/spu/hooks";
import LoadingSkeleton from "./LoadingSkeleton";
import NotFound from "./NotFound";
import { useTranslation } from "@/lib/hooks/use-translation";

export default function ProTitle() {
  const { t } = useTranslation();
  const { spu, loading, error } = useSpuContext();
  const hasNoData = !spu || Object.keys(spu).length === 0;
  if (loading && hasNoData) {
    return <LoadingSkeleton />;
  }

  if (!loading && hasNoData && error) {
    return <NotFound message={error || t("common_something_went_wrong")} />;
  }

  if (!loading && hasNoData) {
    return <NotFound message={t("common_no_data_found")} />;
  }
  const name = spu?.product_name ?? "";

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-3">
        <CardTitle className="text-2xl font-bold">{name}</CardTitle>
      </CardContent>
    </Card>
  );
}
