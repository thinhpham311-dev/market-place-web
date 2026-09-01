import axios from "axios";
import { NextResponse } from "next/server";

import { handleAxiosError } from "@/lib/http/handleAxiosError";

const API_NEXT = process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;
const API_KEY = process.env.API_KEY || process.env.NEXT_PUBLIC_API_KEY || "";

export async function POST(request: Request): Promise<Response> {
  try {
    if (!API_NEXT) {
      return NextResponse.json(
        { message: "Server misconfiguration: API_NEXT not set" },
        { status: 500 },
      );
    }

    const { searchParams: urlParams } = new URL(request.url);
    let search = urlParams.get("search") || "";
    let category_id = urlParams.get("category_id") || "";
    let limit = urlParams.get("limit") || "";
    let page = urlParams.get("page") || "";

    try {
      const body = await request.json();
      if (!search) search = body?.search || "";
      if (!category_id) category_id = body?.category_id || "";
      if (!limit) limit = body?.limit || "";
      if (!page) page = body?.page || "";
    } catch {
      // Empty or invalid body
    }

    const queryParams = new URLSearchParams();
    if (search) queryParams.set("search", search);
    if (category_id && category_id !== "all") queryParams.set("category_id", category_id);
    if (limit) queryParams.set("limit", String(limit));
    if (page) queryParams.set("page", String(page));

    const queryString = queryParams.toString();
    const url = `${API_NEXT}/v1/api/brand/all/list${queryString ? `?${queryString}` : ""}`;

    const { data } = await axios.get(url, {
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
