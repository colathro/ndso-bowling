import React, { Component } from "react";
import { Route } from "react-router";
import LoginButton from "./auth/LoginButton";
import LogoutButton from "./auth/LogoutButton";
import Profile from "./auth/Profile";
import Wrapper from "./auth/Wrapper";

import "./App.css";

export default class App extends Component {
  static displayName = App.name;

  constructor(props) {
    super(props);
  }

  async componentDidMount() {}

  render() {
    return (
      <Wrapper>
        <LoginButton></LoginButton>
        <LogoutButton></LogoutButton>
        <Profile></Profile>
      </Wrapper>
    );
  }
}
