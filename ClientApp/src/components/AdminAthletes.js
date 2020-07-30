import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import { Router, Switch, Route } from "react-router";
import AdminAthleteApprovals from "./AdminAthleteApprovals";
import AdminAllAthletes from "./AdminAllAthletes";
import AdminRegisterAthlete from "./AdminRegisterAthlete";
import AdminAthlete from "./AdminAthlete";
import BackBar from "./ui/BackBar";
import Button from "./ui/Button";
import AdminScoresByAthlete from "./AdminScoresByAthlete";

const AdminAthleteMain = (props) => {
  return (
    <div>
      <BackBar history={props.history}>Athlete Actions</BackBar>
      <div id="menu">
        <Button
          emoji="🧗‍♂️"
          onClick={() => props.history.push("/admin/athletes/register")}
        >
          Register Athlete
        </Button>
        <Button
          emoji="🚴‍♂️"
          onClick={() => props.history.push("/admin/athletes/allathletes")}
        >
          All Athletes
        </Button>
        <Button
          emoji="🏋️‍♀️"
          onClick={() => props.history.push("/admin/athletes/athleteapprovals")}
        >
          Athlete Approvals
        </Button>
      </div>
    </div>
  );
};

class AdminAthletes extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true, athletes: [] };
  }

  async componentDidMount() {}

  render() {
    return (
      <div>
        <Switch>
          <Route
            path="/admin/athletes/register"
            exact
            component={AdminRegisterAthlete}
          />
          <Route
            path="/admin/athletes/allathletes"
            exact
            component={AdminAllAthletes}
          />
          <Route
            path="/admin/athletes/athleteapprovals"
            exact
            component={AdminAthleteApprovals}
          />
          <Route path="/admin/athletes/scoresbyathlete*" exact component={AdminScoresByAthlete}/>
          <Route path="/admin/athletes" exact component={AdminAthleteMain} />
          <Route path="/admin/athlete" exact component={AdminAthlete} />
        </Switch>
      </div>
    );
  }
}

export default withAuth0(AdminAthletes);
