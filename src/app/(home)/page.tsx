import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const Advertisement = dynamic(() => import('@/features/ads'), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-lvh" />,
});
const CatPopularList = dynamic(() => import('@/features/category/list/popular'), {
  ssr: true,
  loading: () => <Skeleton className="w-full h-48" />,

});
const ProPopularList = dynamic(() => import('@/features/product/list/popular'), {
  ssr: true,
  loading: () => <Skeleton className="w-full h-48" />,

});
const ProSuggestionList = dynamic(() => import('@/features/product/list/suggestion'), {
  ssr: true,
  loading: () => <Skeleton className="w-full h-48" />,

});
// import Advertisement from "@/features/ads";
// import CatPopularList from "@/features/category/popular";
// import ProPopularList from "@/features/product/list/popular"
// import ProSuggestionList from "@/features/product/list/suggestion"

export default function HomePage() {

  return (
    <div className="space-y-5  container mx-auto">
      <Advertisement />
      <CatPopularList />
      <ProPopularList />
      <ProSuggestionList />
    </div>
  );
}

