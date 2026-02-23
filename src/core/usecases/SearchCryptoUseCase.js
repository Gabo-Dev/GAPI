import { ALLOWED_UUIDS } from "../config/allowedAssets.js";

export class SearchCryptoUseCase {
  constructor(cryptoRepository) {
    this.cryptoRepository = cryptoRepository;
  }

  async execute(query = "") {
    if (!query || query.trim() === "") {
      return { items: [], total: 0, error: "Search query is required" };
    }

    // Always search over the complete list
    const result = await this.cryptoRepository.getCryptoList();
    const filteredItems = this._searchInList(result.items, query.trim());

    return {
      items: filteredItems,
      total: filteredItems.length,
      fromCache: result.fromCache,
      fromFallback: result.fromFallback,
    };
  }

  _searchInList(items, query) {
    const normalizedQuery = query.toLowerCase();

    return items.filter((crypto) => {
      // Domain Rule: Only search within whitelist
      if (!ALLOWED_UUIDS.includes(crypto.uuid)) return false;

      const name = crypto.name?.toLowerCase() || "";
      const symbol = crypto.symbol?.toLowerCase() || "";

      return (
        name.includes(normalizedQuery) ||
        symbol.includes(normalizedQuery)
      );
    });
  }
}