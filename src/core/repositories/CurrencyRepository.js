export class CurrencyRepository {
    constructor(apiClient, cacheRepository) {
        this.apiClient = apiClient;
        this.cacheRepository = cacheRepository;
        this.cacheKey = 'currency-rates';
        this.cacheTTL = 3600000;
    }

    async getExchangeRates() {
        try {
            const cached = await this.cacheRepository.get(this.cacheKey);

            if(cached){
                return{
                    rates: cached,
                    fromCache: true,
                    fromFallback: false
                };
            }

            const response = await this.apiClient.get('/rates',{
                params: {
                    referenceCurrencyUuid: 'yhjMzLPhuIDl'
                }
            });

            const rates = this._tranformRates(response.data);

            await this.cacheRepository.set(this.cacheKey, rates, this.cacheTTL);
            
            return{
                rates,
                fromCache: false,
                fromFallback: false
            };
        } catch (error) {
            if (import.meta.env.DEV)
                console.warn("GetExchangeRatesUseCase failed:", error.message);
            return{
                rates: this._getDefaultRates(),
                fromCache: true,
                fromFallback: true
            };
        }
    }    

    _tranformRates(apiResponse){
        const rates = {};

        const allowedCurrencies = ['USD', 'EUR', 'JPY'];

        apiResponse.rates?.forEach(({currency, rate}) => {
            if(allowedCurrencies.includes(currency)){
                rates[currency] = parseFloat(rate) || 0;
            }
        });
        
        if(!rates.USD){
            rates.USD = 1;
        }

        return rates;
    }

    _getDefaultRates(){
        // Default rates for API or Cache failure
        return {
            USD: 1,
            EUR: 0.92,
            JPY: 149.50
        };
    }
}