import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import LogScore from "./LogScore";

class AdminLogScore extends LogScore {
  constructor(athlete) {
    super(props);

    this.state = { athlete: {}, game: { date: "", score: 0, location: "" } };
  }

  updateDate(date) {
    super.updateDate(date);
  }

  updateScore(score) {
    super.updateScore(score);
  }

  updateLocation(location) {
    super.updateLocation(location);
  }

  ShowAthletees() {
      document.getElementById("dropdown").classList.toggle("show");
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
        <div className="dropdown">
          <button onclick="ShowAthletes()" class="dropbtn">Dropdown</button>
          <div id="myDropdown" class="dropdown-content">
            <a href="#">Athlete 1</a>
            <a href="#">Athlete 2</a>
            <a href="#">Athlete 3</a>
          </div>
        </div>
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
