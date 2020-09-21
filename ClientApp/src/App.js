import React, { Component } from "react";
import { Router, Switch, Route } from "react-router";
import History from "./utils/History";
import Profile from "./components/Profile";
import LogScore from "./components/LogScore";
import MyScores from "./components/MyScores";
import Admin from "./components/admin/Admin";
import AdminAthletes from "./components/admin/AdminAthletes";
import AdminExports from "./components/admin/AdminExports";
import AdminLogScore from "./components/admin/AdminLogScore";
import Home from "./components/Home";
import { withAuth0 } from "@auth0/auth0-react";
import DataAccess from "./utils/DataAccess";
import Login from "./components/Login";
import Coach from "./components/coach/Coach";
import CoachAthletes from "./components/coach/CoachAthletes";
import CoachLogScore from "./components/coach/CoachLogScore";
import { Layout, Button, Row, Col, Space } from "antd";

import "./App.less";

const { Header, Content } = Layout;

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
