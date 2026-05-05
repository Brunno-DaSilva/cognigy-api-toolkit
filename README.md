# Cognigy API Toolkit

A professional React dashboard for interacting with the Cognigy.AI API.

## Features

- **Get Logs** — Fetch, filter, paginate, and export all Cognigy project logs to JSON
- **Snapshots** — *(coming soon)*
- **Analytics** — *(coming soon)*

## Tech Stack

- React 18 + Vite
- Recharts
- CSS (no UI library — custom design system)

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx       # Icon navigation sidebar
│   │   └── Topbar.jsx        # Top header bar
│   ├── tools/
│   │   └── GetLogs/
│   │       ├── index.jsx         # Orchestrator
│   │       ├── ApiConfig.jsx     # Base URL, Project ID, API Key, dates
│   │       ├── LogFilters.jsx    # Type chips, flow name, user ID, sort
│   │       ├── ActionBar.jsx     # Fetch + Download buttons
│   │       ├── FetchProgress.jsx # Progress bar, stat cards, terminal
│   │       └── TypeBreakdown.jsx # Log breakdown by type
│   └── ui/
│       ├── Card.jsx
│       ├── StatCard.jsx
│       ├── FormField.jsx
│       ├── TypeChip.jsx
│       ├── Terminal.jsx
│       ├── NavIcon.jsx
│       └── ComingSoon.jsx
├── hooks/
│   └── useFetchLogs.js       # All pagination logic
├── constants/
│   └── index.js              # Nav items, type config, defaults
├── utils/
│   └── index.js              # Date helpers, download, formatting
└── styles/
    └── index.css             # Global design system
```

## Adding a New Tool

1. Create `src/components/tools/YourTool/index.jsx`
2. Add an entry to `src/constants/index.js` → `NAV_ITEMS`
3. Add a case to the switch in `src/App.jsx`
