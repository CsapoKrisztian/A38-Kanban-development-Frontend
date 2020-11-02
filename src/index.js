import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { FilterProvider } from "./context/FilterContext";
import { AccessProvider } from "./context/AccessContext";
import { StatusProvider } from "./context/StatusContext";

/**
 * All child components of the App has access to the statuses, and the selected filters,
 * and they know if the user is authenticated or not,
 * because of the FilterContext and the AccessContext and the StatusContext.
 */
ReactDOM.render(
  <React.StrictMode>
    <AccessProvider>
      <FilterProvider>
        <StatusProvider>
          <App />
        </StatusProvider>
      </FilterProvider>
    </AccessProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
