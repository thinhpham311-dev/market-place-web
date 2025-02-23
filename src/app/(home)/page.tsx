
//components
import GalleriesList from "./components/GalleriesList"
import ProductsPopularList from "./components/ProductItemsListPopular"
import ProductsSuggestionList from "./components/ProductItemsListSuggestion"

export default async function Page() {
  return (
    <div className="space-y-10 w-full">
      <GalleriesList />
      <ProductsPopularList />
      <ProductsSuggestionList />
    </div>
  );
}

