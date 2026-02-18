/**
 * @typedef {Object} CryptoAssetParams
 * @property {string} id
 * @property {string} symbol
 * @property {string} name
 * @property {number} price
 * @property {number} change24h
 * @property {string} description
 * @property {number} rank
 * @property {number[]} history 
 */

export class CryptoAsset {
  constructor({
    id,
    symbol,
    name,
    price,
    change24h = 0 ,
    description = '',
    rank = 0,
    history = []
  }){
    if(typeof id !== 'string' || id.trim() === '') throw new TypeError('CryptoAsset: id must be a non-empty string');
    if(typeof symbol !== 'string' || symbol.trim() === '') throw new TypeError('CryptoAsset: symbol must be a non-empty string');
    if(typeof name !== 'string' || name.trim() === '') throw new TypeError('CryptoAsset: name must be a non-empty string');
    if(typeof price !== 'number' || price < 0 || !Number.isFinite(price)) throw new TypeError('CryptoAsset: price must be a non-negative finite number');
    if(typeof change24h !== 'number' || !Number.isFinite(change24h)) throw new TypeError('CryptoAsset: change24h must be a non-negative finite number');
    if(typeof description !== 'string') throw new TypeError('CryptoAsset: description must be a string');
    if(typeof rank !== 'number' || rank < 0 || !Number.isInteger(rank)) throw new TypeError('CryptoAsset: rank must be a non-negative integer');
    if(!Array.isArray(history)) throw new TypeError('CryptoAsset: history must be an array');
    this.id = id;
    this.symbol = symbol;
    this.name = name;
    this.price = price;
    this.change24h = change24h;
    this.description = description;
    this.rank = rank;
    this.history = history;
  }

  /**
   * Returns the trend direction based on 24h change.
   * @returns {'up' | 'down' | 'neutral'}
  */
  get trend() {
    if(this.change24h > 0) return 'up';
    if(this.change24h < 0) return 'down';
    return 'neutral';
  }

  /**
   * Checks if prices is below 1.00 (for decimal formatting)
   * @returns {boolean}
   */
  isLowPrice() {
    return this.price < 1.00;
  }

  /**
   * Creates a plain object representation (for serialization)
   * @returns {CryptoAssetParams}
   */
  toJSON() {
    return {
      id: this.id,
      symbol: this.symbol,
      name: this.name,
      price: this.price,
      change24h: this.change24h,
      description: this.description,
      rank: this.rank,
      history: this.history
    };
  }
}