import { ALLOWED_CRYPTOS } from "../config/allowedAssets.js";

export class SearchCryptoUseCase {
  constructor(cryptoRepository, fallbackData) {
    this.cryptoRepository = cryptoRepository;
    this.fallbackData = fallbackData;
  }

  async execute(query = "") {
    if (!query || query.trim() === "") {
      return { items: [], total: 0, error: "Search query is required" };
    }

    try {
      const result = await this.cryptoRepository.getCryptoList({});
      const filteredItems = this._searchInList(result.items, query.trim());

      return {
        items: filteredItems,
        total: filteredItems.length,
        fromCache: result.fromCache,
        fromFallback: result.fromFallback,
      };
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn("SearchCryptoUseCase failed:", error.message);
      }
      const fallbackItems = this._searchInList(
        this.fallbackData.coins,
        query.trim(),
      );
      return {
        items: fallbackItems,
        total: fallbackItems.length,
        fromCache: false,
        fromFallback: true,
      };
    }
  }

  _searchInList(items, query) {
    const normalizedQuery = query.toLowerCase();

    return items.filter((crypto) => {
      const name = crypto.name?.toLowerCase() || "";
      const symbol = crypto.symbol?.toLowerCase() || "";
      const id = crypto.id?.toLowerCase() || "";

      return (
        name.includes(normalizedQuery) ||
        symbol.includes(normalizedQuery) ||
        id.includes(normalizedQuery)
      );
    });
  }

  _filterByWhitelist(items) {
    return items.filter((crypto) => ALLOWED_CRYPTOS.includes(crypto.id));
  }
}
