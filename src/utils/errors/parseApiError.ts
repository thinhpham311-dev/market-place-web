// parseApiError.ts
import { NormalizedApiError } from "@/lib/http/handleAxiosError";
import { translateRuntime } from "@/lib/i18n/runtime-translation";

export type ParsedApiError =
  | { type: "CLIENT"; message: string; status: number }
  | { type: "SERVER"; message: string; status: number };

export function parseApiError(error: NormalizedApiError): ParsedApiError {
  const status = error.status ?? 500;

  // ≠ 200 đều là error
  if (status >= 500) {
    return {
      type: "SERVER",
      status,
      message: error.message ?? translateRuntime("api_server_error"),
    };
  }

  return {
    type: "CLIENT",
    status,
    message: error.message ?? translateRuntime("api_invalid_request"),
  };
}
