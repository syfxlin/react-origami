import React from 'react';
import { initialActions, initialState } from './initialStore';

export const StoreContext = React.createContext({
  state: initialState,
  actions: initialActions
});

export default class StoreProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    if (process.env.NODE_ENV === 'development') {
      this.defSetState = this.setState;
      this.setState = this.debugSetState;
    }
    this.actions = initialActions;
    for (const key in this.actions) {
      this.actions[key] = this.actions[key].bind(this);
    }
  }

  debugSetState(newState) {
    try {
      throw new Error('[!] - 检查到未被移除的Log调用:');
    } catch (e) {
      console.log({
        oldState: this.state,
        newState: newState,
        dispatchAction: e.stack
      });
    }
    if (window.__REACT_DISPATCH_SHOW_TRACE__) {
      console.trace();
    }
    this.defSetState(newState);
  }

  render() {
    return (
      <StoreContext.Provider
        value={{
          state: this.state,
          actions: this.actions
        }}
      >
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}
