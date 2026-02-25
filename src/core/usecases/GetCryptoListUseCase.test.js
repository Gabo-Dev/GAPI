import { describe, it, expect, vi } from 'vitest';
import { GetCryptoListUseCase } from './GetCryptoListUseCase.js';

describe('Use Case: GetCryptoListUseCase', () => {
    
    it('should return a filtered list of crypto assets from the repository', async () => {
        // Arrange
        const mockCryptoList = [
            { uuid: 'Qwsogvtv82FCd', name: 'Bitcoin', symbol: 'BTC', price: 64000 },
            { uuid: '54I_A3MXKhHjZ', name: 'Pi Network', symbol: 'PI', price: 0.5 },
            { uuid: 'falso-123', name: 'Shitcoin', symbol: 'SHIT', price: 0 }
        ];

        const mockResponse = {
            items: mockCryptoList,
            source: 'api'
        };

        const mockRepository = {
            getCryptoList: vi.fn().mockResolvedValue(mockResponse)
        };

        const useCase = new GetCryptoListUseCase(mockRepository);

        // Act
        const result = await useCase.execute();

        // Assert
        expect(mockRepository.getCryptoList).toHaveBeenCalledTimes(1);

        // We verify that the fake coin was filtered out and only 2 remain
        expect(result.items).toHaveLength(2);
        expect(result.total).toBe(2);
        
        // We verify the data is correct
        expect(result.items[0].name).toBe('Bitcoin');
        // We verify that it kept the extra properties like 'source'
        expect(result.source).toBe('api');
    });

    it('should propagate errors if repository fails', async () => {
        // Arrange
        const mockRepository = {
            getCryptoList: vi.fn().mockRejectedValue(new Error('Network connection error'))
        };

        const useCase = new GetCryptoListUseCase(mockRepository);
        
        // Act & Assert
        await expect(useCase.execute()).rejects.toThrow('Network connection error');
    });
});