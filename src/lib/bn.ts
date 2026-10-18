const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/** Convert Western digits in a value to Bengali digits (০-৯). */
export const toBnDigits = (value: string | number): string =>
  String(value).replace(/[0-9]/g, (digit) => BN_DIGITS[Number(digit)]);

/** Format an ISO date as a Bengali date, guaranteeing Bengali numerals. */
export const formatBnDate = (iso: string): string =>
  toBnDigits(
    new Date(iso).toLocaleDateString("bn-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  );
