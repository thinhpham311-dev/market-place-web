import { ISpuModel } from '@/models/spu';

export type ScoredProduct = {
  product: ISpuModel;
  score: number;
};