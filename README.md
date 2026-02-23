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

## 💡 Key Features & Business Logic (V1 MVP)

- **VS Dashboard (Home):** A direct, optimized head-to-head comparison between Bitcoin (BTC) and Pi Network (PI).
- **Detail View (Charts):** Dynamically generated price trend charts using Recharts and the API's native `sparkline` data.
- **About Project:** A static section dedicated to explaining architectural decisions, design patterns applied, and lessons learned.
- **Single Currency (USD):** All quotes are handled in US Dollars by default to optimize API consumption.
- **Dynamic Pricing (Smart decimal formatting):** - Prices ≥ 1.00 → 2 decimals (e.g., $1,234.56).
    - Prices < 1.00 → 4 decimals (e.g., $0.0045).
- **Theme Persistence:** Dark/Light mode with localStorage persistence and system preference detection.

## 🔌 API Integration (Coinranking)
Data is sourced from the [Coinranking API](https://coinranking.com/), utilizing a free tier limited to 5,000 requests/month. To optimize this quota, the app strictly consumes two endpoints:
- `GET /v2/coins`: Fetches the Home VS Dashboard data (BTC & PI) in a single, batched request.
- `GET /v2/coin/:uuid`: Retrieves specific asset details and `sparkline` historical data for rendering Recharts.

## 🗺️ Roadmap / Future Implementations
- Support for multiple fiat currency selection (EUR, JPY) using `referenceCurrencyUuid`.
- Expansion of the whitelist to include a top 10 cryptocurrency list.
- Offline search and dynamic filtering on cached data.

## 🛡️ Security & Protection (Defense in Depth)

- **3-Layer Protection:**
    1. **UI Layer:** Restricts navigation and interactions solely to supported assets (BTC and PI).
    2. **Use Case Layer:** Validates against whitelist explicitly.
    3. **API Request Layer:** Only requests specific allowed UUIDs to save API request quota.
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
    │   ├── entities/           # CryptoAsset, Theme
    │   ├── repositories/       # CryptoRepository.js (Contracts)
    │   └── usecases/           # GetCryptoList, GetCryptoDetails, etc.
    ├── infrastructure/         # INFRASTRUCTURE LAYER
    │   ├── api/                # ApiClient (Fetch wrapper), ApiError
    │   └── data/               # fallback-data.json (Layer 3)
    ├── adapters/               # ADAPTER LAYER
    │   ├── hooks/              # useCrypto, useTheme
    │   └── context/            # ThemeContext
    ├── presentation/           # PRESENTATION LAYER
    │   ├── components/         # ui/ (Button, Card) and crypto/ (PriceChart)
    │   ├── layout/             # Navbar, Footer, MainLayout
    │   └── pages/              # Home (VS Dashboard), Detail (Charts), About
    ├── utils/                  # formatters.js, validators.js
    └── tests/                  # Vitest tests (entities, repositories, usecases)

```
## Changelog

- v1.0.0: Initial Release
Notes: 
- MVP (V1) redefined. Home operates as a comparative Dashboard (BTC vs PI) using /v2/coins to optimize API quota. Detail view uses /v2/coin/:uuid. Added static 'About' view. Currency fixed to USD.