import { useReducer, useContext, createContext } from "react";

const CounterStateContext = createContext();
const CounterDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "1":
      return (state = 1);
    case "30":
      return (state = 30);
    case "90":
      return (state = 90);
    case "365":
      return (state = 365);
    case "YTD":
      return (state = "YTD");
    case "ITD":
      return (state = "ITD");
    default:
      throw (state = "ITD");
  }
};

export const CounterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, 0);
  return (
    <CounterDispatchContext.Provider value={dispatch}>
      <CounterStateContext.Provider value={state}>
        {children}
      </CounterStateContext.Provider>
    </CounterDispatchContext.Provider>
  );
};

export const useCount = () => useContext(CounterStateContext);
export const useDispatchCount = () => useContext(CounterDispatchContext);
