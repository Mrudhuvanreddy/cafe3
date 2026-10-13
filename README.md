# Essentials of Web Programming Lab — THE WAVE ☕ Cafe

A comprehensive laboratory project covering all 14 weeks of the **Essentials of Web Programming Lab** syllabus for **THE WAVE ☕ Cafe**.

> **Note on Structure:** All laboratory experiments are maintained in a flat, unified structure directly inside this directory without any subdirectories. Every week's experiment can be launched and tested directly in any browser.

---

## 📋 Course Outcomes & Syllabus Mapping

| Week | Experiment Description | Primary Files |
| :--- | :--- | :--- |
| **Week 1** | Static web pages for online cafe: Home Page & Login Page | `index.html`, `login.html` |
| **Week 2** | Customer / Student Registration Page using HTML forms | `registration.html` |
| **Week 3** | Internal, external, and inline CSS styling | `style.css`, `index.html` |
| **Week 4** | JavaScript client-side validations for registration fields | `registration.html`, `cafe.js` |
| **Week 5** | Responsive Catalogue page with filtering & dynamic cart | `catalogue.html` |
| **Week 6** | XML data document with Document Type Definition (DTD) validation | `cafe.xml`, `cafe.dtd` |
| **Week 7** | Review and Skill Test 1 | N/A |
| **Week 8** | Ajax / Fetch API program to load text data asynchronously | `index.html`, `message.txt` |
| **Week 9** | Ajax / Fetch API program to parse JSON and XML responses | `json.html`, `data.json`, `cafe.xml` |
| **Week 10** | Ajax / Fetch API program to send data using HTTP POST method | `post.html`, `server.py` |
| **Week 11** | TypeScript programs using classes, interfaces, and functions | `cafe.ts`, `cafe.js`, `typescript-demo.html` |
| **Week 12** | **Angular components, data binding, and directives** | `week12.html`, `week12.component.ts` |
| **Week 13-14** | **Angular forms, routing, and services for Single-Page Application (SPA)** | `week13-14.html`, `cafe.service.ts`, `app.routes.ts`, `week13-14.component.ts` |

---

## ⚡ Week 12: Angular Components, Data Binding & Directives

### Topics Covered:
1. **Angular Component Architecture:**
   - Standalone component declared with `@Component` decorator
   - Encapsulation of logic, template, and styles
2. **Data Binding Mechanisms:**
   - **Interpolation (`{{ expression }}`):** Dynamically outputs cafe name, items, and calculated totals.
   - **Property Binding (`[disabled]="isOrderLocked"`):** Dynamically binds DOM element properties to TypeScript expressions.
   - **Event Binding (`(click)="greetCustomer()"`):** Captures user events and invokes component methods.
   - **Two-Way Data Binding (`[(ngModel)]="customerName"`):** Synchronizes user inputs and component model in real time.
3. **Angular Directives:**
   - **Structural Directives:**
     - `*ngIf`: Conditionally renders elements (e.g., toggle menu visibility, availability flags).
     - `*ngFor`: Loops through arrays with index and trackBy (e.g., menu items catalogue table).
     - `*ngSwitch` / `*ngSwitchCase`: Renders content based on customer membership tiers (Regular, Premium, VIP).
   - **Attribute Directives:**
     - `[ngClass]`: Dynamically applies CSS classes based on selection status.
     - `[ngStyle]`: Modulates font size and colors dynamically.

### How to Run:
- Open `week12.html` in any browser, or visit `http://localhost:8000/week12.html` when running `python server.py`.
- View the TypeScript source code directly in `week12.component.ts` or via the interactive tabs inside `week12.html`.

---

## 🚀 Weeks 13 & 14: Angular Forms, Routing & Services (Single-Page Application)

### Topics Covered:
1. **Angular Forms (Week 13):**
   - **Template-Driven Forms:** Built using `#cafeOrderForm="ngForm"`, `ngModel`, and name attributes.
   - **Validation Rules:** `required`, `minlength="3"`, `email`, and `pattern="^[0-9]{10}$"`.
   - **Validation States & Diagnostics:** Real-time visibility into control states (`valid`, `invalid`, `touched`, `pristine`, `dirty`).
   - **User Feedback:** Contextual validation error banners and disablement of submit button (`[disabled]="cafeOrderForm.$invalid"`).
2. **Angular Routing (Week 14):**
   - Client-side Single-Page Application (SPA) routing without full page reload.
   - Defined in `app.routes.ts` with routes for Home, Catalogue, Order Form, Orders Dashboard, and About.
   - Dynamic view rendering via `<router-outlet>`.
3. **Angular Services & Dependency Injection (Weeks 13-14):**
   - Implemented in `cafe.service.ts` using `@Injectable({ providedIn: 'root' })`.
   - Injected into components via constructor: `constructor(private cafeService: CafeService)`.
   - Manages state for cafe metadata, menu catalogue, order creation (`addOrder`), and registered members.

### How to Run:
- Open `week13-14.html` in any browser, or visit `http://localhost:8000/week13-14.html` when running `python server.py`.
- Source code available in `cafe.service.ts`, `app.routes.ts`, and `week13-14.component.ts`.

---

## 🛠️ How to Run the Entire Project

### Option 1: Direct Browser Launch (Zero Installation)
Double-click any `.html` file (e.g. `index.html`, `week12.html`, or `week13-14.html`) in File Explorer to open it directly in Chrome, Edge, or Firefox.

### Option 2: Local HTTP Python Server (Recommended for AJAX & Fetch)
Run the bundled Python server to support local Fetch API and POST requests:
```powershell
python server.py
```
Then navigate to:
```
http://localhost:8000
```
- Home: `http://localhost:8000/index.html`
- Week 11 (TypeScript): `http://localhost:8000/typescript-demo.html`
- Week 12 (Angular Components): `http://localhost:8000/week12.html`
- Week 13-14 (Angular SPA): `http://localhost:8000/week13-14.html`

---

## 📦 Directory Structure

```
2222/
│── index.html              # Week 1 Home & Week 8 Fetch Demo
│── login.html              # Week 1 Login Page
│── registration.html       # Week 2 Registration & Week 4 JS Validation
│── style.css               # Week 3 External Stylesheet
│── catalogue.html          # Week 5 Catalogue Page
│── cafe.xml                # Week 6 XML Data Document
│── cafe.dtd                # Week 6 Document Type Definition
│── message.txt             # Week 8 Asynchronous Text Source
│── json.html               # Week 9 JSON/XML Async Parsing
│── data.json               # Week 9 JSON Data Source
│── post.html               # Week 10 POST Request Form
│── server.py               # Week 10 Python HTTP Server & POST Endpoint
│── cafe.ts                 # Week 11 TypeScript OOP Classes & Functions
│── cafe.js                 # Week 11 Transpiled JavaScript
│── typescript-demo.html    # Week 11 TypeScript Demo Page
│── week12.html             # Week 12 Angular Components & Directives (Live Page)
│── week12.component.ts     # Week 12 Angular Standalone Component Source
│── week13-14.html          # Week 13-14 Angular Forms & Routing SPA (Live Page)
│── cafe.service.ts         # Week 13-14 Angular Service with Dependency Injection
│── app.routes.ts           # Week 14 Angular Routing Configuration
│── week13-14.component.ts  # Week 13-14 Angular Component Source
│── package.json            # Project Metadata & Dependencies
│── tsconfig.json           # TypeScript Compiler Configuration
│── angular.json            # Angular CLI Configuration
└── README.md               # Complete Laboratory Manual
```
