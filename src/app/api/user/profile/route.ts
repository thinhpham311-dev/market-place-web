import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

import { handleAxiosError } from "@/lib/http/handleAxiosError";

const API_BASE_URL = process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;
const API_KEY = process.env.API_KEY || process.env.NEXT_PUBLIC_API_KEY || "";

export async function GET(request: NextRequest): Promise<Response> {
  try {
    if (!API_BASE_URL) {
      return NextResponse.json(
        { message: "Server misconfiguration: API base URL is not set" },
        { status: 500 },
      );
    }

    const usr_id = request.nextUrl.searchParams.get("usr_id") || "";

    if (!usr_id) {
      return NextResponse.json({ message: "usr_id is required" }, { status: 400 });
    }

    const { data } = await axios.get(`${API_BASE_URL}/v1/api/user/profile`, {
      params: { usr_id },
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
