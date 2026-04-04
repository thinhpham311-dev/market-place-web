import { getCurrentCurrencyDisplayConfig } from "@/lib/i18n/currency";

export const formatToCurrency = (amount: number, currency?: string, locale?: string): string => {
  const fallbackConfig = getCurrentCurrencyDisplayConfig();
  const resolvedCurrency = currency ?? fallbackConfig.currency;
  const resolvedLocale = locale ?? fallbackConfig.locale;

  return Number(amount || 0).toLocaleString(resolvedLocale, {
    style: "currency",
    currency: resolvedCurrency,
  });
};
