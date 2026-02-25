import { ThemeProvider } from '@/adapters/context/index.js';
import { MainLayout } from '@/presentation/layout/MainLayout.jsx';
import { Home } from './presentation/views/Home.jsx';
import { Charts } from './presentation/views/Charts.jsx';
import { About } from './presentation/views/About.jsx';
import React from 'react';

function App() {
  const [currentView, setCurrentView] = React.useState('home');

  const renderContent = () => {
    switch (currentView) {
      case 'home': return <Home />;
      case 'charts': return <Charts />;
      case 'about': return <About />; 
      default: return <Home />;
    }
  };

  return (
    <ThemeProvider>
      <MainLayout currentView={currentView} onNavigate={setCurrentView}>
        {renderContent()}
      </MainLayout>
    </ThemeProvider>
  )
}

export default App;