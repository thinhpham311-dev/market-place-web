export interface IShopModel {
  shop_id: string;
  shop_name: string;
  shop_email: string;
  shop_phone?: string;
  shop_address?: string;
  shop_slug: string;
  shop_total_product?: number | string;
  total_product?: number | string;
  total_products?: number | string;
  product_count?: number | string;
  products_count?: number | string;
  is_following?: boolean | number | string;
  isFollowed?: boolean | number | string;
  is_followed?: boolean | number | string;
  following?: boolean | number | string;
}
