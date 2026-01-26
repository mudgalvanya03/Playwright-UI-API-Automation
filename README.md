# Playwright UI & API Automation Framework

## UI Automation
A scalable end-to-end automation framework built using **Playwright + TypeScript** for the **Sauce Demo e-commerce application** (https://www.saucedemo.com), covering UI workflows, cart management, and checkout validation using real-world testing strategies.

This project demonstrates **production-style test design**, including Page Object Model (POM), data-driven testing, and clean E2E coverage.

## API Automation

This project also includes automated **API testing** using Playwright’s built-in API request capabilities.

API tests are written using the `request` fixture and cover the full set of CRUD operations against a stable public test API (JSONPlaceholder).

---

## Tech Stack

- **Playwright**
- **TypeScript**
- **Node.js**
- **Page Object Model (POM)**
- **Data-driven testing**
- **GitHub CI-ready structure**

---
## Application Under Test

This automation framework tests the **Sauce Demo** sample e-commerce application provided by Sauce Labs for UI.

- **URL:** https://www.saucedemo.com
- **Domain:** E-commerce (Shopping Cart & Checkout)
- **Purpose:** Demonstrates real-world UI automation scenarios such as authentication, cart operations, and end-to-end checkout workflows.

This automation framework tests the **JSON Placeholder** mock api application for API testing
- **URL:** https://jsonplaceholder.typicode.com/
- **Domain:** MOCK API application
- **Purpose:** Demonstrates mock api automation scenarios such as GET, POST, PUT, PATCH, DELETE and negative scenarios

---

## 📁 Project Structure

├── pages/
│   ├── AuthenticationPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
│
├── tests/
│   ├── ui/
│   │   ├── authentication.spec.ts
│   │   ├── cart.spec.ts
│   │   ├── inventory.spec.ts
│   │   └── e2e-checkout.spec.ts
│   │
│   ├── api/
│   │   └── JsonPlaceholder.spec.ts
│
├── playwright.config.ts
├── package.json
└── README.md

---

## Test Coverage

### Authentication
- Standard user login (happy path)
- Invalid user login (negative scenarios)
- Locked-out user validation
- Empty username/password validation
- Logout flow validation

---

### Cart
- Add product to cart
- Remove product from cart
- Cart badge state validation
- Continue shopping navigation

---

### Inventory
- Inventory page load validation
- Product presence and count verification

---

### Checkout (E2E)
- Successful end-to-end checkout flow
- Mandatory field validation (First Name, Last Name, Postal Code)
- Data-driven negative validation in a single test case

---
### API Endpoints Covered

- **GET /posts** — Retrieve a list of posts  
- **GET /posts/:id** — Validate response for valid and invalid IDs  
- **POST /posts** — Create a new post (happy and negative cases)  
- **PUT /posts/:id** — Full update of a post  
- **PATCH /posts/:id** — Partial update of a post  
- **DELETE /posts/:id** — Delete a post  

---

## Design Principles Followed

- **One responsibility per test**
- **Minimal E2E, maximum signal**
- **Semantic locators where possible**
- **Structural locators where necessary**
- **All crud operations**
- **Data-driven approach for form validations**
- **Readable, maintainable test flows**

---

## How to Run Tests

### Install dependencies
>npm install
>npx playwright test --ui
>npx playwright show-report

## Future Enhancements
- GitHub Actions CI integration
- Cross-browser execution
- Test data management via fixtures
- Advanced reporting

## Author
Vanya
SDET | QA Automation Engineer

