/**
 * Validates if the provided string is a valid UUID structure for Coinranking.
 * @param {string} uuid 
 * @returns {boolean}
 */
export function isValidCryptoUuid(uuid) {
  return typeof uuid === 'string' && uuid.trim().length > 0;
}

/**
 * Validates if the price is a positive finite number.
 * @param {number} price 
 * @returns {boolean}
 */
export function isValidPrice(price) {
  return typeof price === 'number' && Number.isFinite(price) && price >= 0;
}

