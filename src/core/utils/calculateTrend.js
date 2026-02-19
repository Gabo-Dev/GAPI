export function calculateTrend(change24h) {
  const numericChange = parseFloat(change24h);
  
  if (isNaN(numericChange)) return 'neutral';
  if (numericChange > 0) return 'positive';
  if (numericChange < 0) return 'negative';
  return 'neutral';
}

export function getTrendColor(trend) {
  const colors = {
    positive: '#10B981',
    negative: '#EF4444',
    neutral: '#6B7280'
  };
  return colors[trend] || colors.neutral;
}