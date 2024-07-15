import React from 'react';
import { createRoot } from 'react-dom/client'; // Importe de react-dom/client
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importação do Bootstrap CSS
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
