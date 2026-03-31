import type { IUser } from "@/interfaces/user";
import ApiService from "@/services/ApiService";

export async function apiPostSignUp(data: IUser) {
  return ApiService.fetchData({
    url: "/sign-up",
    method: "POST",
    data,
  });
}
