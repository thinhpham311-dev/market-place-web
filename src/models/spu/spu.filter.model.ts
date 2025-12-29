export interface SpuFilterModel {
  categoryId?: string;
  brandId?: string;
  price?: {
    min?: number;
    max?: number;
  };
}
