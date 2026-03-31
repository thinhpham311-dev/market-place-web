"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/hooks";

interface SectionSeeMoreButtonProps {
  href: string;
  label?: string;
}

export default function SectionSeeMoreButton({
  href,
  label,
}: SectionSeeMoreButtonProps) {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Button
      variant="outline"
      className="rounded-full px-4"
      onClick={() => router.push(href)}
    >
      {label || t("see_more")}
      <ArrowRight className="h-4 w-4" />
    </Button>
  );
}
