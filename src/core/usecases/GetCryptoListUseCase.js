import { ALLOWED_UUIDS } from "../config/allowedAssets.js";

export class GetCryptoListUseCase {
  constructor(cryptoRepository) {
    this.cryptoRepository = cryptoRepository;
  }

  async execute(params = {}) {
    const result = await this.cryptoRepository.getCryptoList(params);

    // Domain Rule: Ensure strictly only whitelisted UUIDs pass through
    const filteredItems = this._filterByWhitelist(result.items);

    return {
      ...result,
      items: filteredItems,
      total: filteredItems.length,
    };
  }

  _filterByWhitelist(items) {
    return items.filter((crypto) => ALLOWED_UUIDS.includes(crypto.uuid));
  }
}