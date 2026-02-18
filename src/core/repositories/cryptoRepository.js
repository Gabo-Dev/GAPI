export class CryptoRepository {
    constructor(apiClient, cacheRepository) {
        this.apiClient = apiClient;
        this.cacheRepository = cacheRepository;
    }

    async getCryptoList(params = {}){
        const cached = await this.cacheRepository.getCryptoList('crypto-list');

        if(cached) return {items: cached, total: cached.length, fromCache: true};

        const response = await this.apiClient.get('/coins', {params});
        const cryptos = response.data.coins;

        await this.cacheRepository.set('crypto-list', cryptos);

        return {items: cryptos, total: cryptos.length, fromCache: false};
    }

    async getCryptoDetails(uuid){
        const response = await this.apiClient.get(`/coins/${uuid}`);
        return response.data.coin;
    }

    async getCryptoHistory(uuid, timeframe = '24h'){
        const response = await this.apiClient.get(`/coins/${uuid}/history`, {params: {timePeriod: timeframe}});
        return response.data.change;
    }
}