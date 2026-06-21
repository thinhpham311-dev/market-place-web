"use client";

//ui
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
// Components
import ProWrapper from "@/features/product/components/ProWrapper";
// Components
import ProBreadcrumb from "@/features/product/components/ProBreadcrumb";

import ProDescriptionContent from "@/features/product/components/ProDescriptionContent";
import ProSpecifications from "@/features/product/components/ProSpecifications";
import ProTitle from "@/features/product/components/ProTitle";
import ProThumbnailGallery from "@/features/product/components/ProThumbnailGallery";
import ProQuantitySelector from "@/features/product/components/ProQuantitySelector";
import ProVariantsSelector from "@/features/product/components/ProVariantsSelector";
import ProSocialsShare from "@/features/product/components/ProSocialsShare";
import ProWishListToggle from "@/features/product/components/ProWishListToggle";
import ProPriceDisplay from "@/features/product/components/ProPriceDisplay";
import ProShippingInfo from "@/features/product/components/ProShippingInfo";

import ProReviewStar from "@/features/product/components/ProReviewStar";
import ProActions from "@/features/product/components/ProActions";
import ProShopInfo from "@/features/product/components/ProShopInfo";
import ProTopPicksList from "@/features/product/list/top-picks";
import ShopVoucherSection from "@/features/voucher/list/components/ShopVoucherSection";

// Hooks
import { useSyncSpuData, useSyncSkuData } from "@/features/product/hooks/useSyncProductData";

interface IProductDetail {
  product_id?: string;
  shop_id?: string;
}

export default function ProductDetail({ product_id = "", shop_id = "" }: IProductDetail) {
  // Sync SPU and SKU state to global stores
  useSyncSpuData(product_id);
  useSyncSkuData(product_id);

  return (
    <ProWrapper>
      <Card className="border-none shadow-none">
        <CardHeader className="py-3">
          <ProBreadcrumb />
        </CardHeader>
        <CardContent className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 pb-0">
          <div className="md:col-span-3 col-span-3 order-0">
            <Card layout="horizontal" className="rounded-none">
              <CardContent className="p-3 ">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
                  <div className="lg:col-span-2 lg:order-1 md:row-span-1">
                    <ProThumbnailGallery />
                  </div>
                  <div className="lg:col-span-2 lg:order-3 md:row-span-1 flex items-center justify-center space-x-3">
                    <ProSocialsShare />
                    <Separator orientation="vertical" />
                    <ProWishListToggle />
                  </div>
                  <div className="lg:col-span-3 lg:order-2 md:row-span-2">
                    <ProTitle />
                    <ProReviewStar />
                    <ProPriceDisplay />
                    <ProVariantsSelector />
                    <ProQuantitySelector />
                    <ProActions />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-3 col-span-3 order-1">
            Sản phẩm đính kèm
          </div>
          <div className="lg:col-span-3 col-span-3 md:order-1 order-2">
            <ProShopInfo shop_id={shop_id} />
          </div>
          <div className="lg:col-span-3 col-span-3 md:order-1 order-2">
            <ShopVoucherSection shopId={shop_id} />
          </div>
          <div className="lg:col-span-2 col-span-3 md:order-1 order-2 space-y-5">
            <ProSpecifications />
            <ProDescriptionContent />
          </div>
          <div className="lg:col-span-1 col-span-3 md:order-2 order-1 space-y-5">
            <ProShippingInfo />
            <ProTopPicksList shopId={shop_id} />
          </div>
        </CardContent>
      </Card>

      {/* <ProductReview /> */}
    </ProWrapper>
  );
}
