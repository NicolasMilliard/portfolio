import { RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { createAppRouter } from './router';
import { trackInputModality } from './interactionMotion';
import './styles/index.css';

const stopTrackingInput = trackInputModality();
if (import.meta.hot) import.meta.hot.dispose(stopTrackingInput);

const router = createAppRouter();
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
