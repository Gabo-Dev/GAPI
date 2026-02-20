import { ALLOWED_CRYPTOS } from "../config/allowedAssets";

export class CryptoRepository {
  constructor(apiClient, cacheRepository) {
    this.apiClient = apiClient;
    this.cacheRepository = cacheRepository;
    this.cacheKey = "crypto-list";
    this.cacheTTL = 86400000; // 1 day
  }

  async getCryptoList(params = {}) {
    const cached = await this.cacheRepository.getCryptoList(this.cacheKey);

    if (cached)
      return {
        items: cached,
        total: cached.length,
        fromCache: true,
        fromFallback: false,
      };

    const response = await this.apiClient.get("/coins", {
      params: {
        ...params,
        symbols: ALLOWED_CRYPTOS.join(","),
        limit: ALLOWED_CRYPTOS.length,
      },
    });

    const items = this._transformCoins(response.data.coins);

    await this.cacheRepository.set(this.cacheKey, items, this.cacheTTL);

    return {
      items,
      total: items.length,
      fromCache: false,
      fromFallback: false,
    };
  }

  async getCryptoDetails(uuid) {
    const response = await this.apiClient.get(`/coin/${uuid}`);
    return {
      ...this._transformCoins(response.data.coin),
      fromCache: false,
      fromFallback: false,
    };
  }

  async getCryptoHistory(uuid, timeframe = "24h") {
    const timePeriod = this._mapTimeframeToPeriod(timeframe);

    const response = await this.apiClient.get(`/coin/${uuid}/history`, {
      params: {
        timePeriod,
      },
    });

    const history = this._transformHistory(response.data.history);

    return {
      data: history,
      timeframe,
      fromCache: false,
      fromFallback: false,
    };
  }

  _transformCoins(coins) {
    return coins
      .filter((coin) => ALLOWED_CRYPTOS.includes(coin.id))
      .map((coin) => ({
        id: coin.id,
        uuid: coin.uuid,
        symbol: coin.symbol,
        name: coin.name,
        price: coin.price,
        change: coin.change,
        rank: coin.rank,
        iconUrl: coin.iconUrl,
      }));
  }

  _transformCoinDetail(coin) {
    return {
      id: coin.id,
      uuid: coin.uuid,
      symbol: coin.symbol,
      name: coin.name,
      price: coin.price,
      change: coin.change,
      rank: coin.rank,
      iconUrl: coin.iconUrl,
      description: coin.description,
      websiteUrl: coin.websiteUrl,
      supply: coin.supply,
      allTimeHigh: coin.allTimeHigh?.price,
    };
  }

  _transformHistory(changeHistory) {
    return (
      changeHistory?.map((item) => ({
        price: parseFloat(item.price),
        timestamp: item.timestamp * 1000,
      })) || []
    );
  }

  _mapTimeframeToPeriod(timeframe) {
    const map = {
      "24h": "24h",
      "7d": "7d",
      "30d": "30d",
      "3m": "3m",
      "1y": "1y",
    };
    return map[timeframe] || "24h";
  }
}
