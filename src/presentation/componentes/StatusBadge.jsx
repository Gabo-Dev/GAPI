import React from 'react';

/*eslint-disable react/prop-types */
export function StatusBadge({ source }) {
    const getStatusUI = (src) => {
        const configs = {
            api: {
                label: 'Live API',
                dot: 'bg-emerald-500 animate-pulse',
                box: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-400'
            },
            cache: {
                label: 'Cached Data',
                dot: 'bg-amber-500',
                box: 'bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-400'
            },
            static_fallback: {
                label: 'Offline Mode',
                dot: 'bg-rose-500',
                box: 'bg-rose-500/10 border-rose-500/20 text-rose-700 dark:text-rose-400'
            },
            none: {
                label: 'Connecting...',
                dot: 'bg-slate-500 animate-pulse',
                box: 'bg-slate-500/10 border-slate-500/20 text-slate-500'
            }
        };
        return configs[src] || configs.none;
    };

    const statusUI = getStatusUI(source);

    return (
        <div className={`flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-solid text-xs font-black uppercase tracking-widest w-fit ${statusUI.box}`}>
            <span className={`w-2 h-2 rounded-full ${statusUI.dot}`}></span>
            {statusUI.label}
        </div>
    );
}