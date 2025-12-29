"use client";
import { useEffect, useRef, useState } from "react";

export function useAnimatedNumber(targetValue: number, duration = 500) {
  const [displayValue, setDisplayValue] = useState<number | undefined>(targetValue);
  const prevValue = useRef(targetValue);

  useEffect(() => {
    if (prevValue.current === targetValue) return;

    let start: number | null = null;
    const from = prevValue.current;
    const to = targetValue;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const value = Math.round(from + (to - from) * progress);
      setDisplayValue(value);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        prevValue.current = to;
      }
    };

    requestAnimationFrame(step);
  }, [targetValue, duration]);

  return displayValue;
}
