import React from 'react';
import './App.css';
import { Router, Route, Switch } from 'react-router-dom';
import Main from './page/Main';
import Header from './layout/Header';
import ErrorMessage from './layout/ErrorMessage';
import history from './context/history';
import GetToken from './service/GetToken';

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Header />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/error/:message" component={ErrorMessage} />
          <Route path="/getToken" component={GetToken} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
