/**
 * Formats a raw price into a USD string with smart decimals.
 * - Prices >= 1.00: 2 decimals (e.g., $55,828.56)
 * - Prices < 1.00: 4 decimals (e.g., $0.1371)
 * * @param {number|string} price - The raw price to format
 * @returns {string} Formatted USD price string
 */
export function formatPrice(price) {
  const numericPrice = parseFloat(price);

  if (isNaN(numericPrice)) return "-";


  const decimals = numericPrice >= 1.0 ? 2 : 4;
  const formatted = numericPrice.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return `${formatted}`;
}
