"use client";

import React from "react";
import { useFetchData } from "./hooks";


const ProListByBrandId = ({ lastId }: { lastId?: string }) => {
  const { products, totalItems, loading, error } = useFetchData({ lastId });
  console.log(products, totalItems, loading, error)
  return (
   <p>Not Found</p>
  );
};

export default ProListByBrandId;
