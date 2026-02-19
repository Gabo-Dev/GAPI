import { ALLOWED_CRYPTOS } from "../config/allowedAssets.js";

const UUID_TO_ID_MAP = {
  Qwsogvtv82FCd: "bitcoin",
  razxDUgYGNAdQ: "pi-network",
};

export class GetCryptoHistoryUseCase {
  constructor(cryptoRepository, fallbackData) {
    this.cryptoRepository = cryptoRepository;
    this.fallbackData = fallbackData;
  }

  async execute(uuid, timeframe = "24h") {
    if (!uuid || typeof uuid !== "string") {
      return { error: "Valid crypto UUID is required" };
    }

    const allowedTimeframes = ["24h", "7d", "30d", "3m", "1y"];
    if (!allowedTimeframes.includes(timeframe)) {
      return { error: "Invalid timegrame", data: [] };
    }

    if (!this._isWhitelisted(uuid)) {
      return { error: "Crypto is not in whitelist", data: [] };
    }

    try {
      const result = await this.cryptoRepository.getCryptoHistory(
        uuid,
        timeframe,
      );

      return {
        data: result,
        timeframe,
        fromFallback: false,
      };
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn("GetCryptoHistoryUseCase failed:", error.message);
      }

      const fallbackHistory = this._generateFallbackHistory(uuid, timeframe);
      return {
        data: fallbackHistory,
        timeframe,
        fromCache: true,
        fromFallback: true,
      };
    }
  }

  _isWhitelisted(uuid) {
    const id = UUID_TO_ID_MAP[uuid];
    return ALLOWED_CRYPTOS.includes(id);
  }

  _generateFallbackHistory(uuid, timeframe) {
    const id = UUID_TO_ID_MAP[uuid];
    const coin = this.fallbackData.coins.find((coin) => coin.id === id);

    if (!coin) return [];

    const basePrice = parseFloat(coin.price) || 0;
    const points = this._getPointForTimeframe(timeframe);
    const history = [];

    // Generate simulated history data usign controlled random variation
    for (let i = 0; i < points; i++) {
      const variation = (Math.random() - 0.5) * 0.1; // ±5% variación
      const price = basePrice * (1 + variation);
      const timestamp =
        Date.now() - (points - i) * this._getIntervalMs(timeframe);

      history.push({
        price: price.toFixed(coin.price.includes(".") ? 4 : 2),
        timestamp,
      });
    }

    return history;
  }

  _getPointForTimeframe(timeframe) {
    const map = {
      "24h": 24,
      "7d": 7,
      "30d": 30,
      "3m": 13,
      "1y": 12,
    };

    return map[timeframe] || 24;
  }

  _getIntervalMs(timeframe) {
    const map = {
      "24h": 3600000,
      "7d": 86400000,
      "30d": 86400000,
      "3m": 604800000,
      "1y": 2592000000,
    };
    return map[timeframe] || 3600000;
  }
}
