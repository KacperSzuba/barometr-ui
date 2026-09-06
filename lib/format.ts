const plNumber = new Intl.NumberFormat("pl-PL");

/** Polish number format — space as the thousands separator, as in the prototypes. */
export const formatNumber = (value: number): string => plNumber.format(value);

/**
 * Polish counts three ways, and `2 profili` is the kind of wrong that makes a screen
 * look machine-written. The caller supplies the three forms because no rule derives
 * them: `profil / profile / profili`, `pozycja / pozycje / pozycji`.
 */
export function pluralPl(count: number, one: string, few: string, many: string): string {
  if (count === 1) return `${count} ${one}`;

  const rest = count % 10;
  const teens = count % 100;
  const isFew = rest >= 2 && rest <= 4 && !(teens >= 12 && teens <= 14);

  return `${count} ${isFew ? few : many}`;
}
