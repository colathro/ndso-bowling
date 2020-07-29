import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import { Router, Switch, Route } from "react-router";
import AdminAthleteApprovals from "./AdminAthleteApprovals";
import AdminAllAthletes from "./AdminAllAthletes";
import AdminRegisterAthlete from "./AdminRegisterAthlete";
import AdminAthlete from "./AdminAthlete";

const AdminAthleteMain = (props) => {
  return (
    <div>
      <button onClick={() => props.history.push("/admin/athletes/register")}>
        Register Athlete
      </button>
      <button onClick={() => props.history.push("/admin/athletes/allathletes")}>
        All Athletes
      </button>
      <button
        onClick={() => props.history.push("/admin/athletes/athleteapprovals")}
      >
        Athlete Approvals
      </button>
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
          <Route path="/admin/athletes" exact component={AdminAthleteMain} />
          <Route path="/admin/athlete" exact component={AdminAthlete} />
        </Switch>
      </div>
    );
  }
}

export default withAuth0(AdminAthletes);
