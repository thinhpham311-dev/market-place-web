"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import LanguageButton from "./components/LanguageButton";
import LanguageItem from "./components/LanguageItem";

const languages = [
  { locale: "en", label: "English" },
  { locale: "vi", label: "Tiếng Việt" },
  { locale: "ja", label: "日本語" },
];

export default function LanguageSwitcher() {
  const currentLang = "en"; // Có thể dùng từ context, cookie, hoặc i18n hook

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <LanguageButton />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Chọn ngôn ngữ</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {languages.map((lang) => (
          <LanguageItem
            key={lang.locale}
            locale={lang.locale}
            label={lang.label}
            currentLang={currentLang}
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
