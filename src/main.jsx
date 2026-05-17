import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import PortfolioApp from './PortfolioApp.jsx';
import EanpClaudePage from './EanpClaudePage.jsx';

const path = window.location.pathname.replace(/\/$/, '');
const isEanpClaudePage = ['/eanp-claude-ai', '/eanp-claude-ai.html', '/claude-528.html'].includes(path);
const App = isEanpClaudePage ? EanpClaudePage : PortfolioApp;

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
