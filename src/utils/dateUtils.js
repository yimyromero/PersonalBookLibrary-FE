/**
 * Format a date into a short string like "Oct 20, 2025"
 * Automatically uses the browser's locale or US
 */

export function formatShortDate(date) {
    if (!date) return "";

    const userLocale = navigator.language || "en-US";

    const dateOptions = {
        month: "short",
        day: "numeric",
        year: "numeric"
    };

    return new Intl.DateTimeFormat(userLocale, dateOptions).format(new Date(date));
}