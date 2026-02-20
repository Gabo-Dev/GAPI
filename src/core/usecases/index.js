import { GetCryptoListUseCase } from './GetCryptoListUseCase.js';
import { SearchCryptoUseCase } from './SearchCryptoUseCase.js';
import { GetCryptoDetailsUseCase } from './GetCryptoDetailsUseCase.js';
import { GetCryptoHistoryUseCase } from './GetCryptoHistoryUseCase.js';

import { CryptoRepository } from '../repositories/CryptoRepository.js';
import { CacheRepository } from '../repositories/CacheRepository.js';
import { CurrencyRepository } from '../repositories/CurrencyRepository.js';

import { ApiClient } from '@/infrastructure/api/ApiClient.js';
import fallbackData from '@/infrastructure/data/fallback-data.json';

import { ALLOWED_CRYPTOS, DEFAULT_CRYPTO, DEFAULT_CURRENCY } from '../config/allowedAssets.js';

const apiClient = new ApiClient(
    'https://api.coinranking.com/v2',
    import.meta.env.VITE_COINRANKING_API_KEY,
    {
        timeout: 10000,
        retries: 0,
        onRateLimit: async(endpoint) => {
            console.warn(`Rate limit hit on ${endpoint}`);
        }
    }
);

const cacheRepository = new CacheRepository();
const cryptoRepository = new CryptoRepository(apiClient, cacheRepository);
const currencyRepository = new CurrencyRepository(apiClient, cacheRepository);

export const useCases = {
  getCryptoList: new GetCryptoListUseCase(cryptoRepository, fallbackData),
  searchCrypto: new SearchCryptoUseCase(cryptoRepository, fallbackData),
  getCryptoDetails: new GetCryptoDetailsUseCase(cryptoRepository, fallbackData),
  getCryptoHistory: new GetCryptoHistoryUseCase(cryptoRepository, fallbackData),
  getExchangeRates: () => currencyRepository.getExchangeRates()
};

export const config = {
  allowedCryptos: ALLOWED_CRYPTOS,
  defaultCrypto: DEFAULT_CRYPTO,
  defaultCurrency: DEFAULT_CURRENCY
};