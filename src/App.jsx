import { ThemeProvider } from '@adapters/context/index.jsx';
import React from 'react';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <h1>Gapi - Crypto Dashboard</h1>
      </div>
    </ThemeProvider>
  )
}

export default App;