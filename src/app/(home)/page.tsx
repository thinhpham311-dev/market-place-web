
//components
// import GalleriesList from "./components/GalleriesList"
// import ProductsPopularList from "./components/ProductItemsListPopular"
// import ProductsSuggestionList from "./components/ProductItemsListSuggestion"
// import CategoriesPopularList from "./components/CategoriesPopularList"
import Advertisement from "@/features/ads";
import { CatPopularList } from "@/features/category/list";
import {
  ProSuggestionList,
  ProPopularList
} from "@/features/product/list";

export default function Page() {

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

