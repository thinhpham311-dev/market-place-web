/**
 * Formats a date and time based on options
 * @param {Date | string | number} date - The date to format. Can be a Date object, a timestamp, or a valid date string.
 * @param {Intl.DateTimeFormatOptions} options - Formatting options for date and time.
 * @param {string} [locale='en-US'] - The locale for formatting. Defaults to 'en-US'.
 * @returns {string} - The formatted date-time string.
 */
export function formatDateTime(
    date: Date | string | number,
    options: Intl.DateTimeFormatOptions = {},
    locale: string = 'en-US'
): string {
    const validDate = new Date(date);
    if (isNaN(validDate.getTime())) {
        throw new Error("Invalid date input");
    }

    const defaultOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true, // For 12-hour format, set to false for 24-hour format.
    };

    return new Intl.DateTimeFormat(locale, { ...defaultOptions, ...options }).format(validDate);
}

