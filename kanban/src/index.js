import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { FilterProvider } from "./context/FilterContext";
import { AccessProvider } from "./context/AccessContext";

/**
 * All child components of the App has access to selected filters,
 * and they know if the user is authenticated or not,
 * because of the FilterContext and the AccessContext.
 */
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
