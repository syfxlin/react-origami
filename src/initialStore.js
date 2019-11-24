export const initialState = {
  count: 1
};

export const initialActions = {
  addCount({ state, setState }, num1) {
    setState({ ...state, count: state.count + num1 });
  }
};
