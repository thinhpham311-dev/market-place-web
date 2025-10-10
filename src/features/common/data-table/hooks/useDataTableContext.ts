import { useContextSafe } from "@/lib/hooks/use-context-safe";
import { DataTableContext } from "../providers";

export function useDataTableContext() {
    return useContextSafe(DataTableContext, "DataTableProvider");
}
