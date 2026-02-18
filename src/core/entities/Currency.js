export class Currency{
    constructor (code, symbol, rate = 1){
        if (typeof code !== 'string' || code.trim() === '') throw new TypeError('Currency: code must be a non-empty string');
        if (typeof symbol !== 'string' || symbol.trim() === '') throw new TypeError('Currency: symbol must be a non-empty string');
        if (typeof rate !== 'number' || rate < 0 || !Number.isFinite(rate)) throw new TypeError('Currency: rate must be a non-negative finite number');
        
        this.code = code;
        this.symbol = symbol;
        this.rate = rate;
    }

    /**
     * Converts a price from USD to this currency
     * @param {number} priceInUSD 
     * @returns {number}
     */
    convertFromUSD(priceInUSD){
        if (typeof priceInUSD !== 'number' || priceInUSD < 0) throw new TypeError('Currency: priceInUSD must be a non-negative number');
        return priceInUSD * this.rate;
    }

    /**
     * Creates a plain object representation
     * @returns {{code: string, symbol: string, rate: number}}
     */
    toJSON(){
        return {
            code: this.code,
            symbol: this.symbol,
            rate: this.rate
        };
    }
}

// Pre-defined currency instances (Singletons)
export const USD = new Currency('USD', '$', 1);
export const EUR = new Currency('EUR', '€', 1.08);