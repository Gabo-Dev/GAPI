import React, { useState, useEffect } from 'react';
import { useCrypto } from '@/adapters/hooks/useCrypto';
import { TrendChart } from '@/presentation/componentes/TrendChart';
import { StatusBadge } from '@/presentation/componentes/StatusBadge';
import { ASSET_METADATA, ALLOWED_PERIODS } from '@/core/config/allowedAssets';

export function Charts() {
    const [activeCoin, setActiveCoin] = useState(ASSET_METADATA[0]);
    const [activePeriod, setActivePeriod] = useState(ALLOWED_PERIODS[1]);

    const { detailData, loading, error, fetchCryptoDetails, dataSource } = useCrypto();

    useEffect(() => {
        fetchCryptoDetails(activeCoin.id, activePeriod);
    }, [activeCoin.id, activePeriod, fetchCryptoDetails]);

    const viewWrapperStyles = "flex-1 flex flex-col w-full min-h-[450px] md:min-h-[500px]";

    return (
        <main className={viewWrapperStyles}>
            <header className="mb-4 md:mb-6 shrink-0 flex flex-col md:flex-row justify-between items-center md:items-end gap-4 md:gap-6">
                <div className="w-full md:w-auto text-center md:text-left">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white mb-1 md:mb-2">
                        MARKET TRENDS
                    </h2>
                    <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium tracking-wide">
                        Historical price analysis and volatility patterns.
                    </p>
                </div>

                <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto">
                    <div className="flex bg-slate-200/50 dark:bg-slate-800/50 p-1 rounded-xl w-full md:w-fit">
                        {ASSET_METADATA.map(coin => (
                            <button
                                key={coin.id}
                                onClick={() => setActiveCoin(coin)}
                                className={`flex-1 md:flex-none px-4 py-2 md:px-6 rounded-lg text-xs md:text-sm font-black tracking-widest transition-all duration-300 ${activeCoin.id === coin.id
                                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                    }`}
                            >
                                {coin.symbol}
                            </button>
                        ))}
                    </div>

                    <div className="flex bg-slate-200/50 dark:bg-slate-800/50 p-1 rounded-xl w-full md:w-fit">
                        {ALLOWED_PERIODS.map(period => (
                            <button
                                key={period}
                                onClick={() => setActivePeriod(period)}
                                className={`flex-1 md:flex-none px-3 py-2 md:px-4 rounded-lg text-[10px] md:text-xs font-bold uppercase transition-all duration-300 ${activePeriod === period
                                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                    }`}
                            >
                                {period}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            <div className="flex-1 w-full min-h-[300px] md:min-h-0 bg-white dark:bg-slate-950 rounded-[24px] md:rounded-[32px] p-4 md:p-8 border-2 border-slate-200 dark:border-slate-800 shadow-xl flex flex-col relative overflow-hidden group">
                <div className="absolute inset-[-1000%] animate-border-spin bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_25%,#3b82f6_20%,transparent_75%,transparent_100%)] opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />

                <div className="flex justify-between items-start mb-2 md:mb-8 shrink-0 relative z-10">
                    <div>
                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2 md:gap-3">
                            {activeCoin.name}
                            <span className="text-xs md:text-sm px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-md">
                                {activeCoin.symbol}
                            </span>
                        </h3>
                    </div>
                    <StatusBadge source={dataSource} />
                </div>

                <div className="flex-1 w-full  relative z-10">
                    {loading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="animate-pulse font-bold text-slate-400 tracking-widest text-lg md:text-xl">ANALYZING TREND...</span>
                        </div>
                    ) : error ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl font-bold">{error}</div>
                        </div>
                    ) : (
                        <TrendChart data={detailData} color={activeCoin.color} />
                    )}
                </div>
            </div>
        </main>
    );
}