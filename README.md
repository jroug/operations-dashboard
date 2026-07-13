# SafeWithCarmen Dashboard

A React dashboard for monitoring worker safety, PPE compliance, worksite status and operational alerts. The application was developed as a front-end take-home assignment using local mock data.

---

## Features

- Worker safety dashboard
- PPE compliance monitoring
- Live alerts management
- Employee history
- Worksite analysis
- Interactive charts
- Light and dark themes with a persistent header toggle
- Responsive layout
- Mock data driven
- Reusable component architecture

---

## Tech Stack

- React 19
- TypeScript
- Vite
- Material UI
- React Router
- Recharts
- CSS (responsive for desktop and tablet)

---

## Requirements

- Node.js **20.19+** or **22.12+**
- npm

---

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the URL displayed by Vite (typically `http://localhost:5173`).

---

## Available Scripts

Run the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run ESLint:

```bash
npm run lint
```

---

## Implemented Screens

### Fully Implemented

- **Dashboard (`/`)**
  - Workforce overview
  - KPI cards
  - Search & filtering
  - Worker selection
  - PPE status
  - Biometrics
  - Live alerts
  - Navigation to employee history

- **Employee History (`/employee-history/:workerId`)**
  - Employee profile
  - Historical compliance trends
  - PPE overview
  - Biometrics
  - Incident timeline

- **Worksite Analysis (`/worksite-analysis`)**
  - Worksite KPIs
  - Site comparison
  - Compliance charts
  - Risk zone map
  - Alert severity analysis

### Static Preview Screens

- Role Analysis
- Accidents
- Robot Monitoring
- AI Recommendations

These pages are visually complete but intentionally remain mostly static, using mock content and placeholder interactions where appropriate.

---

## Architecture & Design Decisions

- The application is entirely front-end and does not perform API calls.
- All data is stored locally under `src/data`.
- The provided mock dataset was extended with additional data for the Employee History and Worksite Analysis pages to better demonstrate charts, analytics, and UI interactions.
- Authentication and persistent domain data are intentionally out of scope.
- Application routing is implemented with React Router using a shared `MainLayout` and `Outlet`.
- Large page sections are separated into reusable, strongly typed React components.
- Shared summary cards use a common `StatCard` component.
- Inline SVGs were extracted into reusable assets under `src/assets/icons`.
- Header notifications are interactive at the UI layer: users can open the notification panel and mark individual or all mock notifications as read. Their state is intentionally local and resets after a page reload because API integration and persistent storage are outside the assignment scope.
- The application supports complete light and dark themes through shared CSS variables and a root `data-theme` attribute. Users can switch themes from the shared header, and the UI preference is retained in local storage across navigation and page reloads.
- The color system follows a consistent semantic approach:
  - **Blue** → navigation & interactive elements
  - **Green** → success / compliant states
  - **Orange** → warnings
  - **Red** → critical alerts
- Charts are implemented using Recharts.
- The UI is optimized primarily for desktop and tablet, with responsive layouts for smaller screens.
- The project emphasizes clean architecture, component reusability and maintainability over feature completeness.

---

## Project Structure

```text
src/
├── assets/
│   └── icons/
├── components/
├── data/
├── layouts/
├── pages/
├── types/
├── App.tsx
├── index.css
├── main.tsx
├── routes.tsx
└── theme.ts
```

---

## Notes

This project was developed as a front-end technical assessment and focuses on:

- Clean code
- Component reusability
- Type safety
- Responsive design
- Maintainable project structure
- Modern React best practices
