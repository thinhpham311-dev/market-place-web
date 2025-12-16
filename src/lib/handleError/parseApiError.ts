// parseApiError.ts
import { NormalizedApiError } from "@/lib/http/handleAxiosError";

export type ParsedApiError =
    | { type: "CLIENT"; message: string; status: number }
    | { type: "SERVER"; message: string; status: number };

export function parseApiError(
    error: NormalizedApiError
): ParsedApiError {
    const status = error.status ?? 500;

    // ≠ 200 đều là error
    if (status >= 500) {
        return {
            type: "SERVER",
            status,
            message:
                error.message ??
                "Có lỗi hệ thống, vui lòng thử lại sau",
        };
    }

    return {
        type: "CLIENT",
        status,
        message:
            error.message ??
            "Yêu cầu không hợp lệ",
    };
}
