"use client";

import { useMemo } from "react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAppSelector, useTranslation } from "@/lib/hooks";
import { getSubdomainFromLanguage } from "@/lib/i18n/location-subdomain";
import { type SupportedLanguage } from "@/store/settings/languageSlice";
import LanguageButton from "./components/LanguageButton";
import LanguageItem from "./components/LanguageItem";

const languages = [
  { locale: "en" as SupportedLanguage, label: "English", flag: "🇺🇸" },
  { locale: "vi" as SupportedLanguage, label: "Tiếng Việt", flag: "🇻🇳" },
  { locale: "ja" as SupportedLanguage, label: "日本語", flag: "🇯🇵" },
];

export default function LanguageSwitcher() {
  const currentLang = useAppSelector((state) => state.settings.language.current);
  const { t } = useTranslation();
  const currentLanguage = useMemo(
    () => languages.find((lang) => lang.locale === currentLang) ?? languages[0],
    [currentLang],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <LanguageButton />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>
          {t("language_label")}: {currentLanguage.flag} {currentLanguage.label}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {languages.map((lang) => (
          <LanguageItem
            key={lang.locale}
            locale={lang.locale}
            label={lang.label}
            flag={lang.flag}
            subdomain={getSubdomainFromLanguage(lang.locale)}
            currentLang={currentLang}
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
