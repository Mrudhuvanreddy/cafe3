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
| **Week 12** | **Angular components, data binding, and directives** | `week12-components.html`, `week12-components.ts` |
| **Week 13** | **Angular forms and validation** | `week13-forms.html`, `week13-forms.ts` |
| **Week 14** | **Angular routing, services, and Single-Page Application (SPA)** | `week14-routing-services.html`, `week14-routing-services.ts`, `cafe.service.ts`, `app.routes.ts` |

---

## ⚡ Week 12: Angular Components, Data Binding & Directives
- **Files:** `week12-components.html` (Demo), `week12-components.ts` (TypeScript Source)
- **Topics:**
  - Component Architecture (`@Component` standalone)
  - Interpolation (`{{ }}`)
  - Property Binding (`[disabled]`)
  - Event Binding (`(click)`)
  - Two-Way Data Binding (`[(ngModel)]`)
  - Structural Directives (`*ngIf`, `*ngFor`, `*ngSwitch`)
  - Attribute Directives (`[ngClass]`, `[ngStyle]`)

---

## 📝 Week 13: Angular Forms & Validation
- **Files:** `week13-forms.html` (Demo), `week13-forms.ts` (TypeScript Source)
- **Topics:**
  - Template-Driven Forms (`#orderForm="ngForm"`)
  - Two-Way Data Binding with `[(ngModel)]`
  - Validation Constraints: `required`, `minlength="3"`, `email`, and `pattern="^[0-9]{10}$"`
  - Live Control States: `$valid`, `$invalid`, `$touched`, `$dirty`, `$pristine`
  - Conditional Error Alerts
  - Form Submission and Reset

---

## 🚀 Week 14: Angular Routing & Services (SPA)
- **Files:** `week14-routing-services.html` (Demo), `week14-routing-services.ts` (TypeScript Source), `cafe.service.ts` (Singleton Service), `app.routes.ts` (Routes)
- **Topics:**
  - Single-Page Application (SPA) client-side routing
  - `<router-outlet>` view transitions without full page reload
  - Routes mapping: `/home`, `/catalogue`, `/orders`, `/about`
  - Singleton Service (`@Injectable({ providedIn: 'root' }) CafeService`)
  - Dependency Injection (DI) into components via constructor

---

## 🛠️ How to Run the Project

### Option 1: Direct Browser Launch (Zero Installation)
Double-click any `.html` file (e.g. `index.html`, `week12-components.html`, `week13-forms.html`, or `week14-routing-services.html`) to run immediately.

### Option 2: Local HTTP Python Server
```powershell
python server.py
```
Then open:
- Home: `http://localhost:8000/index.html`
- Week 12: `http://localhost:8000/week12-components.html`
- Week 13: `http://localhost:8000/week13-forms.html`
- Week 14: `http://localhost:8000/week14-routing-services.html`

---

## 📦 File Inventory in Git Repository

```
2222/
├── index.html                      # Week 1 Home & Week 8 Fetch Demo
├── login.html                      # Week 1 Login Page
├── registration.html               # Week 2 Registration & Week 4 JS Validation
├── style.css                       # Week 3 External Stylesheet
├── catalogue.html                  # Week 5 Catalogue Page
├── cafe.xml                        # Week 6 XML Data Document
├── cafe.dtd                        # Week 6 Document Type Definition
├── message.txt                     # Week 8 Asynchronous Text Source
├── json.html                       # Week 9 JSON/XML Async Parsing
├── data.json                       # Week 9 JSON Data Source
├── post.html                       # Week 10 POST Request Form
├── server.py                       # Week 10 Python HTTP Server & POST Endpoint
├── cafe.ts                         # Week 11 TypeScript OOP Classes & Functions
├── cafe.js                         # Week 11 Transpiled JavaScript
├── typescript-demo.html            # Week 11 TypeScript Demo Page
├── week12-components.html          # Week 12 Angular Components & Directives (Demo)
├── week12-components.ts            # Week 12 Angular Component Source
├── week13-forms.html               # Week 13 Angular Forms & Validation (Demo)
├── week13-forms.ts                 # Week 13 Angular Form Component Source
├── week14-routing-services.html    # Week 14 Angular Routing & Services SPA (Demo)
├── week14-routing-services.ts      # Week 14 Angular SPA Component Source
├── cafe.service.ts                 # Week 14 Angular Singleton Service
├── app.routes.ts                   # Week 14 Angular Routing Configuration
├── package.json                    # Project Metadata & Dependencies
├── tsconfig.json                   # TypeScript Compiler Configuration
├── angular.json                    # Angular CLI Configuration
└── README.md                       # Complete Laboratory Manual
```
