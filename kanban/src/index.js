import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { FilterProvider } from "./context/FilterContext";
import { AccessProvider } from "./context/AccessContext";

ReactDOM.render(
  <React.StrictMode>
    <AccessProvider>
      <FilterProvider>
        <App />
      </FilterProvider>
    </AccessProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
