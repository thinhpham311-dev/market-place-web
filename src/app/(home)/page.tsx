import dynamic from "next/dynamic";

const Advertisement = dynamic(() => import('@/features/ads'), {
  ssr: false,
});
const CatPopularList = dynamic(() => import('@/features/category/list/popular'), {
  ssr: false,
});

const ProPopularList = dynamic(() => import('@/features/product/list/popular'), {
  ssr: false,
});
const ProSuggestionList = dynamic(() => import('@/features/product/list/suggestion'), {
  ssr: false,
});

//components
// import Advertisement from "@/features/ads";
// import CatPopularList from "@/features/category/list/popular";
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

