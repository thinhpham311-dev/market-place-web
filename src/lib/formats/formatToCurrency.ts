export const formatToCurrency = (
    cents: number,
    currency: string = "USD",
    locale: string = "en-US"
): string => {
    return cents.toLocaleString(locale, {
        style: "currency",
        currency: currency,
    });
};
