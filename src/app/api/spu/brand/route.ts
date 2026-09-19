import axios from "axios";
import qs from "qs";
import { NextResponse } from "next/server";
import { handleAxiosError } from "@/lib/http/handleAxiosError";

const API_NEXT = process.env.NEXT_PUBLIC_BASE_URL;

export async function POST(req: Request): Promise<Response> {
  try {
    const { searchParams: urlParams } = new URL(req.url);
    let brandId = urlParams.get("brandId") || urlParams.get("ids") || "";
    let limit = urlParams.get("limit") || "";
    let sort = urlParams.get("sort") || "";
    let page = urlParams.get("page") || "";
    let filter: any = {};

    try {
      const body = await req.json();
      if (!brandId) brandId = body?.ids || body?.brandId || "";
      if (!limit) limit = body?.limit || "";
      if (!sort) {
        const rawSort = body?.sort || body?.sortBy;
        sort = typeof rawSort === "object" ? rawSort?.value : rawSort || "";
      }
      if (!page) page = body?.page || "";
      if (body?.filter && typeof body.filter === "object") {
        filter = body.filter;
      }
    } catch {
      // Empty or invalid body
    }

    if (!API_NEXT) {
      return NextResponse.json(
        { message: "Server misconfiguration: API_NEXT not set" },
        { status: 500 },
      );
    }

    const query = qs.stringify(
      {
        brandId,
        limit: limit || undefined,
        sort: sort || undefined,
        page: page || undefined,
        ...filter,
      },
      {
        skipNulls: true,
        arrayFormat: "repeat",
      },
    );
    const { data: dataResponse } = await axios.get(
      `${API_NEXT}/v1/api/product/spu/brand/list?${query}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
        },
      },
    );
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
