import { useContext } from "react";
import MyContext from "../Components/myContext";

// Rename to start with "use"
export default function useMyDispatch() {
  const { store } = useContext(MyContext);

  return store.dispatch;
}
