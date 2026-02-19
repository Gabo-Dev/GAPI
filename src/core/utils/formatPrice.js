export function formatPrice(price, currency = "USD") {
  const numericPrice = parseFloat(price);

  if (isNaN(numericPrice)) return "-";

  const symbols = { USD: "$", EUR: "€", JPY: "¥" };
  const symbol = symbols[currency] || "$";

  const decimals = numericPrice >= 1.0 ? 2 : 4;
  const formatted = numericPrice.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return `${symbol}${formatted}`;
}
