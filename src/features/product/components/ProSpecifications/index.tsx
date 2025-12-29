"use client";
import * as React from "react";
import { Card, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import SpecificationItem from "./SpecificationItem";
import { useSpuContext } from "@/features/spu/hooks";
import { specs } from "@/features/product/constants";
import LoadingSkeleton from "./LoadingSkeleton";
import NotFound from "./NotFound";

export default function ProSpecifications() {
  const { spu, loading, error } = useSpuContext();
  const hasNoData = !spu || Object.keys(spu).length === 0;
  if (loading && hasNoData) {
    return <LoadingSkeleton />;
  }

  if (!loading && hasNoData && error) {
    return <NotFound message={error || "Something went wrong."} />;
  }

  if (!loading && hasNoData) {
    return <NotFound />;
  }
  const specsList = specs(spu);

  if (!specsList || specsList.length === 0) {
    return (
      <CardContent className="p-3">
        <CardDescription>No specifications available</CardDescription>
      </CardContent>
    );
  }
  return (
    <Card className="sticky top-[70px] left-0 rounded-none">
      <CardTitle className="bg-sidebar-foreground text-background p-3">
        Product Specifications
      </CardTitle>

      <CardContent className="p-0">
        {specsList.map((spec, index) => (
          <SpecificationItem
            key={index}
            label={spec.label}
            value={spec.value}
            hasSeparator={index < specs.length - 1}
          />
        ))}
      </CardContent>
    </Card>
  );
}
