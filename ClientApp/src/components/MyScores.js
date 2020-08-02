import React, { Component } from "react";
import BackBar from "./ui/BackBar";
import DataAccess from "../utils/DataAccess";
import List from "./ui/List";

class MyScores extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true, scores: null, dataAccess: DataAccess };

    this.fields = [
      { id: 0, name: "Score", emoji: "🎳", field: "score" },
      { id: 2, name: "Date", emoji: "📅", field: "date" },
    ];
  }

  async componentDidMount() {
    this.getMyScores();
  }

  async getMyScores() {
    DataAccess.getData("api/game/mygames", this.setScores.bind(this));
  }

  setScores(body) {
    this.setState({ scores: body, loading: false });
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

export default MyScores;
