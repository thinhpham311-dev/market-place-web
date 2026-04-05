import type { Sort } from "@/features/common/sort-by/types";

export const PRO_LIST_BY_CATEGORYID = "PRO_LIST_BY_CATEGORYID";
export const PRO_LIST_BY_CATEGORYID_CACHE_KEY = "PRO_LIST_BY_CATEGORYID_CACHE_KEY";
export const PRO_LIST_BY_CATEGORYID_TAG = "PRO_LIST_BY_CATEGORYID_TAG";
export const PRO_LIST_BY_CATEGORYID_TTL = 5 * 60 * 1000; // 5 minutes
export const PRO_LIST_BY_CATEGORYID_RETRIES = 2;
export const PRO_LIST_BY_CATEGORYID_RETRY_DELAY = 500; // 0.5 second

export const SORTBY_OPTIONS: Sort[] = [
  { label: "Newest", labelKey: "sort_newest", value: "ctime" },
  { label: "Popularity", labelKey: "sort_popularity", value: "pop" },
  { label: "Price: Low to High", labelKey: "sort_price_low_to_high", value: "asc" },
  { label: "Price: High to Low", labelKey: "sort_price_high_to_low", value: "desc" },
];

export const FILTER_OPTIONS = [
  {
    label: "Brands",
    labelKey: "brands",
    key: "brands",
    type: "checkbox",
    items: [
      { label: "Nike", value: "nike" },
      { label: "Adidas", value: "adidas" },
      { label: "Puma", value: "puma" },
      { label: "Converse", value: "converse" },
      { label: "Vans", value: "vans" },
      { label: "New Balance", value: "new-balance" },
      { label: "Reebok", value: "reebok" },
      { label: "Asics", value: "asics" },
      { label: "Fila", value: "fila" },
      { label: "Under Armour", value: "under-armour" },
    ],
  },
  {
    label: "Conditions",
    labelKey: "conditions",
    key: "conditions",
    type: "checkbox",
    items: [
      { label: "Used", labelKey: "used", value: "used" },
      { label: "New with tag", labelKey: "new_with_tag", value: "new" },
    ],
  },
  {
    label: "Promotions",
    labelKey: "promotions",
    key: "promotions",
    type: "checkbox",
    items: [
      { label: "On sale", labelKey: "on_sale", value: "sale" },
      { label: "Clearance Sale", labelKey: "clearance_sale", value: "clearance" },
      { label: "Ready Stock", labelKey: "ready_stock", value: "stock" },
      { label: "Whole Sale", labelKey: "whole_sale", value: "wholesale" },
      { label: "Anything Cheap", labelKey: "anything_cheap", value: "cheap" },
    ],
  },
  {
    label: "Services",
    labelKey: "services",
    key: "services",
    type: "checkbox",
    items: [
      { label: "Free Shipping", labelKey: "free_shipping", value: "free-shipping" },
      { label: "COD Available", labelKey: "cod_available", value: "cod" },
      { label: "7-day Return", labelKey: "return_7_days", value: "return" },
      { label: "Warranty Included", labelKey: "warranty_included", value: "warranty" },
    ],
  },
  {
    label: "Ratings",
    labelKey: "ratings",
    key: "ratings",
    type: "checkbox",
    items: [
      { label: "1 Star", labelKey: "star_1", value: 1 },
      { label: "2 Star", labelKey: "star_2", value: 2 },
      { label: "3 Star", labelKey: "star_3", value: 3 },
      { label: "4 Star", labelKey: "star_4", value: 4 },
      { label: "5 Star", labelKey: "star_5", value: 5 },
    ],
  },
];
