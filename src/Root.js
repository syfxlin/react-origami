import React from 'react';
import StoreProvider from './StoreProvider';
import App from './App';

export default class Root extends React.Component {
  render() {
    return (
      <StoreProvider>
        <App />
      </StoreProvider>
    );
  }
}
