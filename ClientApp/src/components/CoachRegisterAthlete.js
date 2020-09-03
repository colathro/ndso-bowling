import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import Profile from "./Profile";

class CoachRegisterAthlete extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Profile
        new={true}
        history={this.props.history}
        location={this.props.location}
      ></Profile>
    );
  }
}

export default withAuth0(CoachRegisterAthlete);
