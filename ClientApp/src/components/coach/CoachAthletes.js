import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import { Switch, Route } from "react-router";
import CoachAllAthletes from "./CoachAllAthletes";
import CoachRegisterAthlete from "./CoachRegisterAthlete";
import CoachAthlete from "./CoachAthlete";
import BackBar from "../ui/BackBar";
import Button from "../ui/Button";
import CoachScoresByAthlete from "./CoachScoresByAthlete";

const CoachAthleteMain = (props) => {
  return (
    <div>
      <BackBar history={props.history}>Athlete Actions</BackBar>
      <div id="menu">
        <Button
          emoji="🧗‍♂️"
          onClick={() => props.history.push("/coachh/athletes/register")}
        >
          Register Athlete
        </Button>
        <Button
          emoji="🚴‍♂️"
          onClick={() => props.history.push("/Coach/athletes/allathletes")}
        >
          All Athletes
        </Button>
      </div>
    </div>
  );
};

class CoachAthletes extends Component {
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
            path="/coach/athletes/register"
            exact
            component={CoachRegisterAthlete}
          />
          <Route
            path="/coach/athletes/allathletes"
            exact
            component={CoachAllAthletes}
          />
          <Route
            path="/coach/athletes/scoresbyathlete*"
            exact
            component={CoachScoresByAthlete}
          />
          <Route path="/coach/athletes" exact component={CoachAthleteMain} />
          <Route path="/coach/athlete" exact component={CoachAthlete} />
        </Switch>
      </div>
    );
  }
}

export default withAuth0(CoachAthletes);
