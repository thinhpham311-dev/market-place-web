import { useContextSafe } from "@/lib/hooks/use-context-safe";
import { DataTableContext } from "@/features/common/data-table/providers";

export function useDataTableContext() {
  return useContextSafe(DataTableContext, "DataTableProvider");
}
