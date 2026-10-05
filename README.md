# Shank's Code — Modern Technology Education Platform

Welcome to the **Shank's Code** repository. This platform combines a public educational showcase for discovering cutting-edge engineering programs with an authenticated student learning portal.

---

## 🏛️ Architecture Overview

The repository is organized into three primary areas:

```
shanks-code/
├── client/                     # Frontend: React 18 + TypeScript + Vite + Tailwind CSS
├── server/                     # Backend: Node.js + Express REST API (Handled by backend team)
└── docs/                       # Authoritative Product, Architecture & Testing Specs
```

---

## 📚 Authoritative Documentation Suite (`docs/`)

All development must strictly conform to the specifications in `docs/`:

1. [01-PRODUCT-SPEC.md](file:///d:/shankscode/docs/01-PRODUCT-SPEC.md) — Product vision, mission, personas, and core values.
2. [02-PAGE-MAP.md](file:///d:/shankscode/docs/02-PAGE-MAP.md) — Full route inventory and access control matrix.
3. [03-FEATURE-SPEC.md](file:///d:/shankscode/docs/03-FEATURE-SPEC.md) — Confirmed feature scope (and explicitly excluded features).
4. [04-USER-FLOWS.md](file:///d:/shankscode/docs/04-USER-FLOWS.md) — Step-by-step user journeys and sequence diagrams.
5. [05-DESIGN-SYSTEM.md](file:///d:/shankscode/docs/05-DESIGN-SYSTEM.md) — Visual tokens, Light-First palette (Deep Navy `#0F172A`, Electric Blue `#2563EB`), typography, and components.
6. [06-FRONTEND-ARCHITECTURE.md](file:///d:/shankscode/docs/06-FRONTEND-ARCHITECTURE.md) — Feature-first directory structure, state management, and strict API modes.
7. [07-API-CONTRACT.md](file:///d:/shankscode/docs/07-API-CONTRACT.md) — Shared REST API contracts between client and server.
8. [08-AGENT-RULES.md](file:///d:/shankscode/docs/08-AGENT-RULES.md) — AI agent rules of engagement and Definition of Done.
9. [09-TESTING-PLAN.md](file:///d:/shankscode/docs/09-TESTING-PLAN.md) — Quality assurance, responsive viewport matrix, and build verification.

---

## 🎨 Visual Identity

- **Light-First Interface**: Clean white (`#FFFFFF`) card surfaces on soft neutral (`#F8FAFC`, `#F1F5F9`) backgrounds.
- **Brand Colors**: **Deep Navy** (`#0F172A`) for authoritative headings, **Electric Blue** (`#2563EB`) for interactive buttons and active states.
- **No Distractions**: No dark mode, no theme toggles, no excessive glassmorphism, and no neon glows.

---

## 🔌 API Modes & Zero Silent Fallback

The client operates under explicit environment modes configured in `client/.env`:

- `VITE_API_MODE=mock`: Consumes local typed datasets from `src/mocks/` with simulated latency for offline development.
- `VITE_API_MODE=live`: Makes HTTP requests to `VITE_API_BASE_URL`.
- **Zero Silent Fallback**: If live mode fails, the UI renders an `ErrorState` with a retry action—never silently falling back to mock data.

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Running the Client
```bash
cd client
npm install
npm run dev
```

### Running the Server
```bash
cd server
npm install
npm run dev
```
