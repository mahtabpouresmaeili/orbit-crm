# Orbit CRM

[![CI](https://github.com/mahtabpouresmaeili/orbit-crm/actions/workflows/ci.yml/badge.svg)](https://github.com/mahtabpouresmaeili/orbit-crm/actions/workflows/ci.yml)
[![Live demo](https://img.shields.io/badge/demo-live-232f50?logo=vercel&logoColor=white)](https://orbit-crm-nine.vercel.app)

A polished CRM for managing customer relationships, reviewing pipeline health, and practising role-based access control in a modern React application.

**[View the live demo](https://orbit-crm-nine.vercel.app)**

## Highlights

- Contact directory with search and lifecycle-stage filtering
- Create and delete contact workflows with loading, error, and retry states
- Dashboard metrics, recent activity, stage composition, and high-value opportunities
- Switchable demo users with `admin`, `sales-manager`, and `sales-rep` roles
- Permission-aware UI and protected routes
- An Express API with request validation, CORS configuration, and in-memory data

## Stack

- React 19 + TypeScript
- Vite
- TanStack Query
- Zod
- React Router
- Vitest + Testing Library

## Roles and permissions

| Role                 | Dashboard | View contacts | Create contacts | Delete contacts |
| -------------------- | --------- | ------------- | --------------- | --------------- |
| Admin                | Yes       | Yes           | Yes             | Yes             |
| Sales manager        | Yes       | Yes           | Yes             | Yes             |
| Sales representative | Yes       | Yes           | Yes             | No              |

Use the user switcher in the sidebar to see permissions applied to the UI. Routes are also protected, so access is not based on visibility alone.

## Run locally

```bash
npm install
npm run server:dev
```

In a second terminal, start Vite:

```bash
npm run dev
```

## Quality checks

```bash
npm run lint
npm test -- --run
npm run build
```

## Express API

The Express server in `server/` uses in-memory data for local development. Vercel uses the serverless function in `api/contacts.ts` at the same `/api/contacts` URL. Both implementations expose these routes:

```text
GET     /api/contacts
POST    /api/contacts
PATCH   /api/contacts/:id
DELETE  /api/contacts/:id
```

The frontend calls the API with `fetch`, and Zod validates new contacts in both the frontend and backend. The Vercel function keeps demo data in memory, so changes are temporary and may reset between serverless invocations. Use a persistent database for production data. Vercel does not require `VITE_API_URL`; locally, Vite proxies `/api` requests to Express on port 3000.

## Project structure

```text
src/
  features/
    auth/        # demo users, roles, permissions, route/UI guards
    contacts/    # components, schemas, services, hooks, tests
    dashboard/   # summary and insight utilities
  pages/         # route-level UI
  components/ui/ # reusable loading, empty, and error states
server/          # Express API and backend validation schemas
```

## Next steps

- Add contact editing and activity notes
- Add component tests for retry states and dashboard insights
- Replace the in-memory API data with a persistent database
