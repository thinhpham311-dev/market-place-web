import axios from 'axios';
import qs from "qs";
import { NextResponse } from 'next/server';
import { handleError } from '@/lib/handleError/error';

const API_NEXT = process.env.NEXT_PUBLIC_BASE_URL;

export async function POST(req: Request): Promise<Response> {
    try {
        const body = await req.json();
        const { item } = body
        if (!API_NEXT) {
            return NextResponse.json(
                { message: 'Server misconfiguration: API_NEXT not set' },
                { status: 500 }
            );
        }

        // ✅ Tạo payload gửi lên server
        const payload = {
            userId: "1001",
            product: { ...item }
        };

        // Nếu server yêu cầu form-urlencoded:
        const query = qs.stringify(payload);

        // ✅ Gọi axios.post đúng cú pháp
        const { data: dataResponse } = await axios.post(
            `${API_NEXT}/v1/api/cart/add`,
            query,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
                },
            }
        );

        return NextResponse.json(dataResponse);

    } catch (error: unknown) {
        return NextResponse.json(
            handleError(error as { name: string; errors: string; code: number; message: string }),
            { status: 500 }
        );
    }
}
