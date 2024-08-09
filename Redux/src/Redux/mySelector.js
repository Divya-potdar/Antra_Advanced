import { useContext, useEffect, useReducer } from "react";
import MyContext from "../Components/myContext";

// Define a reducer function to manage the selected state
function selectedStateReducer(state, action) {
  switch (action.type) {
    case "SET_SELECTED_STATE":
      return action.payload;
    default:
      return state;
  }
}

export default function useMySelector(selectorFn, options) {
  const { store } = useContext(MyContext);

  // Default comparator function (strict equality check)
  const defaultComparator = (a, b) => a === b;
  const comparator = options?.equalityFn || defaultComparator;

  // Use useReducer to manage the selected state
  const [selectedState, dispatch] = useReducer(
    selectedStateReducer,
    selectorFn(store.getState())
  );

  useEffect(() => {
    const checkForUpdates = () => {
      const newSelectedState = selectorFn(store.getState());
      if (!comparator(newSelectedState, selectedState)) {
        dispatch({ type: "SET_SELECTED_STATE", payload: newSelectedState });
      }
    };

    // Subscribe to store updates and check for state changes
    const unsubscribe = store.subscribe(checkForUpdates);

    // Initial check to ensure the state is synchronized
    checkForUpdates();

    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, [store, selectorFn, comparator, selectedState]);

  return selectedState;
}
