import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom";

import Login from "./components/Login";
import ColorList from "./components/ColorList";
import "./styles.scss";
import BubblePage from "./components/BubblePage";

function App() {
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        window.localStorage.getItem("token") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );

  return (
    <Router>
      <div className="App">
        <Link to="/login" className="links">Login</Link>
        <Link to="/api/colors" className="links">Server Data</Link>
        <Switch>
          <Route exact path="/login" component={Login} />
          <PrivateRoute path="/api/colors" component={BubblePage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
