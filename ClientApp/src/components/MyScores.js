import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";

class MyScores extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true, scores: null };
  }

  async componentDidMount() {
    this.getMyScores();
  }

  async getMyScores() {
    fetch("api/game/mygames", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${await this.props.auth0.getAccessTokenSilently({
          audience: window.location.origin,
        })}`,
      },
    })
      .then(async (response) => {
        var body = response.json();
        return body;
      })
      .then((body) => {
        this.setState({ scores: body, loading: false });
      });
  }

  render() {
    return (
      <div>
        My Scores
        <div>
          <ul>
            {!this.state.loading &&
              this.state.scores.map((v, i) => {
                return (
                  <li>
                    <span>{v.score}</span>|<span>{v.date}</span>|
                    <span>{v.location}</span>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    );
  }
}

export default withAuth0(MyScores);
