import { ThemeProvider } from '@/adapters/context/index.js';
import { MainLayout } from '@/presentation/layout/MainLayout.jsx';
import { Home } from './presentation/views/Home.jsx';
import { Charts } from './presentation/views/Charts.jsx';
import React from 'react';

function App() {
  const [currentView, setCurrentView] = React.useState('home');

  return (
    <ThemeProvider>
      <MainLayout currentView={currentView} onNavigate={setCurrentView}>
        {currentView === 'home' ? <Home /> : <Charts />}
      </MainLayout>
    </ThemeProvider>
  )
}

export default App;