# Orbit CRM

A polished, mock-first CRM for managing customer relationships, reviewing pipeline health, and practising role-based access control in a modern React application.

## Highlights

- Contact directory with search and lifecycle-stage filtering
- Create and delete contact workflows with loading, error, and retry states
- Dashboard metrics, recent activity, stage composition, and high-value opportunities
- Switchable demo users with `admin`, `sales-manager`, and `sales-rep` roles
- Permission-aware UI and protected routes
- A mock API that behaves like a networked service, including controllable failures

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
npm run dev
```

## Quality checks

```bash
npm run lint
npm test -- --run
npm run build
```

## Mock API

The application deliberately uses a local in-memory API so it can be demonstrated without external services. Contact services retain the same boundary as a real API:

```ts
getContacts();
createContact(input);
deleteContact(contactId);
```

For error-state testing, `failNextMockRequest()` simulates a failed request. TanStack Query retries once before the UI shows a retry action.

## Project structure

```text
src/
  features/
    auth/        # demo users, roles, permissions, route/UI guards
    contacts/    # components, schemas, services, hooks, tests
    dashboard/   # summary and insight utilities
  pages/         # route-level UI
  components/ui/ # reusable loading, empty, and error states
```

## Next steps

- Add contact editing and activity notes
- Add component tests for retry states and dashboard insights
- Replace the mock service implementations with a real backend when needed
