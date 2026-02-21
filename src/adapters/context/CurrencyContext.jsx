import React, { createContext, useContext } from 'react';
import { useCurrency } from '@/adapters/hooks/useCurrency.js';

/* eslint-disable react/prop-types */
const CurrencyContext = createContext(null);

export function CurrencyProvider({children}){
    const { currency, rates, changeCurrency, convertPrice, symbol } = useCurrency();

    return(
        <CurrencyContext.Provider value={{currency, rates, changeCurrency, convertPrice, symbol}} >
            {children}
        </CurrencyContext.Provider>
    )
}

export function useCurrencyContext(){
    const context = useContext(CurrencyContext);

    if(!context){
        throw new Error('useCurrencyContext must be used within a CurrencyProvider');
    }
    return context;
}