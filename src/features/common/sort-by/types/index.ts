import type { TranslationKey } from "@/lib/i18n/translations";

export type Sort = {
  label: string;
  value: string;
  labelKey?: TranslationKey;
};
