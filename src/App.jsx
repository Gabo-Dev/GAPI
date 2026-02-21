import { ThemeProvider } from '@adapters/context';
import { CurrencyProvider } from '@adapters/context';
import React from 'react';

function App(){
  return(
    <ThemeProvider>
      <CurrencyProvider>
        <h1>Gapi - Crypto Dashboard</h1>
      </CurrencyProvider>
    </ThemeProvider>
  )
}

export default App;