import { ALLOWED_CRYPTOS } from "..config/allowedAssets.js";

export class GetCryptoListUseCase {
  constructor(cryptoRepository, fallbackData) {
    this.cryptoRepository = cryptoRepository;
    this.fallbackData = fallbackData;
  }

  async execute(params = {}) {
    try {
      const result = await this.cryptoRepository.getCryptoList(params);

      const filteredItems = this._filterByWhitelist(result.items);

      return {
        ...result,
        items: filteredItems,
        total: filteredItems.length,
      };
    } catch (error) {
      if (import.meta.env.DEV)
        console.warn("GetCryptoListUseCase failed:", error.message);
      return this._getFallbackData();
    }
  }

  _filterByWhitelist(items) {
    return items.filter((crypto) => ALLOWED_CRYPTOS.includes(crypto.id));
  }

  _getFallbackData() {
    return {
      items: this.fallbackData.coins,
      total: this.fallbackData.coins.length,
      fromCache: true,
      fromFallback: true,
    };
  }
}
