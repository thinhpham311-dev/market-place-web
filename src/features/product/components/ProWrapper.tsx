"use client";

//ui
import { Card, CardContent } from "@/components/ui/card";

export default function ProWrapper({ children }: { children?: React.ReactNode }) {
  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0 space-y-6">{children}</CardContent>
    </Card>
  );
}
