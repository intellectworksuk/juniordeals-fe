import * as React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { persistor, store } from "./store";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";
import "antd/dist/antd.css";
import reportWebVitals from "./reportWebVitals";
import { PersistGate } from "redux-persist/integration/react";
// import { init } from "./init";

// init();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <HelmetProvider>
          {/* <React.StrictMode> */}
          <App />
          {/* </React.StrictMode> */}
        </HelmetProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
