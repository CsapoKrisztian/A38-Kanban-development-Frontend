import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { LabelProvider } from "./context/LabelContext";

ReactDOM.render(
  <React.StrictMode>
    <LabelProvider>
      <App />
    </LabelProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
