import axios from 'axios';
import qs from 'qs';
import { NextRequest, NextResponse } from 'next/server';

const API_NEXT = process.env.NEXT_PUBLIC_BASE_URL;

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { phone, password } = body;

        if (!API_NEXT) {
            return NextResponse.json(
                { message: 'Server misconfiguration: API_NEXT not set' },
                { status: 500 }
            );
        }

        const { data: dataResponse } = await axios({
            method: 'post',
            url: `${API_NEXT}/v1/api/sign-in`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                phone,
                password
            })
        });

        const { returnCode, returnMessage, data } = dataResponse;

        if (returnCode === 1) {
            return NextResponse.json(data, { status: 200 });
        }

        console.error('API returned error message:', returnMessage);
        return NextResponse.json({}, { status: 203 });
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error('API error response:', error.response.data);
            return NextResponse.json(
                error.response.data,
                { status: 400 }
            );
        }
        const message = String(error);
        console.error('Unexpected error:', message);
        return NextResponse.json({ message }, { status: 400 });
    }
};
