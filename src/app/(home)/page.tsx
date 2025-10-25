import Advertisement from "@/features/ads";
import CatPopularList from "@/features/category/popular";
import ProPopularList from "@/features/product/list/popular"
import ProSuggestionList from "@/features/product/list/suggestion"

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

