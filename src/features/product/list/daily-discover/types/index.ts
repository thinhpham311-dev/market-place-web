import type { LucideIcon } from "lucide-react";
import type { TranslationKey } from "@/lib/i18n/translations";
import type { SortBy } from "@/types/common/sort";
import type { ISpuModel } from "@/models/spu";

export type DailyDiscoverFilterKey =
  | "popular"
  | "bundle-deals"
  | "recommended"
  | "trending"
  | "fast-delivery"
  | "top-rated"
  | "best-value"
  | "fresh-arrivals";

export type QuickFilter = {
  key: DailyDiscoverFilterKey;
  labelKey: TranslationKey;
  descriptionKey: TranslationKey;
  sortBy: SortBy;
};

export type TrustPoint = {
  icon: LucideIcon;
  labelKey: TranslationKey;
  descriptionKey: TranslationKey;
};

export interface DailyDiscoverContextType {
  activeFilter: DailyDiscoverFilterKey;
  activeFilterConfig: QuickFilter;
  displayProducts: ISpuModel[];
  totalItems: number;
  loading: boolean;
  error: string | null;
  handleSelectFilter: (filterKey: DailyDiscoverFilterKey) => void;
}
