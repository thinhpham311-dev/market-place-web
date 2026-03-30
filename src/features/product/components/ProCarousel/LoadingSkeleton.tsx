import ProductCardGridSkeleton from "@/components/shared/feedback/ProductCardGridSkeleton";

type LoadingSkeletonProps = {
  className?: string;
  count: number;
};

export default function LoadingSkeleton({ className, count }: LoadingSkeletonProps) {
  return <ProductCardGridSkeleton className={className} count={count} />;
}
