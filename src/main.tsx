import { StrictMode } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'normalize.css';
import './index.css';
import App from './App.tsx';
import { AppProviders } from './app/providers/AppProviders.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppProviders>
        <App />
        <Analytics />
      </AppProviders>
    </BrowserRouter>
  </StrictMode>,
);
