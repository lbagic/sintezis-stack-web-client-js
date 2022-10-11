/**
 * @param { number } price Price.
 * @param {{
 *  useFractions?: boolean
 *  fractionDigits?: number
 *  currency?: string
 *  locale?: string
 * }} options Format price options.
 * @returns { string }  Returns formatted price.
 */

export function formatPrice(price, options = undefined) {
  const fractionDigits = options?.useFractions
    ? options?.fractionDigits ?? 2
    : 0;
  const locale = options?.locale ?? "en-US";
  const currency = options?.currency ?? "USD";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
  }).format(price);
}
