import React, { useState } from "react";
import "./App.css";
import { Router, Route, Switch } from "react-router-dom";
import Main from "./page/Main";
import Header from "./layout/Header";
import ErrorMessage from "./layout/ErrorMessage";
import history from "./context/history";
import GetToken from "./service/GetToken";
import Settings from "./layout/Settings";

const openedStyle = {
  width: "250px",
};

const closedStyle = {
  width: 0,
};

const pushedStyle = {
  marginRight: "250px",
};

const expandedStyle = {
  marginRight: 0,
};

function App() {
  const [opened, setOpened] = useState(false);

  // Toggle opening of the sidebar
  const toggleOpened = () => {
    setOpened((opened) => !opened);
  };

  return (
    <div className="App">
      <Router history={history}>
        <Header toggleOpened={toggleOpened} />
        <div
          id="main"
          // Apply 'pushedStyle' CSS class if the sidebar is opened,
          // and 'expandedStyle' if it is closed.
          style={opened ? pushedStyle : expandedStyle}
        >
          <Switch>
            <Route
              // Kanban Table and selected filters
              exact
              path="/"
              component={Main}
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
        </div>
        <Settings
          // Apply 'openedStyle' CSS class if the sidebar is opened,
          // and 'closedStyle' if it is closed.
          currentStyle={opened ? openedStyle : closedStyle}
          toggleOpened={toggleOpened}
        />
      </Router>
    </div>
  );
}

export default App;
