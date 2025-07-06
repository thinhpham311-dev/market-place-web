
//components
import GalleriesList from "./components/GalleriesList"
import ProductsPopularList from "./components/ProductItemsListPopular"
import ProductsSuggestionList from "./components/ProductItemsListSuggestion"
import CategoriesPopularList from "./components/CategoriesPopularList"
import { injectReducer } from "@/store";
import reducer from "@/store/product";

injectReducer("productList", reducer)

export default async function Page() {
  return (
    <div className="space-y-10 w-full">
      <GalleriesList />
      <CategoriesPopularList />
      <ProductsPopularList />
      <ProductsSuggestionList />
    </div>
  );
}

