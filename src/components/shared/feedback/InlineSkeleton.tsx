import { Fragment } from "react";

import { Skeleton } from "@/components/ui/skeleton";

type InlineSkeletonProps = {
  className: string;
  count?: number;
};

export default function InlineSkeleton({ className, count = 1 }: InlineSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Fragment key={index}>
          <Skeleton className={className} />
        </Fragment>
      ))}
    </>
  );
}
