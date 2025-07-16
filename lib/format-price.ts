export function formatPrice(amount: number): string {
  return `₹ ${new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
  }).format(amount)}`;
}
