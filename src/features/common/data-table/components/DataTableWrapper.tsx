import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table } from "@/components/ui/table";

const CartTableWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card className="grid grid-cols-12 space-y-4 shadow-none rounded-none">
      <CardContent className=" p-0 col-span-12">
        <Table className="relative">{children}</Table>
      </CardContent>
    </Card>
  );
};

export default CartTableWrapper;
