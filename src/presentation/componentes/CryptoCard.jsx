import React from 'react';
import { formatPrice } from '../../core/utils/formatPrice.js';
import { calculateTrend, getTrendColor } from '../../core/utils/calculateTrend.js';

/*eslint-disable react/prop-types */
export function CryptoCard({ name, symbol, price, change, iconUrl, rank, description }) {
  const trend = calculateTrend(change);
  const trendColor = getTrendColor(trend);

  const cardWrapperStyles = "relative p-[2px] overflow-hidden rounded-[32px] group transition-transform duration-500 hover:-translate-y-2 shadow-lg dark:shadow-xl h-full flex";
  const cardContentStyles = "relative w-full bg-white dark:bg-slate-950 rounded-[30px] p-8 flex flex-col justify-between border-2 border-slate-200 dark:border-slate-700 flex-1";
  const beamEffectStyles = "absolute inset-[-1000%] animate-border-spin bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_25%,#3b82f6_50%,transparent_75%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500";

  return (
    <article className={cardWrapperStyles}>
      <div className={beamEffectStyles} />

      <div className={cardContentStyles}>
        <header className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 p-2 shadow-inner border border-slate-200 dark:border-slate-700">
              <img src={iconUrl} alt={name} className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                {name}
              </h3>
              <span className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                {symbol}
              </span>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-black text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            RANK #{rank}
          </span>
        </header>

        <div className="flex-1 mb-8">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-4">
            {description}
          </p>
        </div>

        <footer className="flex justify-between items-end pt-4 border-t-2 border-slate-100 dark:border-slate-800/50">
          <div>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-1 tracking-tight">Current Price</p>
            <p className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">
              {formatPrice(price)}
            </p>
          </div>
          <div className="text-right">
            <span 
              className="text-lg font-black px-3 py-1 rounded-lg border border-transparent"
              style={{ color: trendColor, backgroundColor: `${trendColor}15`, borderColor: `${trendColor}30` }}
            >
              {change > 0 ? '+' : ''}{change}%
            </span>
          </div>
        </footer>
      </div>
    </article>
  );
}