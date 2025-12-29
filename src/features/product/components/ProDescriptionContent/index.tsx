"use client";
import * as React from "react";
import { Card, CardTitle, CardDescription, CardContent, CardHeader } from "@/components/ui/card";
import { useSpuContext } from "@/features/spu/hooks";
import LoadingSkeleton from "./LoadingSkeleton";
import NotFound from "./NotFound";

export default function ProDescriptionContent() {
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
  const description = spu?.product_description ?? "";

  let content: React.ReactElement;

  if (!description) {
    content = <CardDescription>No product details available</CardDescription>;
  } else if (typeof description === "string") {
    content = <CardDescription dangerouslySetInnerHTML={{ __html: description }} />;
  } else {
    content = <CardDescription>{description}</CardDescription>;
  }

  return (
    <Card className="rounded-none">
      <CardHeader className="bg-sidebar-foreground p-3">
        <CardTitle className="text-background">Product Description</CardTitle>
      </CardHeader>
      <CardContent className="p-3">{content}</CardContent>
    </Card>
  );
}
