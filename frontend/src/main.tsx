import React from 'react'
import ReactDOM from 'react-dom/client'

import './global.css'
import {BrowserRouter as Router } from "react-router-dom";
import AppRoutes from './AppRoutes';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from './components/ui/sonner';

const query_client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={query_client}>
        <AppRoutes />
        <Toaster visibleToasts={1} position="top-right" richColors />
      </QueryClientProvider>
    </Router>
  </React.StrictMode>,
)
