import { GetCryptoListUseCase } from './usecases/GetCryptoListUseCase.js';
import { SearchCryptoUseCase } from './usecases/SearchCryptoUseCase.js';
import { GetCryptoDetailsUseCase } from './usecases/GetCryptoDetailsUseCase.js';

import { CryptoRepository } from '../infrastructure/repositories/CryptoRepository.js';
import { CacheRepository } from '../infrastructure/repositories/CacheRepository.js';

import { ApiClient } from '../infrastructure/api/ApiClient.js';

import { ALLOWED_CRYPTOS } from './config/allowedAssets.js';

// 1. Initialize API Client
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

// Init Infrastructure Repositories
const cacheRepository = new CacheRepository();
const cryptoRepository = new CryptoRepository(apiClient, cacheRepository);

// Init Use Cases
export const useCases = {
  getCryptoList: new GetCryptoListUseCase(cryptoRepository),
  searchCrypto: new SearchCryptoUseCase(cryptoRepository),
  getCryptoDetails: new GetCryptoDetailsUseCase(cryptoRepository)
};

export const config = {
  allowedCryptos: ALLOWED_CRYPTOS,
  defaultCrypto: ALLOWED_CRYPTOS.BITCOIN
};