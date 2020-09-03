import React, { Component } from "react";
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

export default AdminAthlete;
