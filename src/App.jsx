import { ThemeProvider } from '@/adapters/context/index.js';
import { MainLayout } from '@/presentation/layout/MainLayout.jsx';
import { Home } from './presentation/views/Home.jsx';
import React from 'react';

function App() {
  return (
    <ThemeProvider>
      <MainLayout>
        <Home />
      </MainLayout>
    </ThemeProvider>
  )
}

export default App;