# Operations Dashboard

A front-end portfolio demo for exploring team activity, task readiness, location performance, and connected assets. Built with React, TypeScript, Material UI, and Recharts, with an indigo visual identity and responsive light and dark themes.

This project was adapted from a technical exercise into a generic operations showcase. All people, locations, events, and telemetry are fictional sample data. It does not represent a client deployment or connect to a live monitoring service.

## Features

- Operations overview with task completion KPIs and alert summaries
- Team search and readiness filtering, member selection, and activity navigation
- Task checklists, capacity utilization, workload levels, and device status
- Team activity charts and incident timelines
- Location filtering, performance comparisons, completion trends, and issue maps
- Alert acknowledgement and interactive header notifications
- Persistent light/dark theme preference
- Collapsible sidebar and responsive navigation
- Static previews for team performance, incident tracking, asset monitoring, and operational insights

## Screens

| Route | Screen | Behavior |
| --- | --- | --- |
| `/` | Operations overview | Search, readiness filters, member selection, and alert acknowledgement |
| `/team-activity/:workerId` | Team activity | Member selection, checklist, workload charts, and event history |
| `/location-analytics` | Location analytics | Location selection and scoped analytics |
| `/team-performance` | Team performance | Static role comparison and checklist gaps |
| `/incidents` | Incident tracking | Sample incident register and contributing conditions |
| `/asset-monitoring` | Asset monitoring | Simulated telemetry and asset events |
| `/operational-insights` | Operational insights | Sample suggestions and an illustrative planning scenario |

The collection route `/team-activity` opens the first sample member. Unknown routes return to the overview.

## Tech stack

- React 19 and TypeScript
- Vite
- Material UI
- React Router
- Recharts
- CSS variables and responsive layouts

## Local development

Use Node.js **20.19+** or **22.12+**, and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Check TypeScript and create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Architecture

```text
src/
├── assets/icons/          # Reusable SVG icons
├── components/
│   ├── dashboard/        # Overview panels
│   ├── team-activity/    # Member activity panels
│   ├── location-analytics/ # Location analytics panels
│   └── placeholders/     # Static preview screens
├── data/                 # Typed fictional datasets
├── layouts/              # Shared navigation and member selection
├── pages/                # Page composition and interaction state
├── types/                # Domain and preview models
├── routes.tsx            # Route definitions
├── theme.ts              # Material UI configuration
└── index.css             # Layout, components, and theme tokens
```

Page components own filtering and selection state, while reusable panels render their supplied data. Shared summary cards use `StatCard`. Typed datasets separate sample content from presentation.

Task completion is the percentage of assigned work completed. Readiness indicates whether every checklist item is complete; it is distinct from completion percentage. Utilization measures the percentage of available capacity allocated, and queue load charts show a sample percentage over the day. Location summaries aggregate the sample roster and alerts.

## Demo scope and limitations

- The application has no backend, authentication, or persistent domain storage.
- All operational data comes from `src/data`; dates and times belong to a fixed sample scenario.
- Asset telemetry is simulated. Operational insights are authored examples, with no AI service or predictive model behind them.
- Preview screens are mostly static. Export/report controls, remote controls, and suggestion delivery are placeholders; they do not download reports, operate equipment, or send messages.
- Overview alert acknowledgements are local to that page and reset when it remounts. Header notification read state also resets when its component remounts. Neither updates the historical datasets.
- Theme preference is saved in local storage using `operations-dashboard-theme`.
- The layout targets desktop and tablet, with mobile navigation and scrollable data tables.
- Google Fonts supplies Roboto, with system font fallbacks.

The showcase emphasizes reusable components, typed data, interactive filtering, chart composition, and responsive interface design.
