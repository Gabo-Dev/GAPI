import { useState, useCallback } from "react";
import { useCases } from '@/core/usecases/index.js';

export function useCrypto() {
    const [listData, setListData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [dataSource, setDataSource] = useState('none');

    const fetchCryptoList = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const result = await useCases.getCryptoList.execute();

            setListData(result.items);
            setDataSource(result.source);
        } catch (err) {
            setError(err.message || 'Market data synchronization failed.');            
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        listData,
        loading,
        error,
        dataSource,
        fetchCryptoList
    };
}