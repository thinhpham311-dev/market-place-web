"use client";

import * as React from "react";
import { Check, MonitorCog, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/hooks";
import { cn } from "@/utils/styles";

export default function ThemeToggle() {
  const { t } = useTranslation();
  const { setTheme, theme } = useTheme();
  const themeOptions = [
    { label: t("theme_light"), value: "light", icon: Sun },
    { label: t("theme_dark"), value: "dark", icon: Moon },
    { label: t("theme_system"), value: "system", icon: MonitorCog },
  ];

  const handleSetTheme = (theme: string) => {
    setTheme(theme);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-5 w-5 transition-transform dark:rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
          <span className="sr-only">{t("theme_toggle_sr_only")}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {themeOptions.map(({ label, value, icon: Icon }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => handleSetTheme(value)}
            className={cn(
              theme === value &&
                (value === "system"
                  ? "bg-sky-100 text-sky-900 dark:bg-sky-950/60 dark:text-sky-100"
                  : "bg-stone-100 text-stone-900 dark:bg-stone-800 dark:text-stone-50"),
            )}
          >
            <Check className={theme === value ? "opacity-100" : "opacity-0"} />
            <Icon
              className={cn("h-4 w-4", value === "system" && "text-sky-600 dark:text-sky-300")}
            />
            <span>{label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
