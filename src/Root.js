import React from 'react';
import StoreProvider from './StoreProvider';
import App from './App';
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
