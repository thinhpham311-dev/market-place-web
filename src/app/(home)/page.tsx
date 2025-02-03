

//components
import ProductsPopularList from "./components/ProductItemsListPopular"
import ProductsSuggestionList from "./components/ProductItemsListSuggestion";
import GalleriesList from "./components/GalleriesList"

export default function Page() {

  return (
    <div className="space-y-10 w-full">
      <GalleriesList />
      <ProductsPopularList />
      <ProductsSuggestionList />
    </div>
  );
}


