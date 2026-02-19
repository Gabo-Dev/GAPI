import { ALLOWED_CRYPTOS } from "../config/allowedAssets.js";

const UUID_TO_ID_MAP = {
  Qwsogvtv82FCd: "bitcoin",
  razxDUgYGNAdQ: "pi-network",
};

export class GetCryptoDetailsUseCase {
  constructor(cryptoRepository, fallbackData) {
    this.cryptoRepository = cryptoRepository;
    this.fallbackData = fallbackData;
  }

  async execute(uuid) {
    if (!uuid || typeof uuid !== "string") {
      return { error: "Valid crypto UUID is required" };
    }

    if (!this._isWhitelisted(uuid)) {
      return { error: "Crypto is not in whitelist" };
    }

    try {
      const result = await this.cryptoRepository.getCryptoDetails(uuid);
      return {
        ...result,
        fromFallback: false,
      };
    } catch (error) {
      if (import.meta.env.DEV)
        console.warn("GetCryptoDetailsUseCase failed:", error.message);
      const fallbackCoin = this.getFromFallback(uuid);

      if (fallbackCoin) {
        return {
          ...fallbackCoin,
          fromCache: true,
          fromFallback: true,
        };
      }

      return { error: "Crypto details not available" };
    }
  }

  _isWhitelisted(uuid) {
    const id = UUID_TO_ID_MAP[uuid];
    return id && ALLOWED_CRYPTOS.includes(id);
  }

  _getFromFallback(uuid) {
    const id = UUID_TO_ID_MAP[uuid];

    if (!id) return null;

    const coin = this.fallbackData.coins.find((coin) => coin.id === id);

    if (!coin) return null;

    return {
      id: coin.id,
      symbol: coin.symbol,
      name: coin.name,
      price: coin.price,
      change: coin.change,
      rank: coin.rank,
      uuid: uuid,
    };
  }
}
