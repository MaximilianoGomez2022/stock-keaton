import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store"; // Asegúrate de importar el store correctamente
import ScrollToTop from "./components/ScrollTop";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
    <ScrollToTop/>
      <App />
    </BrowserRouter>
  </Provider>
);

