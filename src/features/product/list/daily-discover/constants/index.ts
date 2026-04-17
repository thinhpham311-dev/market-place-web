import { QuickFilter, TrustPoint } from "../types";
import { Flame, ShieldCheck, Truck } from "lucide-react";

export const DAILY_DISCOVER_LIST = "DAILY_DISCOVER_LIST";
export const DAILY_DISCOVER_LIST_CACHE_KEY = "DAILY_DISCOVER_LIST_CACHE_KEY";
export const DAILY_DISCOVER_LIST_TAG = "DAILY_DISCOVER_LIST_TAG";
export const DAILY_DISCOVER_LIST_TTL = 5 * 60 * 1000; // 5 minutes
export const DAILY_DISCOVER_LIST_RETRIES = 2;
export const DAILY_DISCOVER_LIST_RETRY_DELAY = 500; // 0.5 second
export const DEFAULT_FILTER_KEY = "recommended";

export const quickFilters: QuickFilter[] = [
  {
    key: "popular",
    labelKey: "popular_tab",
    descriptionKey: "daily_discover_popular_desc",
    sortBy: "popular_desc",
  },
  {
    key: "bundle-deals",
    labelKey: "bundle_deals_tab",
    descriptionKey: "daily_discover_bundle_deals_desc",
    sortBy: "price_asc",
  },
  {
    key: "recommended",
    labelKey: "recommended_tab",
    descriptionKey: "daily_discover_recommended_desc",
    sortBy: "ctime",
  },
  {
    key: "trending",
    labelKey: "trending_deals_tab",
    descriptionKey: "daily_discover_trending_desc",
    sortBy: "popular_desc",
  },
  {
    key: "fast-delivery",
    labelKey: "fast_delivery_tab",
    descriptionKey: "daily_discover_fast_delivery_desc",
    sortBy: "ctime",
  },
  {
    key: "top-rated",
    labelKey: "top_rated_tab",
    descriptionKey: "daily_discover_top_rated_desc",
    sortBy: "ctime",
  },
  {
    key: "best-value",
    labelKey: "best_value_tab",
    descriptionKey: "daily_discover_best_value_desc",
    sortBy: "price_asc",
  },
  {
    key: "fresh-arrivals",
    labelKey: "fresh_arrivals_tab",
    descriptionKey: "daily_discover_fresh_arrivals_desc",
    sortBy: "ctime",
  },
] as const;

export const trustPoints: TrustPoint[] = [
  {
    icon: Truck,
    labelKey: "daily_discover_trust_fast_dispatch",
    descriptionKey: "daily_discover_trust_fast_dispatch_desc",
  },
  {
    icon: ShieldCheck,
    labelKey: "daily_discover_trust_trusted_sellers",
    descriptionKey: "daily_discover_trust_trusted_sellers_desc",
  },
  {
    icon: Flame,
    labelKey: "daily_discover_trust_hot_pricing",
    descriptionKey: "daily_discover_trust_hot_pricing_desc",
  },
] as const;
