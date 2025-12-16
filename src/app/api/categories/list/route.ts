import axios from 'axios';
import { NextResponse } from 'next/server';
import { handleAxiosError } from '@/lib/http/handleAxiosError';

const API_NEXT = process.env.NEXT_PUBLIC_BASE_URL;

export async function POST(): Promise<Response> {
    try {

        if (!API_NEXT) {
            return NextResponse.json(
                { message: 'Server misconfiguration: API_NEXT not set' },
                { status: 500 }
            );
        }

        const { data: dataResponse } = await axios.get(`${API_NEXT}/v1/api/category/all/list`, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
            },
        });

        return NextResponse.json(dataResponse);
    } catch (error: unknown) {
        return NextResponse.json(handleAxiosError(error));
    }
}