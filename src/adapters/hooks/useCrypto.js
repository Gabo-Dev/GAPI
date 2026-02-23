import { useState, useCallback } from "react";
import { useCases } from '@/core/index.js';

export function useCrypto() {
    const [listData, setListData] = useState([]);
    const [detailData, setDetailData] = useState(null);
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [source, setSource] = useState('api');

    const fetchCryptoList = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const result = await useCases.getCryptoList.execute();

            setListData(result.items);
            setSource(result.fromFallback ? 'fallback' : result.fromCache ? 'cache' : 'api');
        } catch (err) {
            setError(err.message || 'Failed to fetch crypto list.');            
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchCryptoDetails = useCallback(async (uuid) => {
        try {
            setLoading(true);
            setError(null);

            const result = await useCases.getCryptoDetails.execute(uuid);

            if (result.error) {
                throw new Error(result.error);
            }

            setDetailData(result.asset);
            setSource(result.fromFallback ? 'fallback' : result.fromCache ? 'cache' : 'api');
        } catch (err) {
            setError(err.message || 'Failed to fetch crypto details.');
        } finally {
            setLoading(false);
        }
    }, []);

    const searchCrypto = useCallback(async (query) => {
        if (!query || query.trim() === '') {
            await fetchCryptoList();
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const result = await useCases.searchCrypto.execute(query);

            setListData(result.items);
            setSource(result.fromFallback ? 'fallback' : result.fromCache ? 'cache' : 'api');
        } catch (err) {
            setError(err.message || 'Search failed.');
        } finally {
            setLoading(false);
        }
    }, [fetchCryptoList]);


    return {
        listData,
        detailData,
        loading,
        error,
        source,
        fetchCryptoList,
        fetchCryptoDetails,
        searchCrypto
    };
}