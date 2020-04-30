import * as React from "react";

type State = {
  count: number
  currentColor: string
}

const initialState: State = {
  count: 10,
  currentColor: "#bada55",
};

type Context = {
  state: State
  dispatch: React.Dispatch<Action>
}

type Action = {
  type: string,
  payload: string,
  user: number
}
const ContextOne = React.createContext<Context>({
  state: initialState,
  dispatch: () => {},
});

// You need to define the type Action
const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "reset":
      return initialState;
    case "increment":
      return { ...state, count: state.count + 1 };
    case "decrement":
      return { ...state, count: state.count - 1 };
    case "set-color":
      return { ...state, currentColor: action.payload };
    case "setCount":
      return {...state, count: action.user};
  }
};

function ContextOneProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value: Context = { state, dispatch };

  return (
    <ContextOne.Provider value={value}>{props.children} </ContextOne.Provider>
  );
}

let ContextOneConsumer = ContextOne.Consumer;

export { ContextOne, ContextOneProvider, ContextOneConsumer };
