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

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ToastProvider>
      <ContentProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </ContentProvider>
    </ToastProvider>
  </React.StrictMode>
);