export const formatToCurrency = (
    cents: number,
    currency: string = "USD",
    locale: string = "en-US"
): string => {
    return (cents / 1).toLocaleString(locale, {
        style: "currency",
        currency: currency,
    });
};
