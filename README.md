# Best Route App 🗺️

A modern web application built with Next.js to calculate the best travel routes between cities. The application features a robust frontend architecture with internationalization, interactive API documentation, UI component sandboxing, and seamless integration with external APIs.

## 🚀 Features

- **Route Calculation:** Submits origin, destination, and travel dates to an external Spring Boot backend (Best Route API) to determine optimal routes.
- **City Autocomplete:** Integrates with the external IBGE API to fetch and display Brazilian cities dynamically.
- **Reverse Geocoding:** Uses the OpenStreetMap external API to fetch city locations based on geographical coordinates.
- **Internationalization (i18n):** Multi-language support implemented seamlessly using next-intl.
- **API Documentation:** Auto-generated interactive Swagger/OpenAPI documentation for internal Next.js endpoints.
- **Component Sandbox:** UI components are documented and tested in isolation using Storybook.
- **Standardized Code Documentation:** Strict adherence to TSDoc standards for all internal functions and components.

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4, clsx, tailwind-merge
- **Icons & UI:** Lucide React, React Day Picker
- **Documentation:** Swagger UI (next-swagger-doc), Storybook 10, TSDoc
- **Testing:** Jest, React Testing Library

## ⚙️ Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (v20 or higher recommended)
- Docker & Docker Compose (for containerized environments)

## 📦 Getting Started

### 1. Clone the repository

    git clone [https://github.com/paulovf/best_route_app.git](https://github.com/paulovf/best_route_app.git)
    cd best_route_app

### 2. Environment Variables

Create a .env.local file in the root directory and configure the required environment variables:

    NEXT_PUBLIC_API_IBGE_URL="[https://servicodados.ibge.gov.br/api/v1/localidades/municipios](https://servicodados.ibge.gov.br/api/v1/localidades/municipios)"
    NEXT_PUBLIC_OPEN_STREET_MAP_URL="[https://nominatim.openstreetmap.org/reverse](https://nominatim.openstreetmap.org/reverse)"

    # Internal Proxy to External API
    API_URL="http://your-spring-boot-backend-url"
    X_API_KEY="your_api_key_here"

### 3. Running Locally (Without Docker)

Install the dependencies and start the development server:

    npm install
    npm run dev

Open http://localhost:3000 with your browser to see the result.

### 4. Running with Docker

To run the application inside a Docker container:

    docker-compose up --build web

## 📚 Documentation

### Internal API (Swagger)

This project uses Next.js Route Handlers to proxy requests to external services securely. You can view and test the internal API documentation by navigating to:

- **URL:** http://localhost:3000/api-doc

### UI Components (Storybook)

Storybook is configured to build and test UI components in isolation.

    npm run storybook

This will open the Storybook dashboard, typically at http://localhost:6006.

## 📜 Available Scripts

| Command                 | Description                                                       |
| ----------------------- | ----------------------------------------------------------------- |
| npm run dev             | Starts the Next.js development server.                            |
| npm run build           | Builds the application for production.                            |
| npm run start           | Starts the production server.                                     |
| npm run lint            | Runs ESLint to check for code formatting and TSDoc syntax errors. |
| npm run format          | Formats the codebase using Prettier.                              |
| npm run test            | Runs unit tests using Jest.                                       |
| npm run test:watch      | Runs Jest tests in interactive watch mode.                        |
| npm run storybook       | Starts the Storybook development server on port 6006.             |
| npm run build-storybook | Builds Storybook as a static web application.                     |

## 🤝 Contributing

1. Fork the project.
2. Create your feature branch (git checkout -b feature/amazing-feature).
3. Commit your changes (git commit -m 'Add some amazing feature').
4. Ensure code passes linting and tests (npm run lint, npm run test).
5. Push to the branch (git push origin feature/amazing-feature).
6. Open a Pull Request.
