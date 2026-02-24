// src/presentation/layouts/MainLayout.jsx
import React from 'react';
import { useThemeContext } from '@/adapters/context/index.js';
import { Navbar } from './Navbar.jsx';

/* eslint-disable react/prop-types */
export function MainLayout({ children }) {
    const { theme, toggleTheme } = useThemeContext();

    return (
        <div className='relative h-screen w-full bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 overflow-hidden transition-colors duration-300'>

            <header className="absolute top-0 left-0 w-full p-6 z-50 flex justify-between items-center pointer-events-none">

                <h1 className="text-2xl font-extrabold tracking-tight opacity-80 select-none text-slate-800 dark:text-slate-100">
                    GAPI<span className="text-blue-500">.</span>
                </h1>

                <button
                    onClick={toggleTheme}
                    aria-label="Toggle Dark Mode"
                    className="pointer-events-auto p-2.5 rounded-full bg-white dark:bg-slate-800 shadow-md border border-slate-300 dark:border-slate-600 hover:scale-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center"                
                >
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button>

            </header>

            <main className="pt-24 pb-24 px-4 md:px-8 max-w-7xl mx-auto h-full flex flex-col min-h-0">
                {children}
            </main>

            <Navbar />

        </div>
    )
}