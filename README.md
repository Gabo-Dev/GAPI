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
- `GET /v2/coin/:uuid/price-history`: Return the history prices for a specific coin and their timestamp for a requested time period, useful for making the charts.

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

### 🛠 Data Acquisition Strategy (3-Layer Hierarchy)

1. **Layer 1: localStorage (User Cache):** Prioritizes local persistence for sub-10ms delivery, strictly minimizing external API overhead and preventing rate limiting.
2. **Layer 2: Coinranking API:** Synchronizes fresh data from Coinranking v2 only when the cache is empty or expired, processing it through an internal normalization layer.
3. **Layer 3: Static JSON Bundle:** Located at `src/core/data/fallback-data.json`. Acts as the ultimate safety net to guarantee a functional UI during network outages or API exhaustion.
4. **Core Strategy:** A performance-driven hierarchy designed to balance resource conservation with bulletproof system availability.

### ⏱️ Dynamic Caching & Rate-Limit Protection (History Endpoint)

To protect the free tier limit (5,000 req/month) from being exhausted by users toggling chart timeframes, the application implements a **Dynamic Multi-Key Caching** strategy for historical data:

1. **UI Restriction:** Timeframes exposed to the user are intentionally limited to high-value intervals (`24h`, `7d`, `30d`) to prevent infinite query variations.
2. **Composite Cache Keys:** Requests are cached using isolated, parameter-specific keys (e.g., `crypto-history-{uuid}-{period}`). This guarantees zero API cost when a user toggles back and forth between previously viewed timeframes.
3. **Smart Time-To-Live (TTL):** Cache expiration scales dynamically with the requested timeframe:
    * **Short-term (`24h`):** 1-hour TTL to maintain intra-day freshness.
    * **Mid/Long-term (`7d`, `30d`):** 24-hour TTL, recognizing that macro trends do not require minute-by-minute invalidation, achieving extreme API economy.

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
