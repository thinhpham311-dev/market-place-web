import { useContextSafe } from "@/lib/hooks/use-context-safe";
import { BreadcrumbContext } from "../providers";

export function useBreadcrumbContext() {
    return useContextSafe(BreadcrumbContext, "BreadcrumbProvider");
}
