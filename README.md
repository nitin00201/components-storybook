

## 🚀 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/nitin00201/components-storybook.git
cd components-storybook
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Storybook

```bash
npm run storybook
```

This will start Storybook at [http://localhost:6006](http://localhost:6006).

### 4. Build Storybook (for deployment)

```bash
npm run build-storybook
```

---

## 🛠 Tech Stack

* **React (with TypeScript)** → Component logic & typing
* **Vite** → Fast dev environment & bundling
* **TailwindCSS** → Styling with dark mode support
* **Storybook** → Interactive component explorer & documentation

---

##  Components

* **InputField**

  * Label, placeholder, helper & error messages
  * Variants: `filled`, `outlined`, `ghost`
  * Sizes: `sm`, `md`, `lg`
  * States: `disabled`, `invalid`, `loading`
  * Optional: clear button, password toggle
  * Supports light & dark themes

* **DataTable**

  * Column-based tabular data
  * Sorting
  * Row selection (`single` or `multiple`)
  * Loading + empty states
  * Accessible (ARIA attributes)

---

## 🧠 Description of Approach

The goal was to create **reusable, accessible, and theme-aware UI components**:

* **TypeScript-first**: Strict typings for props ensure better DX and prevent runtime errors.
* **Composable design**: Each component is self-contained but configurable with `props`.
* **Accessibility**: ARIA attributes and keyboard interactions where needed.
* **Documentation**: Leveraged Storybook’s `autodocs` and MDX for component docs.
* **Scalability**: Code is structured so new components can be added easily.

---

## 📦 Deployment

This project can be deployed in two ways:

* **Vercel** → deploy the built Storybook (`npm run build-storybook`)

---

