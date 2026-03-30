import axios from "axios";
import { NextResponse } from "next/server";

import { handleAxiosError } from "@/lib/http/handleAxiosError";

const API_NEXT = process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;
const API_KEY = process.env.API_KEY || process.env.NEXT_PUBLIC_API_KEY || "";

export async function POST(): Promise<Response> {
  try {
    if (!API_NEXT) {
      return NextResponse.json(
        { message: "Server misconfiguration: API_NEXT not set" },
        { status: 500 },
      );
    }

    const { data } = await axios.get(`${API_NEXT}/v1/api/brand/all/list`, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
    });

    return NextResponse.json(data);
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
