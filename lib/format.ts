const plNumber = new Intl.NumberFormat("pl-PL");

/** Polish number format — space as the thousands separator, as in the prototypes. */
export const formatNumber = (value: number): string => plNumber.format(value);
