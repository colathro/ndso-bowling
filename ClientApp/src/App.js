import React, { Component } from "react";
import { Router, Switch, Route } from "react-router";
import History from "./utils/History";
import Home from "./components/Home";
import { withAuth0 } from "@auth0/auth0-react";
import DataAccess from "./utils/DataAccess";
import Login from "./components/Login";
import { Layout } from "antd";

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
      console.log(this.props.auth0);
      return <Login></Login>;
    }

    return (
      <Router history={History}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/coach" exact component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default withAuth0(App);
