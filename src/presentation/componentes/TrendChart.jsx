import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

/* eslint-disable react/prop-types */
export function TrendChart({ data, color = "#3b82f6" }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); 
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!data || data.length === 0) {
    return (
      <div className="w-full h-full min-h-[300px] flex items-center justify-center bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800">
        <span className="text-sm font-bold text-slate-400">No chart data available</span>
      </div>
    );
  }

  const tickFontSize = isMobile ? 9 : 12;
  const tickFill = '#94a3b8'; 

  const formatTooltipPrice = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: value < 1 ? 4 : 2,
      maximumFractionDigits: value < 1 ? 4 : 2
    }).format(value);
  };

  const formatTooltipDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  const formatYAxisTick = (value) => {
    if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
    if (value < 1) return `$${value.toFixed(3)}`;
    return `$${value.toFixed(2)}`;
  };

  const formatXAxisTick = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-700 p-4 rounded-2xl shadow-xl z-50">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
            {formatTooltipDate(payload[0].payload.timestamp)}
          </p>
          <p className="text-xl font-black text-white">
            {formatTooltipPrice(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full min-h-[250px] relative">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: isMobile ? 10 : 0, left: isMobile ? -25 : -10, bottom: isMobile ? 20 : 10 }}>
          <defs>
            <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.4}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke="currentColor" 
            className="text-slate-200 dark:text-slate-800/60" 
          />

          <XAxis 
            dataKey="timestamp" 
            tickFormatter={formatXAxisTick} 
            tick={{ fontSize: tickFontSize, fill: tickFill, fontWeight: 600 }}
            tickMargin={isMobile ? 10 : 8}
            minTickGap={isMobile ? 45 : 20}
            axisLine={false} 
            tickLine={false} 
          />

          <YAxis 
            domain={['dataMin', 'dataMax']} 
            padding={{ top: 20, bottom: 20 }}
            tickFormatter={formatYAxisTick}
            tick={{ fontSize: tickFontSize, fill: tickFill, fontWeight: 600 }}
            tickMargin={isMobile ? 4 : 12}
            width={isMobile ? 45 : 80} 
            axisLine={false}
            tickLine={false}
          />
          
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2, strokeDasharray: '5 5' }}
          />
          
          <Area 
            type="monotone" 
            dataKey="price" 
            stroke={color} 
            strokeWidth={isMobile ? 2 : 3}
            fillOpacity={1} 
            fill="url(#colorTrend)" 
            animationDuration={1500} 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}