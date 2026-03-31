"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useAppDispatch } from "@/lib/hooks";
import { buildLocalizedUrl } from "@/lib/i18n/location-subdomain";
import { setLanguage, type SupportedLanguage } from "@/store/settings/languageSlice";

interface Props {
  locale: SupportedLanguage;
  label: string;
  flag: string;
  subdomain: string;
  currentLang: string;
}

export default function LanguageItem({ locale, label, flag, subdomain, currentLang }: Props) {
  const dispatch = useAppDispatch();
  const isActive = locale === currentLang;

  const handleChangeLanguage = () => {
    dispatch(setLanguage(locale));

    if (typeof window !== "undefined") {
      const targetUrl = buildLocalizedUrl(window.location.href, locale);

      if (targetUrl !== window.location.href) {
        window.location.assign(targetUrl);
      }
    }
  };

  return (
    <DropdownMenuItem
      onSelect={handleChangeLanguage}
      disabled={isActive}
      className={isActive ? "bg-stone-100 text-stone-900 dark:bg-stone-800 dark:text-stone-50" : ""}
    >
      <span className="text-base leading-none">{flag}</span>
      <span className="flex-1">{label}</span>
      <span className="rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
        {subdomain}
      </span>
    </DropdownMenuItem>
  );
}
