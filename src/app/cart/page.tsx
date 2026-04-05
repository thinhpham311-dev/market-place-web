import MainCart from "@/features/cart/main-cart";
import ProRelatedList from "@/features/product/list/related";

export default function Page() {
  return (
    <div className="space-y-5 container mx-auto my-5">
      <MainCart />
      <ProRelatedList />
    </div>
  );
}
