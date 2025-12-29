export interface ISpuFilter {
  categoryId?: string;
  brandId?: string;
  price?: {
    min?: number;
    max?: number;
  };
}
