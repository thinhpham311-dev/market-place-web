"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BrandCarousel from "@/features/brand/components/BrandCarousel";
import { useFetchData } from "@/features/brand/list/all/hooks";

interface BrandListSectionProps {
  title?: string;
  description?: string;
  compact?: boolean;
}

export default function BrandListSection({
  title = "Featured Brands",
  description = "Explore top brands available across the marketplace.",
  compact = false,
}: BrandListSectionProps) {
  const router = useRouter();
  const { brands, loading, error } = useFetchData();

  return (
    <Card className="w-full border-none px-3 shadow-none md:px-6">
      <CardHeader className="mb-3 flex-row items-center space-x-3 px-0">
        <div className="flex-1">
          <CardTitle className="mb-3 capitalize">{title}</CardTitle>
          <CardDescription className="line-clamp-2">{description}</CardDescription>
        </div>
        <Button variant="outline" size="icon" className="float-end" onClick={() => router.push("/search")}>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="px-0">
        <BrandCarousel
          countLoadItems={compact ? 6 : 8}
          data={brands}
          isLoading={loading}
          error={error}
        />
      </CardContent>
    </Card>
  );
}
