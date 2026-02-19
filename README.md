# GAPI

GAPI is a cryptocurrency dashboard built with React and Vanilla JavaScript (no TypeScript), demonstrating a robust implementation of **Clean Architecture** principles in the frontend. This is a learning project focused on architecture, not a production exchange platform.

## 🚀 Live Demo
[Visit GAPI](#) *(Link pending deployment)*

## 🛠️ Tech Stack
| Category | Technology |
|----------|------------|
| **Core** | React (Vite) |
| **Styling** | TailwindCSS |
| **Visualization** | Recharts |
| **Testing** | Vitest |
| **Architecture** | Clean Architecture |
| **Language** | JavaScript ES6+ |
| **Tooling** | ESLint, Prettier, pnpm |
| **HTTP Client** | Fetch API (native) |
| **State Management** | Context + Hooks |

## 💡 Key Features & Business Logic (Whitelist)

- **Supported Cryptocurrencies:** Bitcoin (BTC) and Pi Network (PI) only.
- **Supported Currencies:** USD (default), EUR, and JPY.
- **Dynamic Pricing:** Smart decimal formatting:
    - Prices ≥ 1.00 → 2 decimals (e.g., $1,234.56).
    - Prices < 1.00 → 4 decimals (e.g., $0.0045).
    - Always show currency symbol ($, €, ¥).
- **Theme Persistence:** Dark/Light mode with localStorage persistence and system preference detection.
- **Offline-Ready Search:** Client-side filtering only, works on cached/fallback data within whitelist.
- **Visual Trends:** Color-coded price changes (Green/Red) based on 24h performance.

## 🛡️ Security & Protection (Defense in Depth)

- **3-Layer Protection:**
    1. **UI Layer:** Only shows allowed options in dropdowns/buttons.
    2. **Use Case Layer:** Validates against whitelist explicitly.
    3. **API Request Layer:** Only requests allowed symbols to save quota.
- **Known Limitations:** API key is visible in bundle (unavoidable without backend) and advanced users can bypass via console.
- **Mitigation:** Transparency via "About Project" section and strict caching to protect the 5,000 calls/month limit.

## 🔄 Caching Strategy (3-Layer Fallback)

1. **Layer 1: Coinranking API:** Fresh real-time data.
2. **Layer 2: localStorage (User Cache):** TTL of 24 hours. Used when API limit (429) or network error occurs.
3. **Layer 3: Static JSON Bundle:** Located at `src/infrastructure/data/fallback-data.json`. Ensures data is always visible even if the API quota is exhausted.

## 🏗️ Architecture
The project follows 4 layers (from outer to inner):
1. **Presentation:** React + Tailwind. No business logic.
2. **Adapters:** Bridge using Custom Hooks and React Context. Depends on Domain.
3. **Domain (Pure JS):** Entities, Use Cases, and Repository Interfaces. Depends on nothing.
4. **Infrastructure:** API Client, Repository implementations, and Fallback data.

| Layer | Responsibility | Dependencies |
|-------|----------------|--------------|
| **Presentation** | UI rendering, user interaction | → Adapters |
| **Adapters** | Bridge between UI and Domain | → Domain |
| **Domain** | Business logic, entities, rules | → None (pure JS) |
| **Infrastructure** | External services, data persistence | → None (injected) |

**Key Principles:** Dependency Injection, Duck Typing, Single Responsibility, Fail-Fast, and Immutability.

## 📂 Project Structure

```text
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── core/                   # DOMAIN LAYER
    │   ├── config/             # allowedAssets.js (Whitelist)
    │   ├── entities/           # CryptoAsset, Currency, Theme
    │   ├── repositories/       # CryptoRepository.js (Contracts)
    │   └── usecases/           # GetCryptoList, SearchCrypto, etc.
    ├── infrastructure/         # INFRASTRUCTURE LAYER
    │   ├── api/                # ApiClient (Fetch wrapper), ApiError
    │   └── data/               # fallback-data.json (Layer 3)
    ├── adapters/               # ADAPTER LAYER
    │   ├── hooks/              # useCrypto, useTheme
    │   └── context/            # ThemeContext, CurrencyContext
    ├── presentation/           # PRESENTATION LAYER
    │   ├── components/         # ui/ (Button, Card) and crypto/ (PriceChart)
    │   ├── layout/             # Navbar, Footer, MainLayout
    │   └── pages/              # Home, Detail
    ├── utils/                  # formatters.js, validators.js
    └── tests/                  # Vitest tests (entities, repositories, usecases)
    ---

**Last Updated:** 2025-02-18  
**Version:** 1.0.0  
**Status:** Phase 2 (Domain Layer) - In Progress