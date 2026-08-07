# Best Route App 🗺️

Best Route App is a modern web application built with Next.js to calculate the best travel routes between cities. The application features a robust frontend architecture with internationalization, interactive API documentation, UI component sandboxing, real-time observability, and seamless integration with external APIs.

---

## 🌐 Links

- **APP URL:** https://best-route-app.vercel.app
- **API URL:** https://best-route-api.onrender.com

---

## 🛠️ Tech Stack & Tools

The project leverages modern, production-grade tools from the JavaScript/TypeScript ecosystem:

- **Framework:** Next.js 16 (App Router)
- **Library:** React 19
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4, `clsx`, `tailwind-merge`
- **Icons & UI:** Lucide React, React Day Picker
- **Observability:** Grafana Faro Web SDK, Grafana Cloud Dashboards, Microsoft Clarity
- **Documentation:** Swagger UI (`next-swagger-doc`), Storybook 10, TSDoc
- **Testing:** Jest (for unit tests), Vitest (for Storybook tests), React Testing Library
- **Design & Planning:** Figma (User Flows/Mind Maps), Notion (Agile Task Board)

---

## 🎨 Core Features

1. **Route Calculation:** Submits origin, destination, and travel dates to an external Spring Boot backend (Best Route API) to determine optimal routes.
2. **City Autocomplete:** Integrates with the external IBGE API to fetch and display Brazilian cities dynamically.
3. **Reverse Geocoding:** Uses the OpenStreetMap external API to fetch city locations based on geographical coordinates.
4. **Internationalization (i18n):** Multi-language support implemented seamlessly using `next-intl`.
5. **Real-time Frontend Observability:** Tracks web vitals, errors, user sessions, and performance metrics via Grafana Faro & Microsoft Clarity.
6. **Standardized Code & UI:** UI components are documented and tested in isolation using Storybook, and code is heavily documented using TSDoc standards.

---

## 📐 UX/UI Design & User Flows

System architecture, screen navigation flows, and interactive mind maps for the frontend application are maintained on Figma:

- 🎨 **Figma Diagrams & Mind Maps:** [Best Route - Screen Flows & Diagrams](https://www.figma.com/board/rlConotRDMKydwTAJ5OMHX/Fluxo-telas?node-id=0-1&p=f)

---

## 📋 Task Management & Planning

Project management, sprint planning, epics, and task cards are organized and tracked via Notion following agile methodologies:

- 📌 **Notion Task Board:** [Best Route - Frontend Kanban & Tasks](https://silk-stay-df9.notion.site/23b28b90a2db48e5a51203e717d325c5?v=1f3d96807cb949a6b18edc6a0445e628)

---

## 📊 Observability & Performance Monitoring

Real-time telemetry, Web Vitals (LCP, FID, CLS), error tracking, and device/browser usage analytics are captured using **Grafana Faro** and visualized in a public Grafana dashboard:

- 📈 **Grafana Public Dashboard:** [Best Route Observability & Telemetry Panel](https://bestroute.grafana.net/public-dashboards/1ae81052288d42aeb3485850b6f1aa9b)

---

## ⚙️ Required Environment Variables

To run the project locally or in production, ensure the following environment variables are set in your `.env.local` file:

| Variable                          | Description                                       | Example                                                          |
| :-------------------------------- | :------------------------------------------------ | :--------------------------------------------------------------- |
| `NEXT_PUBLIC_API_IBGE_URL`        | External API for fetching Brazilian cities        | `https://servicodados.ibge.gov.br/api/v1/localidades/municipios` |
| `NEXT_PUBLIC_OPEN_STREET_MAP_URL` | External API for reverse geocoding                | `https://nominatim.openstreetmap.org/reverse`                    |
| `NEXT_PUBLIC_FARO_URL`            | Grafana Faro Collector URL for observability      | `https://faro-collector-prod-sa-east-1.grafana.net/collect/...`  |
| `API_URL`                         | Internal proxy routing to the Spring Boot backend | `http://localhost:8080`                                          |
| `X_API_KEY`                       | Secret master key token matching the backend      | `master-key-token-xyz`                                           |

---

## 🚀 How to Run Locally

### Prerequisites

- **Node.js v20+** installed.
- **NPM 10+** (or Yarn/PNPM).
- **Docker Desktop** installed and running (required for containerized execution).
- The BestRoute API (Backend) running locally or remotely.

### 1. Clone the Repository

```bash
git clone https://github.com/paulovf/best_route_app.git
cd best_route_app
```

### 2. Choose Your Execution Method

#### 💻 Option A: Command Line (NPM)

1. Create a `.env.local` file in the root directory and add your variables:

   ```env
   NEXT_PUBLIC_API_IBGE_URL=https://servicodados.ibge.gov.br/api/v1/localidades/municipios
   NEXT_PUBLIC_OPEN_STREET_MAP_URL=https://nominatim.openstreetmap.org/reverse
   NEXT_PUBLIC_FARO_URL=https://faro-collector-prod-sa-east-1.grafana.net/collect/<your-collection>
   API_URL=http://localhost:8080
   X_API_KEY=your_local_secret_key
   ```

2. Install dependencies and run the application:

   ```bash
   npm install
   npm run dev
   ```

3. Open http://localhost:3000 in your browser.

---

#### 🐳 Option B: Docker Container

1. Build the Docker image from the root directory:

   ```bash
   docker-compose build web
   ```

2. Run the container:
   ```bash
   docker-compose up web
   ```

> 💡 **Networking Note for Docker:** If your Spring Boot backend is running natively on your host machine (not in Docker), you must change `localhost` to `host.docker.internal` in the `API_URL` variable so the Next.js container can reach it.

---

## 🧪 Running Tests & Sandboxes

To ensure UI stability and component isolation, you can run the test suite and Storybook server using the terminal.

### 💻 Option A: Command Line (Jest & Vitest)

Execute the following commands to run all automated tests:

- **Run Unit Tests (Jest):**

  ```bash
  npm run test
  ```

- **Run Tests in Watch Mode:**

  ```bash
  npm run test:watch
  ```

- **Format and validate code:**
  ```bash
  npm run format
  npm run lint
  ```

### 🎨 Option B: Storybook (Component Sandbox)

Launch the interactive UI component explorer:

```bash
npm run storybook
```

This will open the Storybook dashboard, typically at http://localhost:6006.

---

## 📖 API Documentation (Endpoints)

### Internal API (Swagger)

This project uses Next.js Route Handlers to proxy requests to external services securely. Once the application is running, access the live interactive documentation at:
👉 **http://localhost:3000/api-doc**

---

## 📜 Available Scripts

| Command                   | Description                                                       |
| :------------------------ | :---------------------------------------------------------------- |
| `npm run dev`             | Starts the Next.js development server.                            |
| `npm run build`           | Builds the application for production.                            |
| `npm run start`           | Starts the production server.                                     |
| `npm run lint`            | Runs ESLint to check for code formatting and TSDoc syntax errors. |
| `npm run format`          | Formats the codebase using Prettier.                              |
| `npm run test`            | Runs unit tests using Jest.                                       |
| `npm run test:watch`      | Runs Jest tests in interactive watch mode.                        |
| `npm run storybook`       | Starts the Storybook development server on port 6006.             |
| `npm run build-storybook` | Builds Storybook as a static web application.                     |

---

## 🤝 Contributing

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Ensure code passes linting and tests (`npm run lint`, `npm run test`).
5. Push to the branch (`git push origin feature/amazing-feature`).
6. Open a Pull Request.
