import { NextResponse } from "next/server";
import axios from "axios";

const API_NEXT = process.env.NEXT_PUBLIC_BASE_URL;


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const limitParam = searchParams.get("limit") || "5";
  const limit = parseInt(limitParam, 10) || 5;

  // 1. Try to query the backend suggestions service if BASE_URL is set
  if (API_NEXT) {
    try {
      const { data } = await axios.get(`${API_NEXT}/v1/api/search/suggest`, {
        params: { q, limit },
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
        },
        timeout: 4000,
      });

      const fetched = data?.metadata?.data || data?.data;
      if (Array.isArray(fetched) && fetched.length > 0) {
        return NextResponse.json({
          ...data,
          data: fetched
        });
      }
    } catch (error) {
      console.warn("Suggest proxy failed, falling back to mock data:", error);
    }
  }

}
