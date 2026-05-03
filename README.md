# M-Plus Dashboard

> A secure, high-performance dashboard for exploring and visualizing NHTSA vPIC vehicle data. 
> 
> **Note:** This project serves as a technical assessment for the Front-end Developer position at M-Plus Software.

## Table of Contents

- [Background](#background)
- [Tech Stack](#tech-stack)
- [Install](#install)
- [Usage](#usage)
- [Architecture & Structure](#architecture--structure)
- [Testing](#testing)
- [Deployment](#deployment)

## Background

The M-Plus Dashboard is built to provide an intuitive interface for automotive analysts and administrators to query the NHTSA vPIC (Vehicle Product Information Catalog) API. The application solves the problem of parsing massive amounts of raw vehicle data by offering clean data tables, interactive pie charts, and CSV exports. It incorporates a robust Role-Based Access Control (RBAC) system to ensure that only authorized personnel can access sensitive manufacturer data and WMI (World Manufacturer Identifier) records.

## Tech Stack

This project leverages a modern React ecosystem:
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 & Tailwind Merge
- **Components:** shadcn/ui & Radix UI
- **State Management & Fetching:** `@tanstack/react-query`
- **Data Tables:** `@tanstack/react-table`
- **Validation:** Zod & React Hook Form
- **Authentication:** `jose` (JWT)
- **Data Visualization:** Recharts
- **Testing:** Playwright (E2E)

## Install

This project uses `pnpm` for dependency management.

```bash
# Clone the repository
git clone https://github.com/mikhaelesa/m-plus.git
cd m-plus

# Install dependencies
pnpm install
```

## Usage

### Environment Variables

Before running the application, you must configure the environment variables. Copy the `.env.example` file to create a local `.env` file:

```bash
cp .env.example .env
```

**Required Keys:**
- `JWT_SECRET`: A cryptographic secret key used to sign and verify JSON Web Tokens for the authentication system. (You can easily generate one securely using [JWT Secret Key Generator](https://jwtsecretkeygenerator.com/)).
- `NEXT_PUBLIC_VPIC_BASE_URL`: The base URL for the NHTSA vPIC API (e.g., `https://vpic.nhtsa.dot.gov/api/vehicles`).

### Running Locally

To start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Dummy Credentials

To explore the dashboard and test the RBAC system, you can use the following pre-configured credentials (defined in [src/constants/users.ts](src/constants/users.ts)):

#### Role-Based Access Control (RBAC)
The application implements a strict RBAC system. Depending on the user's role, the UI and accessible features will vary:
- **Admin**: Has full access to all dashboard sections, including sensitive Manufacturer and WMI (World Manufacturer Identifier) data.
- **User**: Restricted to general dashboard analytics and visualizations; navigation and data tables for specific manufacturer details are hidden or restricted.

## Architecture & Structure

The project strictly follows a feature-driven architecture within the Next.js App Router paradigm.

### Folder Structure
```text
.
├── e2e/                     # Playwright End-to-End test suites and POMs
├── src/
│   ├── app/                 # Next.js App Router pages and API routes
│   │   ├── dashboard/       # Protected dashboard layouts and pages
│   │   └── login/           # Authentication entry point
│   ├── components/          # Global UI building blocks
│   │   ├── ui/              # shadcn UI components (Atoms)
│   │   └── molecules/       # Composed UI components
│   ├── hooks/               # Custom React hooks (e.g., query fetching)
│   ├── lib/                 # Utility functions (e.g., CSV download, generic helpers)
│   ├── providers/           # Context providers (React Query, Theme, etc.)
│   └── services/            # Direct integrations with the NHTSA vPIC API
└── playwright.config.ts     # E2E Test configuration
```

### Architectural Decisions & Trade-offs
- **Client-Side Fetching vs Server Components:** While Next.js heavily promotes Server Components, we utilize `@tanstack/react-query` heavily on the client side for the data tables. This trade-off trades initial SEO/SSR payload size for a highly reactive, client-side pagination and sorting experience without requiring full page reloads.
- **Stateless JWT Authentication:** We use `jose` to handle JWTs in middleware. This trade-off removes the need for a database to store session states (improving speed and lowering infrastructure costs) at the cost of being unable to immediately revoke specific user sessions before token expiration.
- **Mock-Driven Testing:** Our Playwright E2E tests intercept network requests to return static JSON/CSV mocks. This ensures our CI/CD pipelines never fail due to NHTSA API rate limits or downtime, trading end-to-end integration purity for pipeline stability and determinism.

## Testing

We use Playwright for robust End-to-End testing, simulating user interactions, RBAC restrictions, and data exports.

It is recommended to run Playwright through `pnpm exec` to respect the local environment bindings:

```bash
# Run all E2E tests headlessly (Recommended)
pnpm exec playwright test

# Alternatively, using npx:
npx playwright test

# View the HTML test report
pnpm exec playwright show-report
```

## Deployment

The application can be built and deployed to any Node.js environment or serverless platform like Vercel.

```bash
# Build the production bundle
pnpm build

# Start the production server
pnpm start
```
