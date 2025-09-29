import ProRelatedList from "@/features/product/list/related";
import MainCart from "@/features/cart/main-cart"
import Cart from "@/features/cart"

export default function Page() {

    return (
        <div className="space-y-5 container mx-auto my-5">
            <Cart>
                <MainCart />
            </Cart>
            <ProRelatedList />
        </div>
    );
}
