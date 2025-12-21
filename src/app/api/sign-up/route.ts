import axios from 'axios';
import qs from 'qs';
import { NextRequest, NextResponse } from 'next/server';
import { handleAxiosError } from "@/lib/http/handleAxiosError"
const API_NEXT = process.env.NEXT_PUBLIC_BASE_URL;

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { email } = body;

        if (!API_NEXT) {
            return NextResponse.json(
                { message: 'Server misconfiguration: API_NEXT not set' },
                { status: 500 }
            );
        }

        const { data: dataResponse } = await axios({
            method: 'post',
            url: `${API_NEXT}/v1/api/user/register`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: qs.stringify({
                email
            })
        });

        const { returnCode, returnMessage, data } = dataResponse;

        if (returnCode === 1) {
            return NextResponse.json(data, { status: 200 });
        }

        console.error('API returned error message:', returnMessage);
        return NextResponse.json({}, { status: 203 });
    } catch (error) {
        const normalized = handleAxiosError(error);

        return NextResponse.json(
            {
                message: normalized.message,
                errors: normalized.errors,
            },
            { status: normalized.status }
        );
    }
};
