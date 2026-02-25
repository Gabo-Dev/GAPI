import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CryptoCard } from './CryptoCard.jsx';


vi.mock('../../core/utils/formatPrice.js', () => ({
  formatPrice: (val) => `MOCKED_PRICE_${val}`
}));

vi.mock('../../core/utils/calculateTrend.js', () => ({
  calculateTrend: () => 'up',
  getTrendColor: () => '#00FF00'
}));

describe('Component: CryptoCard', () => {
  
  const mockProps = {
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 64000,
    change: 2.5,
    rank: 1,
    iconUrl: 'https://test.com/btc.png',
    description: 'Bitcoin is a decentralized digital currency.'
  };

  it('should render all basic text elements correctly', () => {
    render(<CryptoCard {...mockProps} />);

    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.getByText('BTC')).toBeInTheDocument();
    expect(screen.getByText('RANK #1')).toBeInTheDocument();
  });

  it('should format the price using the injected utility', () => {
    render(<CryptoCard {...mockProps} />);
    
    expect(screen.getByText('MOCKED_PRICE_64000')).toBeInTheDocument();
  });

  it('should prepend a "+" sign to positive changes', () => {
    render(<CryptoCard {...mockProps} />);
    
    expect(screen.getByText('+2.5%')).toBeInTheDocument();
  });

  it('should not prepend a "+" sign if change is negative', () => {
    render(<CryptoCard {...mockProps} change={-1.5} />);
    
    expect(screen.getByText('-1.5%')).toBeInTheDocument();
  });

});