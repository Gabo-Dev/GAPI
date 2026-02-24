import React from 'react';
import { useThemeContext } from '@/adapters/context/index.js';
import { Navbar } from './Navbar.jsx';

/* eslint-disable react/prop-types */
export function MainLayout({ children, currentView, onNavigate }) {
    const { theme, toggleTheme } = useThemeContext();

    return (
        <div className='relative h-screen w-full bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 overflow-hidden transition-colors duration-300 flex flex-col'>

            <header className="w-full p-6 z-50 flex justify-between items-center shrink-0">
                <h1 className="text-2xl font-extrabold tracking-tight opacity-80 select-none text-slate-800 dark:text-slate-100">
                    GAPI<span className="text-blue-500">.</span>
                </h1>
                <button
                    onClick={toggleTheme}
                    className="p-2.5 rounded-full bg-white dark:bg-slate-800 shadow-md border border-slate-300 dark:border-slate-600 hover:scale-110 active:scale-95 transition-all cursor-pointer"                
                >
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button>
            </header>

            <main className="flex-1 w-full overflow-y-auto pb-32 px-4 md:px-8">
                <div className="max-w-7xl mx-auto h-full flex flex-col">
                    {children}
                </div>
            </main>

            <Navbar currentView={currentView} onNavigate={onNavigate} />

        </div>
    )
}