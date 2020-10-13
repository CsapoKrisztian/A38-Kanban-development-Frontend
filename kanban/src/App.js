import React from "react";
import "./App.css";
import { Router, Route, Switch } from "react-router-dom";
import ErrorMessage from "./service/ErrorMessage";
import GetToken from "./service/GetToken";
import history from "./context/history";
import Auth from "./service/Auth";

function App() {
  return (
    <React.Fragment>
      <Router history={history}>
        <Switch>
          <Route
            // Kanban Table and selected filters
            exact
            path="/"
            component={Auth}
          />
          <Route
            // Error page
            path="/error/:message"
            component={ErrorMessage}
          />
          <Route
            // Get access token of the user
            path="/getToken"
            component={GetToken}
          />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
