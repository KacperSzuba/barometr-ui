type ClassValue = string | false | null | undefined;

/** Joins class names, skipping empty values. */
export const cx = (...values: ClassValue[]): string => values.filter(Boolean).join(" ");
