import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import BackBar from "./ui/BackBar";
import List from "./ui/List";

class MyScores extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true, scores: null };

    this.fields = [
      { id: 0, name: "Score", emoji: "🎳", field: "score" },
      { id: 2, name: "Date", emoji: "📅", field: "date" },
    ];
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
        <BackBar history={this.props.history}>My Scores</BackBar>
        <div>
          {!this.state.loading && (
            <List items={this.state.scores} fields={this.fields}></List>
          )}
        </div>
      </div>
    );
  }
}

export default withAuth0(MyScores);
