import React, { Component } from "react";
import DataAccess from "../utils/DataAccess";
import Input from "./ui/Input";
import BackBar from "./ui/BackBar";
import SmallButton from "./ui/SmallButton";

class LogScore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: {
        date: { value: "", inError: false },
        score: { value: 0, inError: false },
        location: { value: "", inError: false },
        witness: { value: "", inError: false },
      },
    };
  }

  updateDate(date) {
    this.state.game.date.value = date;
    this.state.game.date.inError = false;
    this.setState({ game: this.state.game });
  }

  updateScore(score) {
    this.state.game.score.value = parseInt(score);
    this.state.game.score.inError = false;
    this.setState({ game: this.state.game });
  }

  updateLocation(location) {
    this.state.game.location.value = location;
    this.state.game.location.inError = false;
    this.setState({ game: this.state.game });
  }

  updateAthlete(athlete) {
    this.state.athlete = athlete;
  }

  updateWitness(witness) {
    this.state.game.witness.value = witness;
    this.state.game.witness.inError = false;
    this.setState({ game: this.state.game });
  }

  async submitScore() {
    if (this.validateInput()) {
      var data = {
        date: this.state.game.date.value,
        score: this.state.game.score.value,
        location: this.state.game.location.value,
        witness: this.state.game.witness.value,
      };
      DataAccess.postData("api/game/submitmygame", data, () => {
        this.props.history.push("/");
      });
    } else {
      this.setState({ game: this.state.game });
    }
  }

  validateInput() {
    var submit = true;
    if (this.state.game.date.value == "") {
      submit = false;
      this.state.game.date.inError = true;
    }
    if (this.state.game.score.value == 0) {
      submit = false;
      this.state.game.score.inError = true;
    }
    if (this.state.game.location.value == "") {
      submit = false;
      this.state.game.location.inError = true;
    }
    if (this.state.game.witness.value == "") {
      submit = false;
      this.state.game.witness.inError = true;
    }
    return submit;
  }

  render() {
    const renderAthleteSelection = () => {
      if (this.props.admin) {
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
    };
    return (
      <div>
        <BackBar history={this.props.history}>Log Score </BackBar>
        {renderAthleteSelection()}
        <div id="input-fields" role="main">
          <form>
            <div className="field">
              <span className="field-title">Date</span>
              <Input
                emoji="📅"
                type="date"
                onChange={(e) => {
                  this.updateDate(e.target.value);
                }}
                defaultValue={this.state.game?.date.value}
                inError={this.state.game.date.inError}
                ariaLabel="Date field"
              ></Input>
            </div>
            <div className="field">
              <span className="field-title">Location</span>
              <Input
                emoji="🌐"
                type="text"
                onChange={(e) => {
                  this.updateLocation(e.target.value);
                }}
                defaultValue={this.state.game?.location.value}
                inError={this.state.game.location.inError}
                ariaLabel="Location field"
              ></Input>
            </div>
            <div className="field">
              <span className="field-title">Game Score (0 - 300)</span>
              <Input
                emoji="🎳"
                type="number"
                onChange={(e) => {
                  this.updateScore(parseInt(e.target.value));
                }}
                defaultValue={this.state.game?.score.value}
                inError={this.state.game.score.inError}
                ariaLabel="Game score field (0-300)"
              ></Input>
            </div>
            <div className="field">
              <span className="field-title">Witness</span>
              <Input
                emoji="😀"
                type="text"
                onChange={(e) => {
                  this.updateWitness(e.target.value);
                }}
                defaultValue={this.state.game?.witness.value}
                inError={this.state.game.witness.inError}
                ariaLabel="Witness field"
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
                ariaLabel="cancel and go back"
              ></SmallButton>
              <SmallButton
                emoji="✅"
                primary={true}
                onClick={() => {
                  this.submitScore();
                }}
                ariaLabel="submit button"
              ></SmallButton>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LogScore;
