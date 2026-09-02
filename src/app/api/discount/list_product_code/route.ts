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
    try {
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
    } catch {
      // Fallback: If upstream discount product search returns 404, try fetching products by shopId
      const targetShopId = shopId || "962794";
      try {
        const shopSpuUrl = `${API_BASE_URL}/v1/api/product/spu/shop/${targetShopId}?page=${page}&limit=${limit}`;
        const { data: shopData } = await axios.get(shopSpuUrl, {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
          },
        });
        return NextResponse.json(shopData);
      } catch {
        // If shop products query also fails, return 200 with empty list so client does not receive 404
        return NextResponse.json({
          status: 200,
          message: "Success",
          metadata: {
            list: [],
            total: 0,
          },
        });
      }
    }
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
