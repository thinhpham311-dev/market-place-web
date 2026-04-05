import ApiService from "@/services/ApiService";

export async function apiGetUserProfile({ usr_id }: { usr_id: string }) {
  return ApiService.fetchData({
    url: `/user/profile?usr_id=${encodeURIComponent(usr_id)}`,
    method: "GET",
  });
}
