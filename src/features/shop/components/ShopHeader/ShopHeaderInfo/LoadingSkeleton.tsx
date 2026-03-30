import InlineSkeleton from "@/components/shared/feedback/InlineSkeleton";

export default function LoadingSkeleton() {
  return <InlineSkeleton className="h-[30px] rounded-xl col-span-5 my-3" count={3} />;
}
