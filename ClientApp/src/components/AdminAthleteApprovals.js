import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import { Router, Switch, Route } from "react-router";

class AdminAthleteApprovals extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true, athletes: null };
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
        Approvals
        <div>
          <ul>
            {!this.state.loading &&
              this.state.athletes.map((v, i) => {
                return (
                  <li>
                    <span>{v.id}</span>
                    <span>
                      <a
                        onClick={() => {
                          this.navigateToAthlete(v.id);
                        }}
                      >
                        {v.firstName + " " + v.lastName}
                      </a>
                    </span>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    );
  }
}

export default withAuth0(AdminAthleteApprovals);
