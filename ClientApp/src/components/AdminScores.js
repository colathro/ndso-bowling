import AdminAllScores from "./AdminAllScores";
import AdminUnreviewedScores from "./AdminUnreviewedScores";
import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import { Switch, Route } from "react-router";

const AdminScoresMain = (props) => {
    return (
    <div>
      <button onClick={() => props.history.push("/admin/scores/all")}>
        View All Scores
      </button>
      <button onClick={() => props.history.push("/admin/scores/unreviewed")}>
        Scores to Review
      </button>
      <button onClick={() => props.history.push("/admin/scores/athlete")}>
        View Athlete's Scores
      </button>
    </div>
    );
}

class AdminScores extends Component {
  constructor(props) {
    super(props);
    this.state  = {loading: true, scores: []};
  }

  async componentDidMount() {}

  render() {
    return (
      <div>
        <Switch>
          <Route
            path="/admin/scores/all"
            exact
            component={AdminAllScores}
          />
          <Route
            path="/admin/scores/unreviewed"
            exact
            component={AdminUnreviewedScores}
          />
          <Route
            path="/admin/scores/athlete"
            exact
            component={AdminAllScores}
          />
          <Route path="/admin/scores" exact component={AdminScoresMain} />
        </Switch>
      </div>
    );
  }
}

export default withAuth0(AdminScores);