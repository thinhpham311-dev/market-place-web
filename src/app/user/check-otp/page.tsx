"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import CheckOtpCard from "@/features/auth/check-otp/components/CheckOtpCard";

export default function Page() {
  const searchParams = useSearchParams();
  const email = useMemo(() => searchParams.get("email") || "", [searchParams]);

  return (
    <div className="container mx-auto p-3 md:p-6">
      <CheckOtpCard email={email} />
    </div>
  );
}
