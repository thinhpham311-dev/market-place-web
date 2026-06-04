import { useSpuContext } from "./useSpuContext";
import {
  selectSpu,
  selectSpuLoading,
  selectSpuError,
  selectSpuStatus,
} from "../store/spuZustandStore";
import { useTranslation } from "@/lib/hooks/use-translation";

export function useSpuDetailData() {
  const { t } = useTranslation();

  const spu = useSpuContext(selectSpu);
  const loading = useSpuContext(selectSpuLoading);
  const error = useSpuContext(selectSpuError);
  const status = useSpuContext(selectSpuStatus);

  const hasNoData = !spu || Object.keys(spu).length === 0;
  const showLoading = loading && hasNoData;
  const showError = !loading && hasNoData && !!error;
  const showNotFound = !loading && hasNoData && !error;
  const errorMessage = error || t("common_something_went_wrong");

  return {
    spu,
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
