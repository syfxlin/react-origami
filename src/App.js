import React, { useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import { StoreContext } from './StoreProvider';
import { Route, Link } from 'react-router-dom';

export default function App() {
  const { state, actions } = useContext(StoreContext);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Route
          path="/a"
          component={() => (
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
          )}
        />
        <Route
          path="/b"
          component={() => (
            <button onClick={() => actions.addCount(1)}>
              Count: {state.count}
            </button>
          )}
        />
        <Link to="/a">To a</Link>
        <Link to="/b">To b</Link>
      </header>
    </div>
  );
}
