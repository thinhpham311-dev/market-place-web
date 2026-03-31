import ApiService from "@/services/ApiService";
import type { VerifyEmailOtpPayload } from "@/features/auth/types/auth";

export async function apiPostVerifyEmailOtp(data: VerifyEmailOtpPayload) {
  return ApiService.fetchData({
    url: "/verify-email-otp",
    method: "POST",
    data,
  });
}
