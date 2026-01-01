"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import SortByOptionButton from "./SortByOptionButton";
import { useSortByContext } from "../hooks";

const SortOptionList = () => {
  const { data } = useSortByContext();

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0">
        <div className="flex items-center space-x-1">
          {data?.map((_, index) => (
            <React.Fragment key={`${_.value}-${index}`}>
              <SortByOptionButton option={_} />
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SortOptionList;
