import React, { useState } from 'react';

export function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false);

  const navigationRoutes = [
    { id: 'home', label: 'Home' },
    { id: 'charts', label: 'Charts' },
    { id: 'about', label: 'About GAPI' }
  ];

  const desktopWrapperStyles = "hidden md:block fixed bottom-4 left-1/2 -translate-x-1/2 z-50";
  const desktopListStyles = "flex items-center gap-10 px-8 py-3.5 rounded-full bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 shadow-xl";
  const desktopLinkStyles = "text-sm font-semibold tracking-wide text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300";

  const mobileWrapperStyles = "md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-end justify-center w-full px-4";
  const mobilePillStyles = `
    overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex items-center justify-center
    bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/60 shadow-2xl
    ${isExpanded ? 'w-[90vw] max-w-sm h-16 rounded-full px-2' : 'w-32 h-14 rounded-full cursor-pointer active:scale-95'}
  `;

  return (
    <>
      <nav className={desktopWrapperStyles}>
        <ul className={desktopListStyles}>
          {navigationRoutes.map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`} className={desktopLinkStyles}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={mobileWrapperStyles}>
        <div className={mobilePillStyles} onClick={() => !isExpanded && setIsExpanded(true)}>
          {!isExpanded ? (
            <span className="font-extrabold tracking-widest text-blue-600 dark:text-blue-400 animate-pulse text-sm">
              MENU
            </span>
          ) : (
            <div className="flex flex-row items-center justify-between w-full h-full px-4 animate-[fadeIn_0.4s_ease-in]">
              <div className="flex flex-row justify-around flex-1 mr-2">
                {navigationRoutes.map(({ id, label }) => (
                  <a 
                    key={id} 
                    href={`#${id}`} 
                    onClick={() => setIsExpanded(false)} 
                    className="text-xs font-extrabold text-slate-800 dark:text-slate-100 active:text-blue-500"
                  >
                    {label.toUpperCase()}
                  </a>
                ))}
              </div>
              
              <button 
                onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
                className="w-8 h-8 rounded-full bg-slate-200/80 dark:bg-slate-700/80 flex items-center justify-center text-slate-600 dark:text-slate-300"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}