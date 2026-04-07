import type { IUser } from "@/interfaces/user";
import ApiService from "@/services/ApiService";

export async function apiPostSignIn(data: IUser) {
  return ApiService.fetchData({
    url: "/sign-in",
    method: "POST",
    data,
  });
}
