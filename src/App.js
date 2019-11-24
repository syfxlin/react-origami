import React from 'react';
import logo from './logo.svg';
import './App.css';
import { StoreContext } from './StoreProvider';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <button onClick={() => this.context.actions.addCount(1)}>
            Count: {this.context.state.count}
          </button>
        </header>
      </div>
    );
  }
}

App.contextType = StoreContext;

export default App;
