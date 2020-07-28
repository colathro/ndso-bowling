import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";

class LogScore extends Component {
  constructor(props) {
    super(props);
  }

  async logMyScore() {
    fetch("api/user/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${await this.props.auth0.getAccessTokenSilently({
          audience: window.location.origin,
        })}`,
      },
    });
  }

  render() {
    return <div>Log Score</div>;
  }
}

export default withAuth0(LogScore);
