import { NextResponse } from "next/server";

const API_NEXT = process.env.NEXT_PUBLIC_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

export async function GET(req: Request): Promise<Response> {
  try {
    if (!API_NEXT) {
      return NextResponse.json(
        { message: "Server misconfiguration: API_NEXT not set" },
        { status: 500 },
      );
    }

    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit");

    const query = limit ? `?limit=${limit}` : "";

    const response = await fetch(`${API_NEXT}/v1/api/shop/all/active/list${query}`, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      next: { revalidate: 60 }, // Cache response for 60 seconds
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          message: errorData.message || `API error: ${response.status} ${response.statusText}`,
          errors: errorData.errors || [],
        },
        { status: response.status },
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      {
        message,
        errors: [],
      },
      { status: 500 },
    );
  }
}
