"use client";

import { useMemo } from "react";

import { useAppSelector } from "@/lib/hooks/use-storeIO";
import { translations, type TranslationKey } from "@/lib/i18n/translations";

export function useTranslation() {
  const currentLanguage = useAppSelector((state) => state.settings.language.current);

  return useMemo(() => {
    const dictionary = translations[currentLanguage] ?? translations.en;

    return {
      language: currentLanguage,
      t: (key: TranslationKey) => dictionary[key] ?? translations.en[key] ?? key,
    };
  }, [currentLanguage]);
}
