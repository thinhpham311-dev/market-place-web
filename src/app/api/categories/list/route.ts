import axios from "axios";
import { NextResponse } from "next/server";
import { handleAxiosError } from "@/lib/http/handleAxiosError";

const API_NEXT = process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;
const API_KEY = process.env.API_KEY || process.env.NEXT_PUBLIC_API_KEY || "";
const CATEGORY_LIST_PATH = "/v1/api/category/all/list";

const apiClient = axios.create({
  baseURL: API_NEXT,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  },
});

async function fetchCategoriesList() {
  const requestAttempts = [
    () => apiClient.post(CATEGORY_LIST_PATH, {}),
    () => apiClient.get(CATEGORY_LIST_PATH),
  ];

  let lastError: unknown;

  for (const attempt of requestAttempts) {
    try {
      const { data } = await attempt();

      return data;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}

async function handleCategoriesList(): Promise<Response> {
  try {
    if (!API_NEXT) {
      return NextResponse.json(
        { message: "Server misconfiguration: API_NEXT not set" },
        { status: 500 },
      );
    }

    const dataResponse = await fetchCategoriesList();

    return NextResponse.json(dataResponse);
  } catch (error: unknown) {
    const normalized = handleAxiosError(error);

    return NextResponse.json(
      {
        message: normalized.message,
        errors: normalized.errors,
      },
      { status: normalized.status },
    );
  }
}

export async function GET(): Promise<Response> {
  return handleCategoriesList();
}

export async function POST(): Promise<Response> {
  return handleCategoriesList();
}
