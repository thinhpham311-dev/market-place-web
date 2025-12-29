"use client";

import { useEffect, useRef } from "react";

export interface LoadMoreTriggerProps {
  hasMore: boolean;
  onTrigger: () => void;
  isLoading?: boolean;
}

export default function InfiniteScrollLoading({
  hasMore,
  onTrigger,
  isLoading = false,
}: LoadMoreTriggerProps) {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const calledRef = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!hasMore || isLoading || !triggerRef.current) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !calledRef.current) {
          calledRef.current = true;
          onTrigger();
        }
      },
      { rootMargin: "100px" },
    );

    observerRef.current.observe(triggerRef.current);

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [hasMore, isLoading, onTrigger]);

  useEffect(() => {
    if (!isLoading) {
      calledRef.current = false;
    }
  }, [isLoading]);

  return (
    <div ref={triggerRef} className="min-h-[40px] w-full flex items-center justify-center">
      {isLoading && hasMore && <span className="text-sm text-muted-foreground">Loading...</span>}
    </div>
  );
}
