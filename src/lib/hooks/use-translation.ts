"use client";

import { useMemo } from "react";

import { useAppSelector } from "@/lib/hooks/use-storeIO";
import { translations, type TranslationKey } from "@/lib/i18n/translations";
import type { RootState } from "@/store";
import type { SupportedLanguage } from "@/store/settings/languageSlice";

export function useTranslation() {
  const currentLanguage = useAppSelector(
    (state: RootState): SupportedLanguage => state.settings.language.current,
  );

  return useMemo(() => {
    const dictionary = translations[currentLanguage] ?? translations.en;

    return {
      language: currentLanguage,
      t: (key: TranslationKey) => dictionary[key] ?? translations.en[key] ?? key,
    };
  }, [currentLanguage]);
}
