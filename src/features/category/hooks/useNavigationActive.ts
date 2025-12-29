"use client";

import { useRouter } from "next/navigation";

export const useNavigationActive = (lastId: string) => {
  const router = useRouter();

  const handleNavigate = (slug: string, catId: string, ancestors?: string[]) => {
    if (catId === lastId) return;

    const ancestorsPath = ancestors && ancestors.length > 0 ? `${ancestors.join(".")}.` : "";
    const path = `/categories/${slug}-cat.${ancestorsPath}${catId}`;

    router.push(path);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return { handleNavigate };
};
