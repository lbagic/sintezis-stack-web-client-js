const defaults = {
  currency: "USD",
  fractionDigits: 2,
  locale: "en-US",
};

type CurrencyFormatOptions = {
  currency?: Intl.NumberFormatOptions["currency"];
  locale?: string;
  fractionDigits?: number;
};

export function createCurrencyFormatter(options?: CurrencyFormatOptions) {
  return new Intl.NumberFormat(options?.locale ?? defaults.locale, {
    style: "currency",
    currency: options?.currency ?? defaults.currency,
    maximumFractionDigits: options?.fractionDigits ?? defaults.fractionDigits,
    minimumFractionDigits: options?.fractionDigits ?? defaults.fractionDigits,
  });
}
const defaultCurrencyFormatter = createCurrencyFormatter();

export function formatCurrency(price: number, options?: CurrencyFormatOptions) {
  const formatter = options
    ? createCurrencyFormatter(options)
    : defaultCurrencyFormatter;
  return formatter.format(price);
}
