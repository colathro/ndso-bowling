import React, { Component } from "react";
import { Router, Switch, Route } from "react-router";
import History from "./utils/History";
import Home from "./components/Home";
import { useAuth0 } from "@auth0/auth0-react";

import "./App.css";

const App = () => {
  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <div></div>;
  }

  return (
    <Router history={History}>
      <Switch>
        <Route path="*" exact component={Home} />
      </Switch>
    </Router>
  );
};

export default App;
