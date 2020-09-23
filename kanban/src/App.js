import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./page/Main";
import Header from "./layout/Header";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Route exact path="/" component={Main} />
      </Router>
    </div>
  );
}

export default App;
