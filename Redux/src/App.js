import "./App.css";
import CarApp from "./Components/carapp";
import MyContexProvider from "./Components/contextProvider";
import store from "./Redux/store";
import { Provider } from "react-redux";


function App() {
  return (
    <div className="horizontal">
      {/* <Provider store={store}> */}
      <MyContexProvider store={store}>
        <CarApp />
      </MyContexProvider>
      {/* </Provider> */}
    </div>
  );
}

export default App;
