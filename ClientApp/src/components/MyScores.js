import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";

class MyScores extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true, scores: null };
  }

  async getMyScores() {
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
    return <div>My Scores</div>;
  }
}

export default withAuth0(MyScores);
