import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ErrorFallback from './Components/ErrorFallback/ErrorFallback';
import { ErrorBoundary } from "react-error-boundary"; 
import AppTheme from './Components/AppTheme/AppTheme';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom'; 
import { AuthProvider } from './Components/AuthContext/AuthContext'
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
     <AuthProvider> 
        <ThemeProvider theme={AppTheme}>
          <BrowserRouter>
            <App/>
          </BrowserRouter>
        </ThemeProvider>
     </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>// I tried emoving strict 
  // mode and learned strict mode causes double invoking in development which is actually good for long term but 
  //but you ll see all useEffect firing twice occasionally.
);

reportWebVitals();
