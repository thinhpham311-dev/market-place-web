//components
import GalleriesList from "./components/GalleriesList"
import ProductsPopularList from "./components/ProductItemsListPopular"
import ProductsSuggestionList from "./components/ProductItemsListSuggestion"
import CategoriesPopularList from "./components/CategoriesPopularList"


export default async function Page() {
  return (
    <div className="space-y-5  container mx-auto">
      <GalleriesList />
      <CategoriesPopularList />
      <ProductsPopularList />
      <ProductsSuggestionList />
    </div>
  );
}

