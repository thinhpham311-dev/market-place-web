
import DetailCart from "./components/DetailCart"
import ProductItemsListRelated from "./components/ProductItemsListRelated"

export default function Page() {

    return (
        <div className="space-y-10 my-5">
            <DetailCart />
            <ProductItemsListRelated />
        </div>
    );
}
