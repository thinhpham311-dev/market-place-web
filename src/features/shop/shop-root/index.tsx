import ShopInfoProvider from "../providers";
import ShopInfoWrapper from "../components/ShopInfoWrapper";
import ShopHeader from "../components/ShopHeader";
import ShopActions from "../components/ShopActions";
import ShopStats from "../components/ShopStats";
import { useFetchData } from "../hooks";

interface IShopProps {
  shop_id?: string;
  storeKey: string;
}

const ShopRoot = ({ shop_id, storeKey }: IShopProps) => {
  const shopData = useFetchData({
    shop_id,
    storeKey,
  });

  return (
    <ShopInfoProvider
      contextValues={{
        data: shopData.shopInfo,
        loading: shopData.loading,
        error: shopData.error,
        status: shopData.status as "idle" | "loading" | "success" | "error",
      }}
    >
      <ShopInfoWrapper>
        <ShopHeader />
        <ShopActions />
        <ShopStats />
      </ShopInfoWrapper>
    </ShopInfoProvider>
  );
};

export default ShopRoot;
