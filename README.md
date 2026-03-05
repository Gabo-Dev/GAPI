# GAPI - Explorador de Datos Conciso

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)

**GAPI es un explorador de datos y una demostración de principios de arquitectura de software moderna aplicados a una aplicación React.**

> **Nota del Desarrollador:** Este proyecto es mi campo de juego personal para mejorar mis habilidades en JavaScript y el consumo de APIs. Lo que comenzó como un ambicioso dashboard de criptomonedas, se transformó en un estudio práctico sobre cómo construir software resiliente y bien estructurado frente a limitaciones del mundo real como el rate-limiting.

[**Ver Demo en Vivo →**](https://gapi-eight.vercel.app/)

---

### Features Principales

-   **Dashboard Comparativo:** Una comparación directa y optimizada entre Bitcoin (BTC) y Pi Network (PI).
-   **Gráficos Dinámicos:** Visualización de tendencias de precios generada con Recharts a partir de datos `sparkline`.
-   **Sección Educativa ("About"):** Un apartado dedicado a explicar las decisiones arquitectónicas, los patrones de diseño aplicados y las lecciones aprendidas durante el desarrollo.
-   **Precios Dinámicos:** Formateo inteligente de decimales para mostrar precios con la precisión adecuada (2 decimales para ≥ $1.00, 4 decimales para < $1.00).
-   **Persistencia de Tema:** Soporte para modo claro/oscuro que respeta las preferencias del sistema y guarda la elección del usuario en `localStorage`.

---

### Arquitectura y Diseño

La base de GAPI es su **diseño arquitectónico**, estructurado bajo los principios de **Clean Architecture**. Esto garantiza que la lógica de negocio (`core`) esté completamente desacoplada de la UI (`presentation`) y de la infraestructura (APIs, `localStorage`).

-   `src/core`: Contiene las entidades, casos de uso y contratos de repositorios. Es el corazón puro y agnóstico al framework de la aplicación.
-   `src/infrastructure`: Implementa la comunicación con APIs externas y el almacenamiento local.
-   `src/adapters`: Actúa como puente, conectando el `core` con la `presentation` a través de custom hooks y el Context de React.
-   `src/presentation`: Se encarga exclusivamente de renderizar la UI e interactuar con el usuario.

<details>
<summary><strong>Haz clic para ver la estructura detallada del proyecto</strong></summary>

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
    │   └── data/               # fallback-data.json (Safety net)
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

</details>

---

### Estrategias de Implementación

Esta sección profundiza en las soluciones técnicas implementadas para garantizar que la aplicación sea robusta, eficiente y resiliente.

<details>
<summary><strong>Estrategia de Adquisición de Datos (Jerarquía de 3 Capas)</strong></summary>

1.  **Capa 1: `localStorage` (Caché de Usuario):** Prioriza la entrega de datos en menos de 10ms, minimizando el overhead de la red y protegiendo la cuota de la API.
2.  **Capa 2: Coinranking API:** Sincroniza datos frescos solo cuando el caché está vacío o ha expirado.
3.  **Capa 3: `fallback-data.json`:** Actúa como red de seguridad para garantizar una UI funcional incluso durante caídas de la red o si la cuota de la API se agota.

</details>

<details>
<summary><strong>Protección contra Rate-Limit (Caching Dinámico)</strong></summary>

Para proteger la cuota de la API (5,000 reqs/mes), se implementa un caché dinámico para el historial de precios:

-   **Claves de Caché Compuestas:** Se usan claves específicas por parámetro (`crypto-history-{uuid}-{period}`), garantizando coste cero al alternar entre vistas ya consultadas.
-   **TTL Adaptativo:** El tiempo de expiración del caché escala con el período de tiempo solicitado:
    -   **`24h`:** TTL de 1 hora para mantener la frescura intradía.
    -   **`7d`, `30d`:** TTL de 24 horas, optimizando al máximo el uso de la API para tendencias a largo plazo.

</details>

---

### Stack Tecnológico

-   **Core:** [React](https://reactjs.org/) (con [Vite](https://vitejs.dev/))
-   **Lenguaje:** JavaScript (ES6+)
-   **Gestión de Estado:** React Context + Custom Hooks
-   **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
-   **Visualización de Datos:** [Recharts](https://recharts.org/)
-   **Testing:** [Vitest](https://vitest.dev/) y [React Testing Library](https://testing-library.com/)
-   **Tooling:** ESLint, Prettier, pnpm

---

### Cómo Ejecutarlo Localmente

1.  **Clonar:** `git clone https://github.com/Gabo-Dev/GAPI.git`
2.  **Entrar al directorio:** `cd GAPI`
3.  **Instalar dependencias:** `npm install`
4.  **Iniciar:** `npm run dev`

---

### Colaboraciones

Aunque el scope actual del proyecto está completo, siempre estoy abierto a escuchar ideas, sugerencias o recibir contribuciones que puedan mejorarlo. Si tenés alguna idea, no dudes en abrir un **Issue** para discutirla.
