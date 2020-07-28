import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";

class LogScore extends Component {
  constructor(props) {
    super(props);

    this.state = { game: { date: "", score: 0, location: "" } };
  }

  updateDate(date) {
    this.state.game.date = date;
  }

  updateScore(score) {
    this.state.game.score = score;
  }

  updateLocation(location) {
    this.state.game.location = location;
  }

  async submitScore() {
    fetch("api/game/submitmygame", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await this.props.auth0.getAccessTokenSilently({
          audience: window.location.origin,
        })}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.game),
    }).then(() => {
      this.props.history.push("/");
    });
  }

  render() {
    return (
      <div>
        <div>
          Date
          <input
            type="date"
            onChange={(e) => {
              this.updateDate(e.target.value);
            }}
          ></input>
        </div>
        <div>
          Location
          <input
            type="text"
            onChange={(e) => {
              this.updateLocation(e.target.value);
            }}
          ></input>
        </div>
        <div>
          Game Score (0 - 300)
          <input
            type="number"
            onChange={(e) => {
              this.updateScore(parseInt(e.target.value));
            }}
          ></input>
        </div>
        <button
          onClick={() => {
            this.submitScore();
          }}
        >
          Submit Score
        </button>
      </div>
    );
  }
}

export default withAuth0(LogScore);
