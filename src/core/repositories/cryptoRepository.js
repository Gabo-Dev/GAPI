import { ALLOWED_UUIDS } from '../../core/config/allowedAssets';

export class CryptoRepository {
  constructor(apiClient, cacheRepository) {
    this.apiClient = apiClient;
    this.cacheRepository = cacheRepository;
    
    this.listCacheKey = 'crypto-list-v1';
    this.listCacheTTL = 86400000; 
    this.detailCacheTTL = 300000; 
  }

  async getCryptoList() {
    // Layer 2: Check Cache
    const cached = await this.cacheRepository.get(this.listCacheKey);
    if (cached) {
      return { items: cached, fromCache: true, fromFallback: false };
    }

    try {
      // Layer 1: API Request
      const params = new URLSearchParams();
      
      ALLOWED_UUIDS.forEach(uuid => params.append('uuids[]', uuid));

      const response = await this.apiClient.get(`/coins?${params.toString()}`);
      
      const items = response.data.coins.map(this._transformCoin);
      
      // Save to Layer 2
      await this.cacheRepository.set(this.listCacheKey, items, this.listCacheTTL);

      return { items, fromCache: false, fromFallback: false };
    } catch (error) {
      console.warn('API failed for getCryptoList, moving to Layer 3', error.message);
      // Layer 3: Fallback (We will connect fallback-data.json here in the next step)
      throw error; 
    }
  }

  async getCryptoDetails(uuid) {
    const cacheKey = `crypto-detail-${uuid}`;
    
    // Layer 2: Check Cache (Short TTL)
    const cached = await this.cacheRepository.get(cacheKey);
    if (cached) {
      return { asset: cached, fromCache: true, fromFallback: false };
    }

    try {
      // Layer 1: API Request
      const response = await this.apiClient.get(`/coin/${uuid}`);
      
      const asset = this._transformCoin(response.data.coin);

      // Save to Layer 2
      await this.cacheRepository.set(cacheKey, asset, this.detailCacheTTL);

      return { asset, fromCache: false, fromFallback: false };
    } catch (error) {
      console.warn(`API failed for getCryptoDetails (${uuid}), moving to Layer 3`, error.message);
      // Layer 3: Fallback
      throw error;
    }
  }

  /**
   * Transforms API DTO into the Domain Entity format, ensuring strict typing.
   * Parses strings to finite numbers.
   * @param {Object} coinData - Raw object from Coinranking API
   * @returns {Object} Cleaned object ready for CryptoAsset entity
   */
  _transformCoin(coinData) {
    return {
      uuid: coinData.uuid,
      symbol: coinData.symbol,
      name: coinData.name,
      description: coinData.description || '',
      rank: parseInt(coinData.rank, 10) || 0,
      price: parseFloat(coinData.price) || 0,
      change24h: parseFloat(coinData.change) || 0,
      // Map sparkline strings to numbers for Recharts
      history: Array.isArray(coinData.sparkline) 
        ? coinData.sparkline.map(priceStr => parseFloat(priceStr) || 0)
        : []
    };
  }
}