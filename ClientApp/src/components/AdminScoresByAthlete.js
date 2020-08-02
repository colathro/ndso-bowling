import * as React from "react";
import * as QueryString from "query-string";
import DataAccess from "../utils/DataAccess";
import List from "./ui/List";
import BackBar from "./ui/BackBar";

class AdminScoresByAthlete extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, games: null };

    const params = QueryString.parse(props.location.search);
    this.target = params.id;

    this.fields = [
      { id: 0, name: "Location", emoji: "", field: "location" },
      { id: 1, name: "Date", emoji: "", field: "date" },
      { id: 2, name: "Score", emoji: "", field: "score" },
    ];
  }

  async componentDidMount() {
    this.getScoresByAthlete();
  }

  async getScoresByAthlete() {
    DataAccess.getData(
      `api/admin/GameFromAthlete?id=${this.target}`,
      (body) => {
        this.setState({ games: body, loading: false });
      }
    );
  }

  navigateToGame(id) {
    // direct to specific game
  }

  render() {
    return (
      <div>
        <BackBar history={this.props.history}>Scores for Athlete</BackBar>
        <div>
          {!this.state.loading && (
            <List
              fields={this.fields}
              items={this.state.games}
              onClick={{
                method: this.navigateToGame.bind(this),
                field: "id",
              }}
            ></List>
          )}
        </div>
      </div>
    );
  }
}

export default AdminScoresByAthlete;
