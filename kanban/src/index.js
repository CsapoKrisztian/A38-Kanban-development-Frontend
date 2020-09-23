import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { StatusProvider } from "./context/StatusContext";

ReactDOM.render(
  <React.StrictMode>
    <StatusProvider>
      <App />
    </StatusProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
