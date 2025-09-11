import axios from 'axios';
import qs from 'qs';
import { NextResponse } from 'next/server';
import { handleError } from '@/lib/handleError/error';

const API_NEXT = process.env.NEXT_PUBLIC_BASE_URL;

export async function POST(req: Request): Promise<Response> {
    try {
        const { limit, sort, page, ids } = await req.json();
        if (!API_NEXT) {
            return NextResponse.json(
                { message: 'Server misconfiguration: API_NEXT not set' },
                { status: 500 }
            );
        }

        const query = qs.stringify({ categoryIds: ids, limit, sort, page });
        const { data: dataResponse } = await axios.get(`${API_NEXT}/v1/api/product/spu/categories/list?${query}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
            },
        });
        return NextResponse.json(dataResponse);
    } catch (error: unknown) {
        return NextResponse.json(handleError(error as { name: string; errors: string; code: number; message: string; }), { status: 500 });
    }
}