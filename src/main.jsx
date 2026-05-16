import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import PortfolioApp from './PortfolioApp.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PortfolioApp />
  </React.StrictMode>,
);
