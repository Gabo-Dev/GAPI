import { ALLOWED_UUIDS } from "../config/allowedAssets.js";
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
			if (import.meta.env.DEV) {
				console.warn("Error fetching crypto list:", _error.message);
			}
			const staticItems = fallbackData.data.coins.map((coin) =>
				this._transformCoin(coin),
			);
			return { items: staticItems, source: "static_fallback" };
		}
	}

	/**
	 * Get historical price for a specific coin and specified time period (e.g., 24h, 7d, 30d, 1y)
	 * Apply dynamic cache (Multi-Key) and intelligent TTL for rate-limit protection
	 * @param {string} uuid
	 * @param {string} timePeriod
	 */
	async getCryptoHistory(uuid, timePeriod = "24h") {
		const cacheKey = `crypto-history-${uuid}-${timePeriod}`;

		const cached = await this.cacheRepository.get(cacheKey);
		if (cached) return { history: cached, source: "cache" };

		try {
			const response = await this.apiClient.get(`/coin/${uuid}/price-history`, {
				params: { timePeriod },
			});

			const historyData = response.data.history
				.map((point) => {
					const price = parseFloat(point.price);
					const timestamp = parseInt(point.timestamp, 10) * 1000;
					return {
						price: Number.isFinite(price) ? price : 0,
						timestamp: Number.isFinite(timestamp) ? timestamp : 0,
					};
				})
				.reverse();

			const ttl = timePeriod === "24h" ? 3600000 : 86400000;
			await this.cacheRepository.set(cacheKey, historyData, ttl);

			return { history: historyData, source: "api" };
		} catch (error) {
			if (import.meta.env.DEV) {
				console.warn(
					`Error fetching history for ${uuid} (${timePeriod}):`,
					error.message,
				);
			}
			const staticCoin = fallbackData.data.coins.find((c) => c.uuid === uuid);
			const rawHistory =
				staticCoin?.history?.[timePeriod] || staticCoin?.history?.["24h"] || [];

			const fallbackHistory = rawHistory.map((point) => {
				const price = parseFloat(point.price);
				const ts =
					(typeof point.timestamp === "number"
						? point.timestamp
						: parseInt(point.timestamp, 10)) * 1000;
				return {
					price: Number.isFinite(price) ? price : 0,
					timestamp: Number.isFinite(ts) ? ts : 0,
				};
			});
			return { history: fallbackHistory, source: "static_fallback" };
		}
	}
	_transformCoin(coinData) {
		if (!coinData || typeof coinData !== "object") {
			throw new TypeError(
				"CryptoRepository: coinData must be a non-null object",
			);
		}

		const symbol = coinData.symbol || "UNKNOWN";
		const staticResort = fallbackData.data.coins.find(
			(c) => c.symbol === symbol,
		);

		const price = parseFloat(coinData.price);
		const change24h =
			parseFloat(coinData.change24h) || parseFloat(coinData.change);
		const rank = parseInt(coinData.rank, 10);

		return {
			uuid: coinData.uuid || "",
			symbol,
			name: coinData.name || "Unknown Asset",
			rank:
				Number.isFinite(rank) && rank >= 0 ? rank : (staticResort?.rank ?? 0),
			price: Number.isFinite(price)
				? price
				: (parseFloat(staticResort?.price) ?? 0),
			change24h: Number.isFinite(change24h) ? change24h : 0,
			description:
				coinData.description?.trim() ||
				staticResort?.description ||
				"Sincronizando...",
			iconUrl: coinData.iconUrl || staticResort?.iconUrl || "",
			history: Array.isArray(coinData.sparkline)
				? coinData.sparkline.map((p) => {
						const val = parseFloat(p);
						return Number.isFinite(val) ? val : 0;
					})
				: (staticResort?.sparkline?.map((p) => {
						const val = parseFloat(p);
						return Number.isFinite(val) ? val : 0;
					}) ?? []),
		};
	}
}
