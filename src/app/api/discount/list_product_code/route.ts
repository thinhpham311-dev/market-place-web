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

    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code") || "";
    const shopId = searchParams.get("shopId") || "";
    const limit = searchParams.get("limit") || "50";
    const page = searchParams.get("page") || "1";

    if (!code) {
      return NextResponse.json({ message: "Voucher code is required" }, { status: 400 });
    }

    const upstreamUrl = `${API_BASE_URL}/v1/api/discount/list_product_code`;
    const { data } = await axios.get(upstreamUrl, {
      params: {
        code,
        shopId,
        limit,
        page,
      },
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
