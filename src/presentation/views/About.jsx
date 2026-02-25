import React from 'react';

export function About() {
  const viewWrapperStyles = "flex flex-col w-full pb-8 md:pb-0 md:flex-1 md:min-h-0";
  const headerStyles = "mb-8 md:mb-12 flex flex-col md:flex-row justify-between items-center md:items-end gap-6 shrink-0";
  
  const concepts = [
    {
      title: "Duck Typing",
      description: "In JavaScript, we don't need native interfaces. If an object has the methods we expect, it works ('If it looks like a duck...'). This enables seamless swapping of implementations, such as switching between a real API and a Mock, without changing the consuming code."
    },
    {
      title: "Repository Pattern",
      description: "A Domain-Driven Design pattern that strictly separates persistence logic (API, localStorage) from business logic. By keeping the Domain unaware of data origins, the application becomes highly testable, modular, and flexible."
    },
    {
      title: "Defensive Validation",
      description: "A core concept that deeply enhanced my JavaScript expertise. Without TypeScript, the developer acts as the type guardian. It involves strict type checking, normalization, and the golden rule: 'Never trust external data. Always validate.'"
    },
    {
      title: "Graceful Degradation",
      description: "The architectural principle that the app never breaks completely; there is always a fallback. When a service fails, GAPI safely degrades its functionality but continues operating smoothly using alternative data sources."
    }
  ];

  return (
    <main className={viewWrapperStyles}>
      <header className={headerStyles}>
        <div className="text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white mb-2">
            ABOUT GAPI
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium tracking-wide">
            Architecture, Concepts & Developer
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-3">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest text-center md:text-right">
            Want to know more or get in touch?
          </span>
          <div className="flex gap-3">
            <a 
              href="https://github.com/TU_USUARIO" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl text-sm hover:scale-105 active:scale-95 transition-transform shadow-lg"
            >
              GitHub
            </a>
            <a 
              href="https://linkedin.com/in/TU_USUARIO" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl text-sm hover:scale-105 active:scale-95 transition-transform shadow-lg"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </header>

      <div className="w-full md:flex-1 md:overflow-y-auto md:pr-2 custom-scrollbar">
        
        <section className="mb-10 p-6 md:p-8 bg-white dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg">
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="text-blue-500">⚡</span> The Project
          </h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            GAPI is a modern cryptocurrency dashboard built to fetch, monitor, and visualize real-time data for digital assets like Bitcoin and Pi Network. To overcome strict API rate limits and ensure a flawless user experience, it features an integrated <strong className="text-slate-800 dark:text-slate-200">3-layer data acquisition system</strong>. The application intelligently prioritizes a primary local cache for lightning-fast loads, fetches from a live API when fresh data is needed, and relies on a static JSON fallback as a last resort, ensuring zero downtime.
          </p>
        </section>

        <section className="mb-10">
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="text-blue-500">🧠</span> Key Concepts Applied
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {concepts.map((concept, index) => (
              <div key={index} className="p-6 bg-slate-100 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 transition-colors duration-300">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{concept.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {concept.description}
                </p>
              </div>
            ))}
          </div>
        </section>
        
      </div>
    </main>
  );
}