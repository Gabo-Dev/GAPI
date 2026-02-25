import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StatusBadge } from './StatusBadge.jsx';

describe('Component: StatusBadge', () => {
    
    it('should render CACHED DATA when source is cache', () => {
        // Arrange & Act
        render(<StatusBadge source="cache" />);
        // Assert
        expect(screen.getByText(/Cached Data/i)).toBeInTheDocument();
    });

    it('should render LIVE DATA (or similar) when source is api', () => {
        render(<StatusBadge source="api" />);
        // NOTA: Ajusta el texto "/live data/i" al texto real que muestre tu badge cuando es API
        expect(screen.getByText(/Live API/i)).toBeInTheDocument();
    });

    it('should render OFFLINE/FALLBACK DATA when source is static_fallback', () => {
        // CORRECCIÓN: El prop exacto que espera tu componente es "static_fallback"
        render(<StatusBadge source="static_fallback" />);
        expect(screen.getByText(/Offline Mode/i)).toBeInTheDocument(); 
    });

    it('should render CONNECTING... when source is none', () => {
        render(<StatusBadge source="none" />);
        expect(screen.getByText(/Connecting.../i)).toBeInTheDocument();
    });
});