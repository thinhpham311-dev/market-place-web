import { useContextSafe } from "@/lib/hooks/use-context-safe";
import { ProContext } from "../providers";

export function useProContext() {
    return useContextSafe(ProContext, "ProProvider");
}
