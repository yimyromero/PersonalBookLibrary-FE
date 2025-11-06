/**
 * Format a date into a short string like "Oct 20, 2025"
 * Automatically uses the browser's locale or US
 */

export const formatShortDate = (date) => {
    if (!date) return "";

    const userLocale = navigator.language || "en-US";

    const dateOptions = {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC"
    };

    return new Intl.DateTimeFormat(userLocale, dateOptions).format(new Date(date));
}

export const  normalizeDateOnly = (date) => {
 if (!date) return null;

  const d = new Date(date);

  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

export const formatForInput = (date) => {
  if (!date) return "";

  const d = new Date(date);

  // Adjust for timezone so local midnight doesn't shift the day
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}