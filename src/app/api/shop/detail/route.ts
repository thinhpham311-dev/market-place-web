import axios from "axios";
import { NextResponse } from "next/server";
import { handleError } from "@/lib/handleError/error";

const API_NEXT = process.env.NEXT_PUBLIC_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

// Tạo instance axios
const apiClient = axios.create({
    baseURL: API_NEXT,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "x-api-key": API_KEY,
    },
});

export async function POST(req: Request): Promise<Response> {
    try {
        if (!API_NEXT) {
            return NextResponse.json(
                { message: "Server misconfiguration: API_NEXT not set" },
                { status: 500 }
            );
        }

        const { shop_id } = await req.json();

        const { data } = await apiClient.get(
            `/v1/api/shop/${shop_id}`
        );

        return NextResponse.json(data);
    } catch (error: unknown) {
        return NextResponse.json(
            handleError(
                error as { name: string; errors: string; code: number; message: string }
            ),
            { status: 500 }
        );
    }
}
