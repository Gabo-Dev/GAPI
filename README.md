# GAPI

GAPI is a cryptocurrency dashboard built with React and Vanilla JavaScript, demonstrating a robust implementation of **Clean Architecture** principles in the frontend.

## 🚀 Live Demo
[Visit GAPI](#) *(Link pending deployment)*

## 🛠️ Tech Stack
- **Core:** React (Vite)
- **Styling:** TailwindCSS
- **Visualization:** Recharts
- **Testing:** Vitest
- **Architecture:** Clean Architecture (Domain, Infrastructure, Adapters, Presentation)
- **Language:** JavaScript ES6+
- **Tooling:** ESLint, Prettier, pnpm

## 💡 Key Features & Business Logic

- **Multi-Currency Support:** Toggle between **USD** and **EUR** with real-time conversion.
- **Smart Caching:** Automatic fallback to local cache when API limit (5,000 calls/month) is reached.
- **Dynamic Pricing:** Smart decimal formatting (2 decimals for prices ≥1.00, 4 decimals for <1.00).
- **Theme Persistence:** Dark/Light mode with localStorage persistence and system preference detection.
- **Offline-Ready Search:** Client-side filtering works even when showing cached data.
- **Visual Trends:** Color-coded price changes (Green/Red) based on 24h performance.

## 🏗️ Architecture
The project is structured to ensure separation of concerns and testability:
1. **Core:** Business logic and entities independent of frameworks.
2. **Infrastructure:** External services (APIs) and data handling.
3. **Adapters:** Custom hooks and contexts bridging logic and UI.
4. **Presentation:** React components and views.

## 📂 Project Structure

````text
└── src/
    ├── main.jsx
    ├── App.jsx
    │
    ├── core/                   # DOMAIN LAYER (Pure JS)
    │   ├── entities/           # Business entities (e.g., Crypto.js)
    │   ├── repositories/       # Repository interfaces (contracts)
    │   └── usecases/           # Business logic rules
    │
    ├── infrastructure/         # INFRASTRUCTURE LAYER
    │   ├── api/                # Fetch/Axios configuration
    │   ├── interceptors/       # API Key injection, error handling
    │   └── repositories/       # Repository implementations
    │
    ├── adapters/               # ADAPTER LAYER (Bridge)
    │   ├── hooks/              # Custom Hooks (useCrypto, useTheme)
    │   └── context/            # React Context (ThemeContext)
    │
    ├── presentation/           # PRESENTATION LAYER (React + Tailwind)
    │   ├── components/         # Reusable UI components
    │   │   ├── ui/             # Generic (Button, Input, Card)
    │   │   └── crypto/         # Specific (CryptoCard, PriceChart)
    │   ├── layout/             # Layout components (Navbar, Footer)
    │   └── pages/              # Page views (Home, Detail)
    │
    ├── utils/                  # Pure helper functions (formatters, dates)
    └── tests/                  # Vitest test files
