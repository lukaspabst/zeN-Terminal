import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ZenThemeProvider } from '@zen-ui/system';
import '@zen-ui/system/tokens.css';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ZenThemeProvider defaultTheme="blackwall-crimson">
      <App />
    </ZenThemeProvider>
  </StrictMode>
);
