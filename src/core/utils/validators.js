export function isValidCryptoId(id) {
  return typeof id === 'string' && id.trim().length > 0;
}

export function isValidPrice(price) {
  return typeof price === 'number' && Number.isFinite(price) && price >= 0;
}

export function isValidCurrency(currency) {
  const allowed = ['USD', 'EUR', 'JPY'];
  return allowed.includes(currency);
}