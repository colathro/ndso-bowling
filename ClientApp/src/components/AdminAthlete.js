import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import { Router, Switch, Route } from "react-router";
import Profile from "./Profile";

class AdminAthlete extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Profile
          history={this.props.history}
          location={this.props.location}
          update={true}
        ></Profile>
      </div>
    );
  }
}

export default withAuth0(AdminAthlete);
