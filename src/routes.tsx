// src/router/Router.tsx
import React from "react";
import { useRoutes } from "react-router-dom";

// ========== CONFIGURATION ==========
const ROUTER_CONFIG = {
  // File inclusion rules
  fileRules: {
    include: ['**/*.tsx', '**/*.jsx'],
    exclude: ['**/*.test.*', '**/*.spec.*', '**/*.stories.*']
  },
  
  // Path settings
  basePaths: {
    pages: '/src/pages',      // Where your pages are located
    layouts: '/src/layouts'   // Where your layouts are located (same level as pages)
  },
  
  // Routing behavior
  routing: {
    useLayoutWrapper: true,
    caseSensitivePaths: false,
    defaultNotFound: '/src/pages/HomePage/index.tsx'
  },
  
  debug: true
};
// ========== END CONFIG ==========

// Vite-specific import.meta.glob
const pageModules = import.meta.glob('/src/pages/**/[\\w[-]*.{jsx,tsx}');
const layoutModules = import.meta.glob('/src/layouts/**/[\\w[-]*.{jsx,tsx}');

const createLazyElement = (importFn: () => Promise<{ default: React.ComponentType }>) => {
  const LazyComponent = React.lazy(importFn);
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </React.Suspense>
  );
};

const getLayoutWrapper = (layoutName: string) => {
  // Look for layout component in /src/layouts/[LayoutName]/LayoutName.tsx
  const layoutPath = `${ROUTER_CONFIG.basePaths.layouts}/${layoutName}/${layoutName}.tsx`;
  const layoutImport = layoutModules[layoutPath];
  
  if (!layoutImport) {
    console.warn(`Layout component not found at: ${layoutPath}`);
    return ({ children }: { children: React.ReactNode }) => <>{children}</>;
  }

  const LazyLayout = React.lazy(layoutImport as () => Promise<{ default: React.ComponentType<any>; }>);
  return ({ children }: { children: React.ReactNode }) => (
    <React.Suspense fallback={<div>Loading...</div>}>
      <LazyLayout>{children}</LazyLayout>
    </React.Suspense>
  );
};

const shouldExclude = (path: string) => {
  return ROUTER_CONFIG.fileRules.exclude.some(pattern => {
    const regexPattern = pattern
      .replace(/\./g, '\\.')
      .replace(/\*\*/g, '.*')
      .replace(/\*/g, '[^/]*');
    return new RegExp(regexPattern).test(path);
  });
};

const generateRoutes = (): any[] => {
  const routes: any[] = [];
  
  Object.keys(pageModules).forEach((pagePath) => {
    if (shouldExclude(pagePath)) {
      if (ROUTER_CONFIG.debug) console.log(`Excluding ${pagePath}`);
      return;
    }
    
    // Convert file path to route path
    let routePath = pagePath
      .replace(new RegExp(`^${ROUTER_CONFIG.basePaths.pages}`), '')
      .replace(/\.(jsx|tsx)$/, '')
      .replace(/\/index$/, '')
      .replace(/\[(.*?)\]/g, ':$1');
    
    // Handle root index
    if (routePath === '') routePath = '/';
    
    // Check if this page is inside a [LayoutName] folder
    const layoutMatch = pagePath.match(/\/pages\/(\[.*?\])\//);
    let element = createLazyElement(pageModules[pagePath] as () => Promise<{ default: React.ComponentType<any> }>);
    
    if (layoutMatch && ROUTER_CONFIG.routing.useLayoutWrapper) {
      const layoutFolderName = layoutMatch[1];
      const layoutName = layoutFolderName.replace(/[\[\]]/g, ''); // Remove brackets
      
      try {
        const LayoutWrapper = getLayoutWrapper(layoutName);
        element = <LayoutWrapper>{element}</LayoutWrapper>;
        
        if (ROUTER_CONFIG.debug) {
          console.log(`Wrapping route ${routePath} with layout ${layoutName}`);
        }
      } catch (e) {
        console.error(`Error creating layout ${layoutName}:`, e);
      }
    }
    
    routes.push({
      path: routePath,
      element
    });
    
    if (ROUTER_CONFIG.debug) {
      console.log(`Generated route: ${routePath} -> ${pagePath}`);
    }
  });
  
  return routes;
};

const Router: React.FC = () => {
  const routes = [
    {
      path: "/",
      children: [
        ...generateRoutes(),
        { 
          path: "*", 
          element: createLazyElement(() => import('./pages/HomePage/index.tsx'))
        }
      ]
    }
  ];

  if (ROUTER_CONFIG.debug) {
    console.log('Final generated routes:', routes);
  }

  return useRoutes(routes);
};

export default Router;