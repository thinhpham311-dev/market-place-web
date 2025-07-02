
//components
import GalleriesList from "./components/GalleriesList"
import ProductsPopularList from "./components/ProductItemsListPopular"
// import ProductsSuggestionList from "./components/ProductItemsListSuggestion"
import CategoriesPopularList from "./components/CategoriesPopularList"

export default async function Page() {
  return (
    <div className="space-y-10 w-full">
      <GalleriesList />
      <CategoriesPopularList />
      <ProductsPopularList />
      {/* <ProductsSuggestionList /> */}
    </div>
  );
}

