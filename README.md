# Playwright UI + API Automation Framework

A production-grade test automation framework built with **Playwright**, **TypeScript**. Covers UI automation, REST API testing, contract validation, mock server testing with error simulation, and a full CI/CD pipeline via GitHub Actions.

---

## Table of Contents

- [What This Framework Does](#what-this-framework-does)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [How to Add a New Page Object](#how-to-add-a-new-page-object)
- [How to Add a New API Test](#how-to-add-a-new-api-test)
- [How to Add a New Contract](#how-to-add-a-new-contract)
- [Architecture Overview](#architecture-overview)
- [CI/CD Pipeline](#cicd-pipeline)

---

## What This Framework Does

| Layer | What is tested | Tools |
|---|---|---|
| UI | SauceDemo e-commerce flows | Playwright, Page Object Model |
| API | Reqres.in REST endpoints | Playwright APIRequestContext |
| Contract | Schema agreements between consumer and provider | Zod, ContractValidator |
| Mock | Local microservice CRUD and error simulation | json-server, custom middleware |

---

## Tech Stack

- **Playwright** — browser automation and API testing
- **TypeScript** — strict mode, NodeNext module resolution
- **Zod** — runtime schema validation and contract definitions
- **json-server** — local mock REST API with custom error middleware
- **Allure** — test reporting with epics, features, and severity tags
- **GitHub Actions** — CI/CD pipeline with artifact upload

---

## Project Structure

```
├── .github/workflows/
│   └── playwright.yml          # CI/CD pipeline
├── config/
│   ├── loader.ts               # Environment config loader
│   ├── types.ts                # EnvironmentConfig interface
│   ├── .env.local              # Local environment variables (gitignored)
│   └── .env.staging            # Staging environment variables (gitignored)
├── contracts/
│   ├── ContractTypes.ts        # EndpointContract, ContractResult interfaces
│   ├── ContractValidator.ts    # Validates API responses against Zod schemas
│   └── apiContracts.ts         # Contract definitions for each endpoint
├── mock-server/
│   ├── db.backup.json          # Clean seed data (source of truth)
│   ├── middleware.ts           # Error simulation middleware factory
│   └── server.ts               # Programmatic json-server with middleware
├── pages/
│   ├── BasePage.ts             # Abstract base class for all page objects
│   ├── AuthenticationPage.ts
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── schemas/api/
│   ├── user.schema.ts          # Zod schemas for user endpoints
│   └── mock.schema.ts          # Zod schemas for mock server endpoints
├── tests/
│   ├── fixtures/
│   │   ├── apiFixtures.ts      # apiClient, authenticatedClient, mockClient
│   │   └── uiFixtures.ts       # authPage, inventoryPage, loggedInPage etc.
│   ├── API/
│   │   ├── users.spec.ts
│   │   ├── auth.spec.ts
│   │   ├── contracts.spec.ts
│   │   ├── mockServer.spec.ts
│   │   └── errorSimulation.spec.ts
│   └── UI/
│       ├── authentication.spec.ts
│       ├── cart.spec.ts
│       ├── E2ECheck.spec.ts
│       └── inventory.spec.ts
├── types/
│   ├── env.d.ts                # Typed process.env declarations
│   └── api/
│       ├── user.types.ts
│       ├── auth.types.ts
│       └── mock.types.ts
└── utils/
    ├── factories/              # DataFactory instances per entity
    ├── ApiClient.ts            # HTTP client implementing IApiClient
    ├── ApiError.ts             # Typed error class for HTTP failures
    ├── AuthManager.ts          # Token cache and Bearer auth headers
    ├── CustomReporter.ts       # Playwright reporter writing failures.json
    ├── DataFactory.ts          # Generic typed test data factory
    ├── IApiClient.ts           # Interface all HTTP clients implement
    ├── logger.ts               # Structured logger with log levels
    ├── retryUtility.ts         # Generic retry with configurable backoff
    └── validateSchema.ts       # Zod schema validation utility
```

---

## Prerequisites

- Node.js 20+
- npm 9+
- Git

---

## Installation

```bash
git clone https://github.com/mudgalvanya03/Playwright-UI-API-Automation.git
cd Playwright-UI-API-Automation
npm ci
npx playwright install --with-deps chromium
```

---

## Configuration

The framework loads environment-specific config from `config/.env.{ENV}` using `dotenv`. Create `config/.env.local` with the following variables:

```env
BASE_URL=https://www.saucedemo.com
API_URL=https://reqres.in/api
ENVIRONMENT=local
TIMEOUT_MS=30000
HEADLESS=true
REQRES_API_KEY=your_api_key_here
MOCK_SERVER_URL=http://localhost:3001
```

Switch environments by setting the `ENV` variable before running:

```bash
ENV=staging npx playwright test
```

---

## Running Tests

### All UI tests
```bash
npx playwright test tests/UI --project=chromium
```

### All API tests
```bash
npx playwright test tests/API/users.spec.ts tests/API/auth.spec.ts tests/API/contracts.spec.ts --project=chromium
```

### Mock server tests (requires mock server running)
```bash
# Terminal 1
npm run mock-server

# Terminal 2
npx playwright test tests/API/mockServer.spec.ts --project=chromium
```

### Error simulation tests
```bash
# Terminal 1 — start mock server
npm run mock-server

# Terminal 2
npx playwright test tests/API/errorSimulation.spec.ts --project=chromium
```

### Full suite
```bash
npx playwright test --project=chromium
```

### With Allure report
```bash
npx playwright test --project=chromium
npx allure generate allure-results --clean
npx allure open allure-report
```

---

## How to Add a New Page Object

1. Create a new file in `pages/` — for example `pages/ProfilePage.ts`

2. Extend `BasePage` and implement `waitForPageLoad`:

```typescript
import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProfilePage extends BasePage {
    private readonly locators = {
        profileName: this.page.locator('[data-test="profile-name"]'),
        editButton:  this.page.locator('[data-test="edit-profile"]')
    };

    constructor(page: Page) {
        super(page);
    }

    async waitForPageLoad(): Promise<void> {
        await this.locators.profileName.waitFor({ state: 'visible' });
    }

    async getProfileName(): Promise<string> {
        return this.locators.profileName.innerText();
    }

    async clickEdit(): Promise<void> {
        await this.locators.editButton.click();
    }
}
```

3. Add the page to `tests/fixtures/uiFixtures.ts` if it needs to be available as a fixture across tests.

4. Write tests in `tests/UI/profile.spec.ts` using the fixture.

---

## How to Add a New API Test

1. Define types in `types/api/` if the endpoint has a new response shape.

2. Add a Zod schema in `schemas/api/` for runtime validation:

```typescript
// schemas/api/profile.schema.ts
import { z } from 'zod';

export const ProfileSchema = z.object({
    id: z.number(),
    username: z.string(),
    bio: z.string().optional()
});

export type ValidatedProfile = z.infer<typeof ProfileSchema>;
```

3. Create a factory in `utils/factories/` if the endpoint needs a request body.

4. Write the test in `tests/API/` using the `apiClient` fixture:

```typescript
import { test, expect } from '../fixtures/apiFixtures';
import { validateSchema } from '../../utils/validateSchema';
import { ProfileSchema } from '../../schemas/api/profile.schema';

test('Get profile returns valid shape', async ({ apiClient }) => {
    const raw = await apiClient.get<unknown>('/profile/1');
    const profile = validateSchema(ProfileSchema, raw);
    expect(profile.id).toBeDefined();
});
```

---

## How to Add a New Contract

1. Add a Zod schema for the endpoint if one does not exist yet (see above).

2. Define the contract in `contracts/apiContracts.ts`:

```typescript
import { ProfileSchema, ValidatedProfile } from '../schemas/api/profile.schema';

export const getProfileContract: EndpointContract<ValidatedProfile> = {
    name: 'GET /profile/:id',
    method: 'GET',
    path: '/profile/1',
    responseSchema: ProfileSchema
};
```

3. Add it to the suite in `tests/API/contracts.spec.ts`:

```typescript
const suiteResult = await validator.validateSuite(
    'Reqres Contract Suite',
    [
        getUserContract,
        getUserListContract,
        getCreateUserContract,
        getProfileContract   // ← add here
    ]
);
```

That is all. The `ContractValidator` handles the HTTP call, schema validation, violation reporting, and timing automatically.

---

## Architecture Overview

```
Tests
  └── Fixtures (apiFixtures, uiFixtures)
        └── ApiClient (implements IApiClient)
              ├── AuthManager       (token cache, Bearer headers)
              ├── RetryUtility      (configurable retry with backoff)
              └── ApiError          (typed HTTP error)

ContractValidator (depends on IApiClient — not ApiClient)
  └── EndpointContract + Zod schema → ContractResult

BasePage (abstract)
  └── LoginPage, InventoryPage, CartPage, CheckoutPage, AuthenticationPage

ConfigLoader
  └── dotenv → EnvironmentConfig → typed via env.d.ts

json-server (mock server)
  └── createErrorMiddleware → deterministic failure injection
```

Every class that depends on another class depends on its **interface**, not its concrete implementation. `ApiClient` → `IApiClient`. `ContractValidator` → `IApiClient`. `AuthManager` constructor → `IApiClient`. This means any component can be swapped or mocked without touching its consumers.

---

## CI/CD Pipeline

The GitHub Actions workflow at `.github/workflows/playwright.yml` runs on every push and pull request to `main`.

**Steps:**
1. Checkout code
2. Setup Node.js 20 with npm cache
3. Install dependencies via `npm ci`
4. Install Chromium with system dependencies
5. Create `config/.env.local` from GitHub Secrets
6. Restore clean `mock-server/db.json` from `db.backup.json`
7. Run UI tests
8. Run API tests (users, auth, contracts)
9. Start mock server and wait for readiness
10. Run mock server tests
11. Upload Playwright HTML report as artifact (30-day retention)

**Required GitHub Secrets:**

| Secret | Value |
|---|---|
| `BASE_URL` | `https://www.saucedemo.com` |
| `API_URL` | `https://reqres.in/api` |
| `REQRES_API_KEY` | Your Reqres.in API key |

Manual runs with environment selection are available via the **Actions** tab → **Run workflow**.

## Author
Vanya

SDET | QA Automation Engineer