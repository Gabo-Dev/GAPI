import React , { createContext, useContext } from 'react';
import { useTheme } from '@/adapters/hooks/useTheme.js';

const ThemeContext = createContext(null);

// eslint-disable-next-line react/prop-types
export function ThemeProvider({children}){
    const { theme, toggleTheme, isDark } = useTheme();  
    return (
        <ThemeContext.Provider value={{theme, toggleTheme, isDark}}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useThemeContext() {
    const context = useContext(ThemeContext);

    if(!context){
        throw new Error('useThemeContext must be used within a ThemeProvider');
    }
    return context;
}

