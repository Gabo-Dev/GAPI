import { useState, useEffect, useCallback } from "react";
import { useCases, config } from "@/core/usecases/index.js";

const CUURENCY_KEY = "gapi-currency";

export function useCurrency(){
    const [currency, setCurrency] = useState(()=> {
        const saved = localStorage.getItem(CUURENCY_KEY);
        if (saved && config.currencies.includes(saved)){
            return saved;
        }
        return config.defaultCurrency;
    });

    const [rates, setRates] = useState(null);

    useEffect(() => {
        const loadRates = async () => {
            const result = await useCases.getExchangeRates();

            setRates(result.rates);
        };

        loadRates();
    }, []);

    useEffect(() => {
        localStorage.setItem(CUURENCY_KEY, currency);
    }, [currency]);

      const changeCurrency = useCallback((newCurrency) => {
    if (config.allowedCurrencies.includes(newCurrency)) {
      setCurrency(newCurrency);
    }
  }, []);

  const convertPrice = useCallback((priceInUSD) => {
    if (!rates || currency === 'USD') {
      return priceInUSD;
    }
    
    const rate = rates[currency] || 1;
    return priceInUSD * rate;
  }, [rates, currency]);

  return{
    currency, 
    rates, 
    changeCurrency,
    convertPrice,
    symbol: currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '¥'
  };
}