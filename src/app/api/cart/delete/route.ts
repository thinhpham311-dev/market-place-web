import axios from 'axios';
import qs from 'qs';
import { NextResponse } from 'next/server';
import { handleError } from '@/lib/handleError/error';

const API_NEXT = process.env.NEXT_PUBLIC_BASE_URL;

export async function POST(req: Request): Promise<Response> {
    try {
        const { userId, item } = await req.json();

        if (!API_NEXT) {
            return NextResponse.json(
                { message: 'Server misconfiguration: API_NEXT not set' },
                { status: 500 }
            );
        }
        // ✅ Tạo payload gửi lên server
        const payload = {
            userId,
            product: item
        };


        // ✅ stringify payload theo dạng x-www-form-urlencoded
        const formData = qs.parse(payload);

        // ✅ Gửi DELETE request kèm body
        const { data: dataResponse } = await axios.delete(`${API_NEXT}/v1/api/cart/delete`, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
            },
            data: formData
        });

        return NextResponse.json(dataResponse);
    } catch (error: unknown) {
        return NextResponse.json(
            handleError(error as { name: string; errors: string; code: number; message: string; }),
            { status: 500 }
        );
    }
}
