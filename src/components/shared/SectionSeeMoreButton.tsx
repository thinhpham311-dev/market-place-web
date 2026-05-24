"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/hooks";

interface SectionSeeMoreButtonProps {
  href: string;
  label?: string;
  iconOnly?: boolean;
  className?: string;
}

export default function SectionSeeMoreButton({
  href,
  label,
  iconOnly = false,
  className,
}: SectionSeeMoreButtonProps) {
  const { t } = useTranslation();
  const buttonLabel = label || t("see_more");

  return (
    <Button
      variant="outline"
      className={iconOnly ? `rounded-full px-0 w-9 h-9 ${className || ""}`.trim() : `rounded-full px-4 ${className || ""}`.trim()}
      asChild
    >
      <Link href={href} aria-label={buttonLabel} title={buttonLabel}>
        {!iconOnly ? buttonLabel : null}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </Button>
  );
}
