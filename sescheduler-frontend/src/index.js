import React from 'react';
import { createRoot } from 'react-dom/client'; // Use createRoot from React 18
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container); // Create a root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
