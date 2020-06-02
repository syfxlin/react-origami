import React, { useEffect } from 'react';
import StoreProvider from './store/StoreProvider';
import App from './pages/App';
import { BrowserRouter } from 'react-router-dom';

export default function Root() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StoreProvider>
  );
}
