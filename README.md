# Playwright UI & API Automation Framework

A scalable end-to-end automation framework built using **Playwright + TypeScript** for the **Sauce Demo e-commerce application** (https://www.saucedemo.com), covering UI workflows, cart management, and checkout validation using real-world testing strategies.

This project demonstrates **production-style test design**, including Page Object Model (POM), data-driven testing, and clean E2E coverage.

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

This automation framework tests the **Sauce Demo** sample e-commerce application provided by Sauce Labs.

- **URL:** https://www.saucedemo.com
- **Domain:** E-commerce (Shopping Cart & Checkout)
- **Purpose:** Demonstrates real-world UI automation scenarios such as authentication, cart operations, and end-to-end checkout workflows.

## Project Structure
├── pages/
│ ├── AuthenticationPage.ts
│ ├── InventoryPage.ts
│ ├── CartPage.ts
│ └── CheckoutPage.ts
│
├── tests/
│ ├── UI/
│ │ ├── authentication.spec.ts
│ │ ├── cart.spec.ts
│ │ ├── inventory.spec.ts
│ │ └── e2e-checkout.spec.ts
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

## Design Principles Followed

- **One responsibility per test**
- **Minimal E2E, maximum signal**
- **Semantic locators where possible**
- **Structural locators where necessary**
- **Data-driven approach for form validations**
- **Readable, maintainable test flows**

---

## How to Run Tests

### Install dependencies
>npm install
>npx playwright test --ui
>npx playwright show-report

## Future Enhancements
- API automation using ReqRes
- GitHub Actions CI integration
- Cross-browser execution
- Test data management via fixtures
- Advanced reporting

## Author
Vanya
SDET | QA Automation Engineer

