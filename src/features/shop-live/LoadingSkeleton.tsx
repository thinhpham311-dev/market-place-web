import { Skeleton } from "@/components/ui/skeleton";

function ShopLiveCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-3xl border border-orange-100 bg-white">
      <Skeleton className="aspect-[16/11] rounded-none rounded-t-3xl bg-orange-100/70" />

      <div className="space-y-4 p-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-2/3 bg-orange-100/70" />
          <Skeleton className="h-4 w-full bg-orange-100/60" />
          <Skeleton className="h-4 w-5/6 bg-orange-100/60" />
        </div>

        <Skeleton className="h-11 w-full rounded-2xl bg-orange-100/60" />
        <Skeleton className="h-10 w-full rounded-full bg-orange-200/70" />
      </div>
    </article>
  );
}

export default function LoadingSkeleton() {
  return (
    <section className="px-3 md:px-6">
      <div className="overflow-hidden rounded-[28px] border border-orange-200 bg-gradient-to-b from-orange-50 via-orange-50 to-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-orange-100 bg-gradient-to-r from-[#ee4d2d] to-[#ff7337] px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
          <div className="space-y-3">
            <Skeleton className="h-4 w-28 bg-white/30" />
            <Skeleton className="h-8 w-48 bg-white/35" />
            <Skeleton className="h-4 w-[280px] max-w-full bg-white/25" />
          </div>

          <Skeleton className="h-10 w-40 rounded-full bg-white/80" />
        </div>

        <div className="grid gap-4 p-4 md:grid-cols-2 md:p-6 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <ShopLiveCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
