import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

import { ContentProvider } from './hooks/useContent';
import { ToastProvider } from './hooks/useToast';

import { AuthProvider } from './hooks/useAuth';

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ToastProvider>
      <AuthProvider>
        <ContentProvider>
          <HashRouter>
            <App />
          </HashRouter>
        </ContentProvider>
      </AuthProvider>
    </ToastProvider>
  </React.StrictMode>
);