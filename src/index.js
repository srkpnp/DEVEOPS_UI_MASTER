import React from "react";
import ReactDOM from "react-dom";
import "jquery";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "./index.css";
import "./App.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import { Provider } from "react-redux";
import basestore from "./stores/baseStore";
import "../node_modules/font-awesome/css/font-awesome.min.css";

ReactDOM.render(
  <Provider store={basestore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
