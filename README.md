# GAPI – API Dashboard (React Learning Project)

> Educational project focused on **frontend best practices**, **clean / hexagonal architecture**, **performance optimization**, and **efficient API consumption**, using a **backend intermediary (API Gateway / BFF)**.

---

## 🎯 Project Goal

The main goal of this project is **not to build a commercial product**, but to develop a **solid, maintainable, and well-structured frontend application**, similar to what is expected in professional environments.

This project aims to practice and consolidate:

* Advanced usage of **React Hooks**
* **TypeScript** applied to a real-world project
* Clear separation of responsibilities
* **Hexagonal / Clean Architecture in frontend**
* Performance optimization
* Reduction of unnecessary API calls
* Readable, predictable, and easily extensible code

The backend exists **only as technical support** (proxy, security, rate limiting, caching, and fallback), not as the main focus of the project.

---

## 🧩 General Overview

The application works as a **dashboard** that consumes information from **three independent domains**, accessible through a simple UI (buttons or sections).

### Available Domains

1. 📈 **Economy / Cryptocurrencies**
   Cryptocurrency market data (price, market cap, volume).

2. 🌌 **Martian Weather**
   Weather information from Mars based on NASA InSight mission data.

3. 🧪 **NASA Technology Transfer**
   Patents, software, and technology spinoffs available for transfer.

Each domain is implemented as an **isolated module**, allowing practice of:

* logic reuse
* custom hooks
* mapping external API data to domain models
* caching and flow control
* adapting external APIs without polluting the domain layer

---

## 🏗️ General Architecture

The project is split into **two independent applications**:

```
Frontend (React)
        ↓
Mini Backend (API Gateway / BFF)
        ↓
External APIs
```

### Frontend

Responsibilities:

* UI rendering
* State management and UX
* Calling **only** backend-owned endpoints

### Backend (API Gateway / BFF)

Responsibilities:

* Acting as an intermediary between frontend and external APIs
* Protecting API keys
* Normalizing responses
* Session-based rate limiting
* In-memory caching with TTL
* Historical / predefined data fallback

---

## 🔐 Initial Access Control (hCaptcha)

The project implements an **initial access control using hCaptcha**, for educational purposes only.

### Simplified Flow

1. User accesses the application
2. A welcome screen with **hCaptcha** is displayed
3. The captcha token is sent to the backend for validation
4. If valid, the backend issues a **temporary session token**
5. The token is delivered via an **HttpOnly cookie**
6. API calls are allowed only with a valid session

> ⚠️ This mechanism is **not intended as a definitive anti-bot solution**, but as a controlled way to practice real backend patterns.

---

## 🍪 Session Management

* The session token:

  * Does not represent user identity
  * Does not contain sensitive information
  * Has a **short TTL**

* The token is sent to the client using:

```
Set-Cookie: session=TOKEN;
HttpOnly;
Secure;
SameSite=None
```

This prevents exposing the token to browser JavaScript and simulates real-world application flows.

---

## 🌐 APIs Used

### 📈 Coinranking API (Economy / Cryptocurrencies)

* Cryptocurrency prices, market capitalization, and volume
* Authentication via **API key**
* Free plan: **5,000 requests / month**

Base endpoint:

```
https://api.coinranking.com/v2/coins
```

Fallback: historical JSON data when usage limits are reached.

---

### 🌌 NASA InSight Mars Weather API

* Martian weather data by Sol (Martian day)
* Temperature, pressure, wind speed and direction

Main endpoint:

```
https://api.nasa.gov/insight_weather/?api_key=YOUR_KEY&feedtype=json&ver=1.0
```

Fallback: historical dataset from previous Sols.

---

### 🧪 NASA Technology Transfer API

* Information about:

  * Patents
  * Software
  * Spinoffs

Base endpoint:

```
https://technology.nasa.gov/api/api/[patent|software|spinoff]/{keywords}
```

Fallback: predefined, normalized results.

---

## 🛠️ Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Fetch API

### Backend

* Node.js / Express (adapted to Netlify Functions)
* Environment variables for secrets
* In-memory cache

---

## 📦 Project Management with pnpm

This project uses **pnpm** as the default dependency manager.

### Requirements

* Node.js (LTS recommended)
* pnpm installed globally:

```
npm install -g pnpm
```

### Install Dependencies

From the project root:

```
pnpm install
```

This installs dependencies for both **frontend** and **backend**.

---

## ▶️ Development

### Frontend

```
cd frontend
pnpm dev
```

### Backend

```
cd backend
pnpm dev
```

Backend runs as a local API Gateway for development.

---

### Environment Variables (Backend)

Example `.env` file:

```
COINRANKING_API_KEY=your_key_here
NASA_API_KEY=your_key_here
PORT=3001
```

> ⚠️ API keys must **never** be exposed in the frontend or committed to the repository.

---

## 🚀 Deployment with Netlify (Frontend + Backend)

This project is deployed using **Netlify**, allowing both frontend and backend (as serverless functions) in a single deployment.

* **Frontend:** static build from Vite
* **Backend:** Express endpoints adapted to Netlify Functions (`/functions`)

Workflow:

1. Build frontend with `pnpm build`
2. Deploy both frontend and functions via Netlify
3. Frontend communicates with backend functions seamlessly

> This setup reflects a real-world scenario where static frontends and API endpoints are hosted together, simplifying deployment while keeping the architecture clear.

---

## 📁 Project Structure

### Frontend

```
src/
 ├── domain/
 │    ├── entities/
 │    ├── valueObjects/
 │    ├── types/
 │    └── services/
 ├── application/
 │    ├── useCases/
 ├── infrastructure/
 │    ├── adapters/
 │    ├── api/
 │    └── mappers/
 ├── presentation/
 │    ├── components/
 │    ├── hooks/
 │    ├── pages/
 │    └── layouts/
 ├── shared/
 │    ├── utils/
 │    └── constants/
 └── main.tsx
```

### Backend (Netlify Functions)

```
functions/
 ├── api/
 │    ├── coins.js
 │    ├── marsWeather.js
 │    └── nasaTech.js
 └── utils/
      └── helpers.js
```

---

## 🧭 Development Phases

1. Environment setup
2. Frontend and backend bootstrap
3. Architecture and structure definition
4. Domain modeling
5. Domain services
6. Infrastructure and adapters
7. Use cases
8. UI integration
9. Optimization and quality

---

## 🚀 Project Status

🟡 **In development**

---

## 📌 Final Note

This project is designed as an **advanced learning exercise**, not as a production-ready application intended to scale or handle sensitive data.
