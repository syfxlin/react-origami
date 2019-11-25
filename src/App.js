import React, { useContext } from 'react';
import logo from './logo.svg';
import './App.less';
import { StoreContext } from './store/StoreProvider';
import { Link } from 'react-router-dom';
import RouteView from './RouteView';

export default function App() {
  const { state, actions } = useContext(StoreContext);
  const route1 = () => (
    <p>
      Edit <code>src/App.js</code> and save to reload.
    </p>
  );

  const route2 = () => (
    <button onClick={() => actions.addCount(1)}>Count: {state.count}</button>
  );
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <RouteView
          route={[
            {
              path: '/a',
              component: route1,
              alias: '/c'
            },
            {
              path: '/b',
              component: route2
            }
          ]}
        />
        <Link to="/a">To a</Link>
        <Link to="/b">To b</Link>
        <Link to="/c">To c</Link>
      </header>
    </div>
  );
}
