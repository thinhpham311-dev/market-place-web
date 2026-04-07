"use client";
import { useEffect } from "react";
import { injectReducer, removeReducer } from "@/store";

export function useDynamicReducer(key: string, reducer: any) {
  useEffect(() => {
    injectReducer(key, reducer);
    return () => {
      removeReducer(key);
    };
  }, [key, reducer]);
}
