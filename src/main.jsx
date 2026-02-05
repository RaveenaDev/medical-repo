import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./components/State/store.js";

createRoot(document.getElementById("root")).render(
  <HashRouter>
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  </HashRouter>,
);
