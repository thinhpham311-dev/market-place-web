//components
// import GalleriesList from "./components/GalleriesList"
// import ProductsPopularList from "./components/ProductItemsListPopular"
// import ProductsSuggestionList from "./components/ProductItemsListSuggestion"
// import CategoriesPopularList from "./components/CategoriesPopularList"
import Advertisement from "@/features/ads";
import { ProSuggestionList, ProPopularList } from "@/features/product/list";
import { CatPopularList } from "@/features/category/list";

export default async function Page() {
  return (
    <div className="space-y-5  container mx-auto">
      {/* <GalleriesList />
      <CategoriesPopularList />
      <ProductsPopularList />
      <ProductsSuggestionList /> */}
      <Advertisement />
      <CatPopularList />
      <ProPopularList />
      <ProSuggestionList />
    </div>
  );
}

