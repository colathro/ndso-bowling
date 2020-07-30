import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import Input from "./ui/Input";
import BackBar from "./ui/BackBar";
import SmallButton from "./ui/SmallButton";

class LogScore extends Component {
  constructor(props) {
    super(props);

    if (this.props.admin) {
    }

    this.state = { game: { date: "", score: 0, location: "", witness: "" } };
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

  updateAthlete(athlete) {
    this.state.athlete = athlete;
  }

  updateWitness(witness) {
    this.state.witness = witness;
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
    const renderAthleteSelection = ()=>{
      if(this.props.admin) {
        return (
          <div>
            Athlete
            <input
              type="text"
              onChange={(e) => {
                this.updateAthlete(e.target.value);
              }}
            ></input>
          </div>
        );
      }
    }
    return (
      <div>
        <BackBar history={this.props.history}>Log Score </BackBar>
        {renderAthleteSelection()}
        <div id="input-fields">
          <form>
            <div className="field">
              <span classname="field-title">Date</span>
              <Input
                emoji="📅"
                type="date"
                onChange={(e) => {
                  this.updateDate(e.target.value);
                }}
                defaultValue={this.state.game?.date}
              ></Input>
            </div>
            <div className="field">
            <span classname="field-title">Location</span>
              <Input
                emoji="🌐"
                type="text"
                onChange={(e) => {
                  this.updateLocation(e.target.value);
                }}
                defaultValue={this.state.game?.location}
              ></Input>
            </div>
            <div className="field">
            <span classname="field-title">Game Score (0 - 300)</span>
              <Input
                emoji="🎳"
                type="number"
                onChange={(e) => {
                  this.updateScore(parseInt(e.target.value));
                }}
                defaultValue={this.state.game?.score}
              ></Input>
            </div>
            <div className="field">
            <span classname="field-title">Witness</span>
              <Input
                emoji="😀"
                type="text"
                onChange={(e) => {
                  this.updateWitness(e.target.value);
                }}
                defaultValue={this.state.game?.witness}
              ></Input>
            </div>
          </form>
          <div className="submit-buttons">
            <div style={{ display: "flex" }}>
              <SmallButton
                emoji="❌"
                onClick={async () => {
                  this.props.history.goBack();
                }}
              ></SmallButton>
              <SmallButton
                emoji="✅"
                primary={true}
                onClick={() => {
                  this.submitScore();
                }}
              ></SmallButton>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth0(LogScore);
