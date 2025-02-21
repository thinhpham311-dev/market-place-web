export const dynamic = "force-dynamic";
//services
import { apiProductsList } from "@/services/ProductService";
//components
import ProductsPopularList from "./components/ProductItemsListPopular"
import ProductsSuggestionList from "./components/ProductItemsListSuggestion";
import GalleriesList from "./components/GalleriesList"
import { IProduct } from "@/types/product";


type productListResponse = {
  data?: {
    message?: string,
    products?: IProduct[]
  }
}

export default async function Page() {

  const res = await apiProductsList();
  const { data } = res as productListResponse
  return (
    <div className="space-y-10 w-full">
      <GalleriesList />
      <ProductsPopularList data={data?.products} />
      <ProductsSuggestionList data={data?.products} />
    </div>
  );
}

