import axios from 'axios';
import qs from 'qs';
import { NextResponse } from 'next/server';
import { handleAxiosError } from '@/lib/http/handleAxiosError';

const API_NEXT = process.env.NEXT_PUBLIC_BASE_URL;

export async function POST(req: Request): Promise<Response> {
    try {
        const body = await req.json();
        const { userId, items } = body;
        if (!API_NEXT) {
            return NextResponse.json(
                { message: 'Server misconfiguration: API_NEXT not set' },
                { status: 500 }
            );
        }
        // ✅ Tạo payload gửi lên server
        const payload = {
            userId,
            products: items
        };

        // ✅ stringify payload theo dạng x-www-form-urlencoded
        const formData = qs.parse(payload);

        // ✅ Gửi DELETE request kèm body
        const { data: dataResponse } = await axios.delete(`${API_NEXT}/v1/api/cart/delete-items`, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
            },
            data: formData
        });

        return NextResponse.json(dataResponse);
    } catch (error: unknown) {
        const normalized = handleAxiosError(error);

        return NextResponse.json(
            {
                message: normalized.message,
                errors: normalized.errors,
            },
            { status: normalized.status }
        );
    }
}
