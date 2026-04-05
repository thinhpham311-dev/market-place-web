import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { handleAxiosError } from "@/lib/http/handleAxiosError";

const API_NEXT = process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;
const API_KEY = process.env.API_KEY || process.env.NEXT_PUBLIC_API_KEY || "";
const AUTH_COOKIE_NAME = "market_place_session";
const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

type UpstreamAuthData = Record<string, unknown> | null | undefined;

function extractAuthToken(payload: UpstreamAuthData): string | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const directTokenKeys = ["token", "accessToken", "access_token", "authToken", "jwt"] as const;

  for (const key of directTokenKeys) {
    const value = payload[key];
    if (typeof value === "string" && value.length > 0) {
      return value;
    }
  }

  const nestedCandidates = [payload.data, payload.metadata, payload.user];

  for (const candidate of nestedCandidates) {
    if (candidate && typeof candidate === "object") {
      const nestedToken = extractAuthToken(candidate as Record<string, unknown>);
      if (nestedToken) {
        return nestedToken;
      }
    }
  }

  return null;
}

function appendUpstreamCookies(response: NextResponse, setCookieHeader?: string | string[]) {
  if (!setCookieHeader) {
    return false;
  }

  const cookieValues = Array.isArray(setCookieHeader) ? setCookieHeader : [setCookieHeader];
  cookieValues.forEach((cookieValue) => {
    response.headers.append("set-cookie", cookieValue);
  });

  return cookieValues.length > 0;
}

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!API_NEXT) {
      return NextResponse.json(
        { message: "Server misconfiguration: API_NEXT not set" },
        { status: 500 },
      );
    }

    const upstreamResponse = await axios({
      method: "post",
      url: `${API_NEXT}/v1/api/user/sign-in`,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      data: {
        email,
        password,
      },
    });

    const { data: dataResponse, headers } = upstreamResponse;
    const { returnCode, returnMessage, data } = dataResponse;

    if (returnCode === 1) {
      const token = extractAuthToken(data);
      const hasUpstreamCookie = Boolean(headers["set-cookie"]);
      const hasSession = hasUpstreamCookie || Boolean(token);

      const response = NextResponse.json(
        {
          message: returnMessage || "Sign in successful",
          token: token || undefined,
          user: data?.user ?? data ?? null,
          hasSession,
        },
        { status: 200 },
      );

      const hasForwardedCookie = appendUpstreamCookies(response, headers["set-cookie"]);

      if (!hasForwardedCookie && token) {
        response.cookies.set({
          name: AUTH_COOKIE_NAME,
          value: token,
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          maxAge: AUTH_COOKIE_MAX_AGE,
          path: "/",
        });
      }

      if (hasSession) {
        response.headers.set("x-has-session", "true");
      }

      return response;
    }

    console.error("API returned error message:", returnMessage);
    return NextResponse.json({ message: returnMessage || "Sign in failed" }, { status: 203 });
  } catch (error) {
    const normalized = handleAxiosError(error);

    return NextResponse.json(
      {
        message: normalized.message,
        errors: normalized.errors,
      },
      { status: normalized.status },
    );
  }
};
