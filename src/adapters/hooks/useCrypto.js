import { useState, useEffect, useCallback } from "react";
import { useCases } from '@/core/usecases/index.js';

export function useCrypto() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [source, setSource] = useState('api');

    const fetchCryptoList = useCallback(async() => {
        try {
            setLoading(true);
            setError(null);

            const result = await useCases.getCryptoList.execute();

            setData(result.items);
            setSource(result.fromFallback ? 'fallback' : result.fromCache ? 'cache' : 'api');
        } catch (error) {
            setError(error.message || 'Failed to fetch crypto data.');            
        }finally{
            setLoading(false);
        }
    }, []);

    const searchCrypto = useCallback(async(query) => {
        if(!query || query.trim() === ''){
            await fetchCryptoList();
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const result = await useCases.searchCrypto.execute(query);

            setData(result.items);
            setSource(result.fromFallback ? 'fallback' : result.fromCache ? 'cache' : 'api');
        } catch (error) {
            setError(error.message || 'Search failed.');
        }finally{
            setLoading(false);
        }
    }, [fetchCryptoList]);

    useEffect(() =>{
        fetchCryptoList();
    }, [fetchCryptoList]);

    return{
        data,
        loading,
        error,
        source,
        refresh: fetchCryptoList,
        search: searchCrypto
    };
}