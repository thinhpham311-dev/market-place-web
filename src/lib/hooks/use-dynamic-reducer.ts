"use client";
import { useLayoutEffect } from "react";
import { injectReducer, removeReducer } from "@/store";

export function useDynamicReducer(key: string, reducer: any) {
  useLayoutEffect(() => {
    injectReducer(key, reducer);
    return () => {
      removeReducer(key);
    };
  }, [key, reducer]);
}
