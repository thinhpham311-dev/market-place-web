import { useEffect, useMemo } from "react";
import { parseApiError } from "@/utils/errors/parseApiError";
import { NormalizedApiError } from "@/lib/http/handleAxiosError";
import { showErrorToast } from "@/features/common/toast-msg";

interface UseCartErrorHandlerResult {
    shouldRenderError: boolean;
    errorMessage?: string;
}

export function useCartErrorHandler(
    error?: NormalizedApiError | null,
    template?: string
): UseCartErrorHandlerResult {

    const parsedError = useMemo(() => {
        if (!error) return null;
        return parseApiError(error);
    }, [error]);

    useEffect(() => {
        if (!parsedError) return;

        // CLIENT → toast
        if (parsedError.type === "CLIENT") {
            showErrorToast({
                title: template
                    ? `[${error?.status}][${template}]`
                    : `[${error?.status}]`,
                description: parsedError.message,
            });
        }
    }, [parsedError, error?.status, template]);

    // SERVER → render error UI
    if (parsedError?.type === "SERVER") {
        return {
            shouldRenderError: true,
            errorMessage: parsedError.message,
        };
    }

    return { shouldRenderError: false };
}
