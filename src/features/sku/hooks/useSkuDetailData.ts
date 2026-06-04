import { useSkuContext } from "./useSkuContext";
import {
  selectSku,
  selectSkuLoading,
  selectSkuError,
  selectSkuStatus,
} from "../store/skuZustandStore";
import { useTranslation } from "@/lib/hooks/use-translation";

export function useSkuDetailData() {
  const { t } = useTranslation();

  const sku = useSkuContext(selectSku);
  const loading = useSkuContext(selectSkuLoading);
  const error = useSkuContext(selectSkuError);
  const status = useSkuContext(selectSkuStatus);

  const hasNoData = !sku || Object.keys(sku).length === 0;
  const showLoading = loading && hasNoData;
  const showError = !loading && hasNoData && !!error;
  const showNotFound = !loading && hasNoData && !error;
  const errorMessage = error || t("common_something_went_wrong");

  return {
    sku,
    loading,
    error,
    status,
    hasNoData,
    showLoading,
    showError,
    showNotFound,
    errorMessage,
  };
}
