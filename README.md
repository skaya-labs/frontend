# Skaya Frontend

[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-%5E19.0.0-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-%7E5.7.2-blueviolet.svg)](https://www.typescriptlang.org/)
[![React Router DOM](https://img.shields.io/badge/React_Router_DOM-%5E7.5.0-red.svg)](https://reactrouter.com/)
[![Vite](https://img.shields.io/badge/Vite-%5E6.2.0-3776AB.svg)](https://vitejs.dev/)

This is the frontend for the Skaya application, built using React with TypeScript (TSX). It features a dynamic routing system and layout handling powered by a custom `Router` component located in `src/router/Router.tsx`.

## Features

- **React with TypeScript:** Built with type safety and modern React features.
- **Dynamic Routing:** Automatically discovers and registers routes based on files in the `/src/pages` directory.
- **Layout Handling:** Supports wrapping pages with layout components defined in `/src/layouts`. Layouts are applied based on the folder structure (e.g., a page in `/src/pages/[LayoutName]/Page.tsx` will use the layout in `/src/layouts/[LayoutName]/[LayoutName].tsx`).
- **Convention-based Configuration:** Routing behavior and file inclusion rules are configurable within `src/router/Router.tsx`.
- **Lazy Loading:** Pages and layouts are loaded on demand using `React.lazy` and `React.Suspense`, improving initial load time.
- **Customizable File Rules:** Define which files are considered for routing using include and exclude patterns.
- **Base Path Configuration:** Easily adjust the directories for pages and layouts.
- **Layout Wrapping Control:** Enable or disable automatic layout wrapping.
- **Case-Insensitive Paths:** Option to treat route paths as case-insensitive.
- **Default Not Found Page:** Specify a component to render for unmatched routes.
- **Debug Mode:** Provides console logs for route generation and layout application when enabled.
- **Vite Powered:** Utilizes Vite for fast development and build processes.

## Getting Started

Follow these steps to get the Skaya frontend up and running on your local machine.

### Prerequisites

- **Node.js:** Make sure you have Node.js (version >= 18.0.0) installed. You can download it from [nodejs.org](https://nodejs.org/).
- **npm** or **yarn** or **pnpm:** This project uses npm, but you can use yarn or pnpm as well.

### Installation

```bash
git clone [YOUR_REPOSITORY_URL]
cd skaya-frontend
```

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

This will start the Vite development server. You can usually access the application at `http://localhost:5173` (or a different port if specified in the console).

### Building for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

This command will create an optimized production build of your application in the `dist` directory.

### Previewing the Production Build

```bash
npm run preview
# or
yarn preview
# or
pnpm preview
```

This will start a local server to preview the production build.

## Project Structure
```
skaya-frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── layouts/         # Layout components
│   │   └── [LayoutName]/
│   │       └── [LayoutName].tsx
│   ├── pages/           # Page components
│   │   ├── HomePage/
│   │   │   └── Homepage.tsx
│   │   └── [LayoutName]/
│   │       └── ProtectedPage/
│   │           └── ProtectedPage.tsx
│   ├── routes.tsx # Custom router configuration and component
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Routing and Layout Convention

The `src/routes.tsx` component automatically generates routes based on the files present in the `/src/pages` directory.

- **Basic Routing:** Any `.tsx` or `.jsx` file within `/src/pages` will be treated as a route. For example, `/src/pages/AboutUs.tsx` will be accessible at the `/aboutus` path. An `index.tsx` file within a directory will be the default route for that path (e.g., `/src/pages/products/index.tsx` will be accessible at `/products`).
- **Dynamic Routes:** Files or directories enclosed in square brackets `[]` will be treated as dynamic route segments. For example, `/src/pages/users/[id].tsx` will create a route like `/users/:id`.
- **Layout Wrapping:** If a page component is located within a subdirectory in `/src/pages` that is also enclosed in square brackets (e.g., `/src/pages/[AdminLayout]/Dashboard.tsx`), the `Router` will look for a corresponding layout component in `/src/layouts/[AdminLayout]/AdminLayout.tsx` and wrap the page with it.
- **Custom Layout:** To apply a specific layout to a page, place the page file inside a folder named with the layout's name in brackets. The layout component should reside in the `/src/layouts` directory with the same name (e.g., `[MyLayout]/MyLayout.tsx`).

## Configuration

The `ROUTER_CONFIG` object in `src/router/Router.tsx` allows you to customize the routing behavior:

```typescript
const ROUTER_CONFIG = {
  fileRules: {
    include: ['**/*.tsx', '**/*.jsx'], // Files to include for routing
    exclude: ['**/*.test.*', '**/*.spec.*', '**/*.stories.*'] // Files to exclude
  },
  basePaths: {
    pages: '/src/pages',      // Location of page components
    layouts: '/src/layouts'   // Location of layout components
  },
  routing: {
    useLayoutWrapper: true,   // Enable/disable automatic layout wrapping
    caseSensitivePaths: false, // Treat routes as case-insensitive
    defaultNotFound: '/src/pages/HomePage/Homepage.tsx' // Path to the default 404 page
  },
  debug: true // Enable debug logging for route generation
};
```

## React Backend Request Utility
This project includes a pre-configured Request utility for making API calls to your backend. It handles authentication, error messages, and dynamic endpoint loading
 ### 📝 Usage
 1. Define Your API Endpoints

  Create apiEndpoint.tsx in @/APIs/ with the following structure: 
```ts
    // @/APIs/apiEndpoint.tsx
import { ApiEndpointType } from '@/Datatypes/enums';

export const ApiEndpoint: ApiEndpointType = {
  GET_USERS: {
    url: '/api/users/',
    method: 'GET',
    withAuth: true,
    errorMessage: 'Failed to fetch users',
  },
  LOGIN: {
    url: '/api/auth/login/',
    method: 'POST',
    errorMessage: 'Login failed',
    successMessage: 'Logged in successfully!',
  },
  // Add more endpoints...
};
```
  2. Make API Calls

Import and use Request in your components:
```ts
import Request from '@/services/Request';

// Example: Fetching users
const fetchUsers = async () => {
  try {
    const users = await Request({
      endpointId: 'GET_USERS', // Must match the key in ApiEndpoint
    });
    console.log('Users:', users);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};
```

# Contributing

Contributions are welcome! Please follow these steps:

    - Fork the repository.
    - Create a new branch for your feature or bug fix.
    - Make your changes and commit them.
    - Push your changes to your fork.
    - Submit a pull request.
