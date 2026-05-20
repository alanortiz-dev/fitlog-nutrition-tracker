# FitLog - Mobile-first Nutrition Tracker

![React Badge](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB&style=flat)
![TypeScript Badge](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=flat)
![Vite Badge](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff&style=flat)
![Tailwind CSS Badge](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=fff&style=flat)
![Vitest Badge](https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=fff&style=flat)
![Playwright Badge](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=fff&style=flat)

**FitLog** is a mobile-first nutrition tracking MVP focused on fast daily food logging, macro visibility, and a clean wellness dashboard experience.

The project is built as a realistic frontend product slice: authentication flow, onboarding, daily tracking, food search, barcode scan simulation, custom food creation, entry confirmation, history, profile management, and reusable UI patterns.

The current version runs without a backend. Data, auth, barcode scanning, and food lookup are mocked intentionally so the project can focus on product flow, frontend architecture, UI quality, and future integration readiness.

---

## Product overview

FitLog is designed around a simple idea: logging food should feel quick, clear, and low-friction.

The app allows a user to:

- Start with a demo flow or onboarding flow
- Track calories and macros for the current day
- Add food by barcode scan, search, or manual creation
- Confirm quantity, meal type, and macro values before saving
- Review previous entries in history
- Manage profile and macro targets

This is not just a static UI. The app includes real frontend state, derived calculations, reusable components, routing, domain services, and a structure prepared for backend integration later.

---

## Core features

### Daily nutrition dashboard

- Today screen with calories, protein, carbs, and fat progress
- Macro ring components for quick visual feedback
- Meal sections grouped by breakfast, lunch, dinner, and snacks
- Floating add action optimized for mobile usage
- Delete support for existing diary entries

### Add food flow

FitLog supports three entry paths:

- Barcode scan simulation
- Food search
- Custom food creation

Each flow leads into a confirmation step where the user can review quantity, meal type, and calculated macros before saving the entry.

### Food search

- Search input with instant filtering
- Tabs for all foods, products, generic foods, and custom foods
- Empty state with a direct path to create a custom food
- Food list items connected to the confirmation flow

### Barcode scan simulation

- Simulated scanner state
- Found and not-found states
- Product preview with macro details
- Fallback paths to manual search or custom food creation

### Macro calculation

- Quantity-based macro recalculation
- Unit-aware quantity steps
- Rounded values for cleaner display
- Separated calculation logic in service functions

### Mock auth and demo mode

- Login and signup flows are currently mocked
- Demo mode loads a sample profile and diary entries
- The app can be explored locally without setting up external services

---

## Tech stack

- **React 18** - Component-based UI
- **TypeScript** - Typed domain models and safer state handling
- **Vite** - Fast development and production builds
- **React Router** - Client-side routing
- **Tailwind CSS** - Mobile-first styling and layout system
- **Radix UI** - Accessible UI primitives
- **Lucide React** - Icon system
- **TanStack Query** - Prepared for future server-state integration
- **Vitest** - Unit testing setup
- **Playwright** - End-to-end testing setup

---

## What this project demonstrates

This project is meant to show more than a polished screen.

It demonstrates:

- Mobile-first product thinking
- Clean separation between pages, components, context, services, and types
- Reusable UI components for dashboards, meal sections, macro cards, and empty states
- TypeScript models for nutrition, food entries, meals, goals, and user profile data
- Client-side state management with a clear path toward real persistence
- Domain logic separated from the UI layer
- Realistic user flows instead of isolated components
- A UI structure that can grow into a production app without being rewritten from zero

---

## Project structure

```text
src/
├── components/
│   ├── ui/                  # Shared UI primitives
│   ├── AppLayout.tsx        # Main authenticated app layout
│   ├── DiaryEntryCard.tsx   # Diary entry display
│   ├── EmptyState.tsx       # Reusable empty state
│   ├── FoodListItem.tsx     # Food search result item
│   ├── MacroGrid.tsx        # Macro summary grid
│   ├── MacroRing.tsx        # Circular macro progress indicator
│   ├── MealSection.tsx      # Entries grouped by meal
│   ├── MealSelector.tsx     # Meal selection control
│   ├── NavLink.tsx          # App navigation link
│   ├── PageHeader.tsx       # Shared page header
│   └── StatCard.tsx         # Small stat display card
│
├── constants/
│   └── meals.ts             # Meal type constants
│
├── context/
│   └── AppContext.tsx       # App state and actions
│
├── data/
│   └── mockData.ts          # Demo foods, profile, and entries
│
├── hooks/
│   ├── use-mobile.tsx       # Mobile detection helper
│   └── use-toast.ts         # Toast helper
│
├── lib/
│   └── utils.ts             # Shared utilities
│
├── pages/
│   ├── AddFood.tsx          # Entry method selection
│   ├── BarcodeScan.tsx      # Simulated barcode scan flow
│   ├── ConfirmEntry.tsx     # Quantity, meal, and macro confirmation
│   ├── CreateFood.tsx       # Custom food form
│   ├── History.tsx          # Past entries
│   ├── Index.tsx            # Initial route handling
│   ├── Landing.tsx          # Public landing screen
│   ├── Login.tsx            # Mock login
│   ├── Onboarding.tsx       # Profile setup
│   ├── Profile.tsx          # User profile and targets
│   ├── SearchFood.tsx       # Search and filter foods
│   ├── Signup.tsx           # Mock signup
│   └── Today.tsx            # Main daily dashboard
│
├── services/
│   ├── diaryService.ts      # Diary grouping, summaries, and date helpers
│   └── foodService.ts       # Food lookup, search, barcode lookup, and macro calculation
│
├── test/
│   └── setup.ts             # Test setup
│
├── types/
│   └── index.ts             # Shared domain types
│
├── App.tsx                  # Providers and route configuration
├── main.tsx                 # React entry point
└── index.css                # Global styles
```

---

## Key technical decisions

### 1. Keep the MVP focused

The current version intentionally avoids a backend. Auth, foods, diary entries, and barcode lookup are mocked so the frontend flow can be evaluated without external setup.

This keeps the project easy to run while still showing how the app would behave once connected to real services.

### 2. Separate domain logic from UI

Food search, macro calculation, diary grouping, and day summaries live in service files instead of being buried inside components.

That makes the UI easier to read and keeps the business logic easier to test, replace, or move to API calls later.

### 3. Use context as the temporary app state layer

`AppContext` centralizes the current app state and actions:

- Authentication state
- Demo mode
- User profile
- Diary entries
- Custom foods
- Macro targets
- Entry creation, update, and deletion

For the MVP, this is enough. For a production version, this layer can be replaced or connected to Supabase, Firebase, a REST API, or another backend without changing the full UI.

### 4. Design the app as a product flow

The app is not built as a collection of disconnected screens.

The main journey is:

```text
Landing/Login
    ↓
Onboarding or Demo
    ↓
Today dashboard
    ↓
Add food
    ↓
Scan, Search, or Create custom food
    ↓
Confirm entry
    ↓
Saved to Today
```

This makes the project easier to understand from a product and engineering perspective.

### 5. Build mobile-first

FitLog is designed around a narrow mobile layout because nutrition tracking is usually done quickly and repeatedly during the day.

The UI prioritizes:

- Fast actions
- Clear hierarchy
- Thumb-friendly controls
- Compact macro summaries
- Low visual noise
- Smooth daily usage

---

## Current scope

This version includes:

- Mock authentication
- Demo user mode
- Onboarding
- Daily macro dashboard
- Meal-based diary entries
- Food search and filtering
- Barcode scan simulation
- Custom food creation
- Quantity-based macro recalculation
- History screen
- Profile screen
- Local frontend state during the session

---

## Planned improvements

The next steps for this project are:

- Persist app state with `localStorage`
- Keep onboarding, profile, custom foods, diary entries, and demo state after refresh
- Add real barcode scanner support
- Connect food lookup to a nutrition database API
- Add form validation with stronger user feedback
- Add more coverage for macro calculation and diary services
- Add Playwright tests for the main logging flow
- Add a deployed live demo
- Improve accessibility details across interactive controls
- Add offline-first behavior for daily logging

---

## Getting started

Clone the repository:

```bash
git clone https://github.com/alanortiz-dev/fitlog-nutrition-tracker.git
```

Go to the project folder:

```bash
cd fitlog-nutrition-tracker
```

Install dependencies:

```bash
npm install
```

Run the app in development mode:

```bash
npm run dev
```

Open the local URL shown in your terminal.

No external API is required for the current version.

---

## Available scripts

```bash
npm run dev
```

Starts the development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run preview
```

Previews the production build locally.

```bash
npm run lint
```

Runs ESLint.

```bash
npm run test
```

Runs the Vitest test suite.

```bash
npm run test:watch
```

Runs Vitest in watch mode.

---

## Notes

Some parts are intentionally mocked:

- Authentication
- Barcode scanning
- Product lookup
- Food database
- Persistence

These are marked as future integration points. The goal of this version is to show the frontend architecture, product flow, and UI foundation before adding backend complexity.

---

## Why I built this

I built FitLog as a portfolio project to demonstrate how I approach frontend product development beyond static screens.

The focus is on building a clear, maintainable, mobile-first product experience with realistic flows, typed data, reusable components, and a structure that can evolve into a production-ready application.

---

## Contact

**Alan Ortiz**  
Frontend / Fullstack Developer

[LinkedIn](https://www.linkedin.com/in/alanortizdev/)  
[GitHub](https://github.com/alanortiz-dev)

Built with care by Alan Ortiz.
