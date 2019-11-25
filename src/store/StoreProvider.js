import React, { useState } from 'react';
import { initialActions, initialState } from './initialStore';

export const StoreContext = React.createContext({
  state: initialState,
  actions: initialActions
});

export default function StoreProvider(props) {
  const [state, setState] = useState(initialState);
  let debugSetState = newState => {
    try {
      throw new Error('[!] - 检查到未被移除的Log调用:');
    } catch (e) {
      console.log({
        oldState: state,
        newState: newState,
        dispatchAction: e.stack
          .split('at ')[2]
          .replace('Object.', '')
          .replace('\n    ', '')
      });
    }
    if (window.__REACT_DISPATCH_SHOW_TRACE__) {
      console.trace();
    }
    setState(newState);
  };
  const actions = {};
  for (const key in initialActions) {
    actions[key] = initialActions[key].bind(
      {
        state,
        setState: window.__REACT_DEVTOOLS_GLOBAL_HOOK__
          ? debugSetState
          : setState,
        actions
      },
      {
        state,
        setState: window.__REACT_DEVTOOLS_GLOBAL_HOOK__
          ? debugSetState
          : setState,
        actions
      }
    );
  }
  return (
    <StoreContext.Provider
      value={{
        state: state,
        actions: actions
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
}
