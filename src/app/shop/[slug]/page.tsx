import StoreInfo from "./components/StoreInfo"
import ProductItemsListTopPicksFromShop from "./components/ProductItemsRecommendedForYou"
import ProductItemsHotDeals from "./components/ProductItemsHotDeals";
import GalleryList from "./components/GalleriesList"

export default async function Page() {
    return <div className="container space-y-5 mx-auto md:p-6 p-3">
        <StoreInfo />
        <ProductItemsListTopPicksFromShop />
        <GalleryList />
        <ProductItemsHotDeals />
    </div>
}