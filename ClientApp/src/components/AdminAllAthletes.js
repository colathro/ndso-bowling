import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import { Router, Switch, Route } from "react-router";
import List from "./ui/List";
import BackBar from "./ui/BackBar";
import Select from "./ui/Select";

class AdminAllAthletes extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true, athletes: null, district: 0 };
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
    this.setState({ loading: true });
    fetch(`api/admin/allathletes?district=${this.state.district}`, {
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
    this.props.history.push(`/admin/athlete?id=${id}`);
  }

  render() {
    return (
      <div>
        <BackBar history={this.props.history}>Athletes</BackBar>
        <Select
          emoji="🗺"
          disabled={!this.state.editable}
          onChange={(e) => {
            this.state.district = parseInt(e.target.value);
            this.getAthletes();
          }}
        >
          <option value={0} selected={this.state.athlete?.district == 0}>
            None
          </option>
          <option value={1} selected={this.state.athlete?.district == 1}>
            Williston - 1
          </option>
          <option value={2} selected={this.state.athlete?.district == 2}>
            Minot - 2
          </option>
          <option value={3} selected={this.state.athlete?.district == 3}>
            Devils Lake - 3
          </option>
          <option value={5} selected={this.state.athlete?.district == 5}>
            Grand Forks - 5
          </option>
          <option value={6} selected={this.state.athlete?.district == 6}>
            Fargo - 6
          </option>
          <option value={7} selected={this.state.athlete?.district == 7}>
            Wahpteon - 7
          </option>
          <option value={8} selected={this.state.athlete?.district == 8}>
            Valley City - 8
          </option>
          <option value={9} selected={this.state.athlete?.district == 9}>
            Jamestown - 9
          </option>
          <option value={10} selected={this.state.athlete?.district == 10}>
            Bismarck - 10
          </option>
          <option value={11} selected={this.state.athlete?.district == 11}>
            Mandan - 11
          </option>
          <option value={12} selected={this.state.athlete?.district == 12}>
            Dickinson - 12
          </option>
        </Select>
        <div>
          {!this.state.loading && (
            <List
              fields={this.fields}
              items={this.state.athletes}
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

export default withAuth0(AdminAllAthletes);
