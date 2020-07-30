import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import { Router, Switch, Route } from "react-router";
import BackBar from "./ui/BackBar";
import List from "./ui/List";

class AdminAthleteApprovals extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true, athletes: null };
    this.fields = [
      { id: 0, name: "ID", emoji: "", field: "id" },
      { id: 1, name: "First Name", emoji: "", field: "firstName" },
      { id: 2, name: "Last Name", emoji: "", field: "lastName" },
    ];
  }

  async componentDidMount() {
    this.getAthletes();
  }

  async getAthletes() {
    fetch("api/admin/AllUnapprovedAthletes", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${await this.props.auth0.getAccessTokenSilently({
          audience: window.location.origin,
        })}`,
      },
    })
      .then(async (response) => {
        var body = response.json();
        return body;
      })
      .then((body) => {
        this.setState({ athletes: body, loading: false });
      });
  }

  navigateToAthlete(id) {
    this.props.history.push(`/admin/athlete?id=${id}&approve=1`);
  }

  render() {
    return (
      <div>
        <BackBar history={this.props.history}>Athete Approvals</BackBar>
        <div>
          {!this.state.loading && (
            <List
              items={this.state.athletes}
              fields={this.fields}
              onClick={{
                method: this.navigateToAthlete.bind(this),
                field: "id",
              }}
            ></List>
          )}
        </div>
      </div>
    );
  }
}

export default withAuth0(AdminAthleteApprovals);
