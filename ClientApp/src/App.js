import React, { Component } from "react";
import { Router, Switch, Route } from "react-router";
import History from "./utils/History";
import Profile from "./components/Profile";
import LogScore from "./components/LogScore";
import MyScores from "./components/MyScores";
import Admin from "./components/Admin";
import AdminAthletes from "./components/AdminAthletes";
import AdminExports from "./components/AdminExports";
import AdminLogScore from "./components/AdminLogScore";
import Home from "./components/Home";
import { withAuth0 } from "@auth0/auth0-react";
import DataAccess from "./utils/DataAccess";
import Login from "./components/Login";
import Coach from "./components/Coach";
import CoachAthletes from "./components/CoachAthletes";
import CoachLogScore from "./components/CoachLogScore";

import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    DataAccess.Auth = this.props.auth0;
  }

  render() {
    if (this.props.auth0.error) {
      return <div>Oops... {this.props.auth0.error.message}</div>;
    }

    if (this.props.auth0.isLoading) {
      return <div></div>;
    }

    if (!this.props.auth0.isAuthenticated) {
      return <Login></Login>;
    }

    return (
      <Router history={History}>
        <div className="background"></div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/logscore" exact component={LogScore} />
          <Route path="/myscores" exact component={MyScores} />
          <Route path="/coach" exact component={Coach} />
          <Route path="/coach/athlete*" exact component={CoachAthletes} />
          <Route path="/coach/logscore" exact component={CoachLogScore} />
          <Route path="/admin" exact component={Admin} />
          <Route path="/admin/athlete*" exact component={AdminAthletes} />
          <Route path="/admin/logscore" exact component={AdminLogScore} />
          <Route path="/admin/exports" exact component={AdminExports} />
        </Switch>
      </Router>
    );
  }
}

export default withAuth0(App);
