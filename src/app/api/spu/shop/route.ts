import axios from "axios";
import qs from "qs";
import { NextResponse } from "next/server";
import { handleAxiosError } from "@/lib/http/handleAxiosError";

const API_NEXT = process.env.NEXT_PUBLIC_BASE_URL;

export async function POST(req: Request): Promise<Response> {
  try {
    const { limit = 20, sort, sortBy, page = 1, pageSize, offset, ids, shop_id, shopId, filter } = await req.json();
    const targetShopId = ids || shop_id || shopId || "962794";

    if (!API_NEXT) {
      return NextResponse.json(
        { message: "Server misconfiguration: API_NEXT not set" },
        { status: 500 },
      );
    }

    const sortValue =
      typeof sort === "object"
        ? sort?.value
        : sort || (typeof sortBy === "object" ? sortBy?.value : sortBy);

    const actualLimit = Number(limit || pageSize) || 20;
    const actualPage = Number(page) && Number(page) > 0 ? Number(page) : 1;
    const computedOffset = offset !== undefined ? Number(offset) : (actualPage - 1) * actualLimit;

    const query = qs.stringify(
      {
        page: actualPage,
        limit: actualLimit,
        offset: computedOffset,
        sort: sortValue,
        ...filter,
      },
      { skipNulls: true, arrayFormat: "repeat" },
    );
    const queryString = query ? `?${query}` : "";
    const backendUrl = `${API_NEXT}/v1/api/product/spu/shop/${targetShopId}${queryString}`;

    const { data: dataResponse } = await axios.get(backendUrl, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
      },
    });
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

export async function GET(req: Request): Promise<Response> {
  try {
    if (!API_NEXT) {
      return NextResponse.json(
        { message: "Server misconfiguration: API_NEXT not set" },
        { status: 500 },
      );
    }
    const { searchParams } = new URL(req.url);
    const shopId = searchParams.get("shopId") || "962794";

    const queryParams = new URLSearchParams(searchParams);
    queryParams.delete("shopId");

    if (!queryParams.has("page")) {
      queryParams.set("page", "1");
    }
    if (!queryParams.has("limit")) {
      queryParams.set("limit", "20");
    }

    const queryString = queryParams.toString();
    const backendUrl = `${API_NEXT}/v1/api/product/spu/shop/${shopId}${queryString ? `?${queryString}` : ""}`;

    const { data: dataResponse } = await axios.get(backendUrl, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
      },
    });
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
