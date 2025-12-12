# Demo Web Shop: QA Automation Assessment

This repository contains UI automation, API testing, manual test cases, and a performance test approach created as part of a QA Engineer technical assessment.

The project demonstrates test automation best practices using **Playwright**, **Cucumber (BDD)**, and the **Page Object Model (POM)**.

---

## 🛠 Tech Stack
- Playwright (TypeScript)
- Cucumber (BDD)
- Page Object Model (POM)
- Node.js
- Postman
- HTML Reporting (Cucumber)

---

##  Automated UI Test Scenario

**Application under test:**  
https://demowebshop.tricentis.com

**Scenario automated:**
- Navigate to Books category
- Add multiple products to the cart
- Verify cart items
- Calculate and validate subtotal from item totals
- Verify shipping, payment fee, tax, and final total
- Complete checkout as a guest user

Price calculations are validated dynamically using UI values (no hard-coded totals).

## 📁 Project Structure

```text
demowebshop-playwright-automation
├── features/                  # Feature files and step definitions
│   ├── place-order-multiple-products.feature
│   ├── steps/
│   └── support/
├── pages/                     # Page Object Model classes
├── data/                      # External test data (JSON)
├── manual-test-cases/         # Manual test cases (Excel)
├── postman/                   # Postman API collection
├── performance/               # Performance test approach document
├── test-results/              # HTML test reports
├── cucumber-report.js         # Report generation script
├── playwright.config.ts
├── package.json
└── README.md
```
⚙️ Setup Instructions
Prerequisites

1. Node.js (v18 or above)
2. npm

Install dependencies
```text
npm install
```
▶️ Test Execution
Run BDD automation tests
```text
npm run bdd:run
```
This command executes Playwright + Cucumber tests and generates an HTML report.

📊 Reporting

1. HTML Cucumber report is generated after execution
2. Feature and scenario level status
2. Execution duration and environment details

Report location
```text
test-results/cucumber-html-report/index.html
```

🔌 API Automation

Postman collection is available in the postman/ folder. The collection can be imported into Postman and executed using the Collection Runner.

Collection file:

Swagger_Petstore_Pet_APIs.postman_collection.json

APIs covered:

POST /v2/pet – Create a new pet

GET /v2/pet/{petId} – Fetch pet details by ID

🧪 Manual Testing

Manual test cases are available in the manual-test-cases/ folder.

File:

Demo_Web_Shop_Functional_Tests.xlsx

🚀 Performance Testing

Performance test approach document is available in the performance/ folder.

File:

DemoWebShop_Performance_Test_Approach.pdf

👤 Author

Neha Darira
QA Automation Engineer
