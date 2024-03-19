import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import { PlannerProvider } from './context/PlannerContext.js';
import { RecipesProvider } from './context/RecipesContext.js';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.js';
import { AuthProvider } from './context/AuthContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <RecipesProvider>
          <PlannerProvider>
          <ThemeProvider>
              <App />
          </ThemeProvider>
          </PlannerProvider>
        </RecipesProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);


