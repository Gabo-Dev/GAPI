import { ALLOWED_UUIDS } from "../config/allowedAssets";
import fallbackData from "../../infrastructure/data/fallback-data.json";

export class CryptoRepository {
  constructor(apiClient, cacheRepository) {
    this.apiClient = apiClient;
    this.cacheRepository = cacheRepository;
    this.listCacheKey = "crypto-list-v2";
    this.listCacheTTL = 86400000;
  }

  async getCryptoList() {
    const cached = await this.cacheRepository.get(this.listCacheKey);
    if (cached) return { items: cached, source: "cache" };

    try {
      const params = new URLSearchParams();
      ALLOWED_UUIDS.forEach((uuid) => params.append("uuids[]", uuid));

      const response = await this.apiClient.get(`/coins?${params.toString()}`);
      const normalized = response.data.coins.map((coin) =>
        this._transformCoin(coin),
      );

      await this.cacheRepository.set(
        this.listCacheKey,
        normalized,
        this.listCacheTTL,
      );
      return { items: normalized, source: "api" };
    } catch (_error) {
      if (import.meta.env.DEV){
        console.warn("Error fetching crypto list:", _error.message);
      }
      const staticItems = fallbackData.data.coins.map((coin) =>
        this._transformCoin(coin),
      );
      return { items: staticItems, source: "static_fallback" };
    }
  }

  _transformCoin(coinData) {
    const symbol = coinData.symbol;
    const staticResort = fallbackData.data.coins.find(
      (c) => c.symbol === symbol,
    );

    return {
      uuid: coinData.uuid,
      symbol: symbol,
      name: coinData.name,
      rank: parseInt(coinData.rank, 10) || staticResort?.rank || 0,
      price: parseFloat(coinData.price) || parseFloat(staticResort?.price) || 0,
      change24h:
        parseFloat(coinData.change24h) ||
        parseFloat(coinData.change) ||
        parseFloat(staticResort?.change) ||
        0,
      description:
        coinData.description?.trim() ||
        staticResort?.description ||
        "Sincronizando...",
      iconUrl: coinData.iconUrl || staticResort?.iconUrl || "",
      history: Array.isArray(coinData.sparkline)
        ? coinData.sparkline.map((p) => parseFloat(p) || 0)
        : staticResort?.sparkline?.map((p) => parseFloat(p)) || [],
    };
  }
}
