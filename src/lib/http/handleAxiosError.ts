import axios, { AxiosError } from "axios";

export interface NormalizedApiError {
  status: number;
  message: string;
  errors?: unknown;
  isAxiosError: boolean;
}

export function handleAxiosError(error: unknown): NormalizedApiError {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<any>;

    return {
      status: axiosError.response?.status || 500,
      message: axiosError.response?.data?.message || axiosError.message || "Something went wrong",
      errors: axiosError.response?.data?.errors,
      isAxiosError: true,
    };
  }

  if (error instanceof Error) {
    return {
      status: 500,
      message: error.message,
      isAxiosError: false,
    };
  }

  return {
    status: 500,
    message: "Unknown error",
    isAxiosError: false,
  };
}
