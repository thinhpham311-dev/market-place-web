import axios from "axios";
import { NextResponse } from "next/server";
import { handleAxiosError } from "@/lib/http/handleAxiosError";

const API_NEXT = process.env.NEXT_PUBLIC_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

export async function POST(
  req: Request,
  { params }: { params: { shopId: string } },
): Promise<Response> {
  try {
    if (!API_NEXT) {
      return NextResponse.json(
        { message: "Server misconfiguration: API_NEXT not set" },
        { status: 500 },
      );
    }

    const authorization = req.headers.get("authorization") || "";
    const cookie = req.headers.get("cookie") || "";

    const { data } = await axios.post(`${API_NEXT}/v1/api/shop/follow/${params.shopId}`, undefined, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        ...(authorization ? { Authorization: authorization } : {}),
        ...(cookie ? { Cookie: cookie } : {}),
      },
      withCredentials: true,
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
