# ACME Mail Portal

Build a responsive frontend-only employee and administration portal using the supplied mock-data brief. No inbox, message content, live mail client, or backend will be added.

## Build sequence
1. Establish the app shell, mock role session and role-specific navigation, design tokens, and typed delayed mock API/query layer.
2. Deliver employee dashboard, directory, notifications, and profile/settings; deliver admin dashboard, employees, mailboxes, distribution lists, provisioning jobs, health, audit, and settings screens.
3. Add access guards, SOGo external links, responsive and accessible controls, demo failure controls, loading/error/empty states, and key mock actions.
4. Verify route matching, focused tests, preview build signals, and the primary role-switching flows.

## Technical approach
- Preserve TanStack Start routing (the supplied React Router choice is adapted to the installed TanStack Router).
- Use typed mock API modules and TanStack Query for screen data, with a single API/SOGo configuration point.
- Keep auth and persistence in an in-memory demo context; do not enable Cloud or add a backend.
- Use existing shadcn controls and semantic tokens; keep source data out of page components.