import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import * as QueryString from "query-string";
import BackBar from "./ui/BackBar";

class Profile extends Component {
  constructor(props) {
    super(props);

    var registering = false;
    var loading = true;
    var athlete = null;
    var updating = false;
    var target = null;
    var editable = true;
    var approvalButton = false;
    const params = QueryString.parse(props.location.search);

    // update these if registering new scenario
    if (this.props.new != null && this.props.new) {
      var registering = true;
      var loading = false;
      var athlete = {
        firstName: "",
        middleName: "",
        lastName: "",
        birthday: "",
        phoneNumber: "",
        email: "",
      };
    }

    if (this.props.update) {
      updating = true;
      target = params.id;
    }

    if (params.approve == 1) {
      editable = false;
      approvalButton = true;
    }

    this.state = {
      loading: loading,
      profile: null,
      athlete: athlete,
      image: null,
      review: null,
      registering: registering,
      target: target,
      updating: updating,
      editable: editable,
      approvalButton: approvalButton,
    };
  }

  async componentDidMount() {
    if (!this.state.registering && !this.state.updating) {
      await this.getMyProfile();
      this.getMyAthlete();
    }

    if (this.state.updating) {
      this.getAthlete(this.state.target);
    }
  }

  async getMyProfile() {
    return fetch("api/user/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${await this.props.auth0.getAccessTokenSilently({
          audience: window.location.origin,
        })}`,
      },
    })
      .then(async (response) => {
        if (response.status == 200) {
          this.setState({ loading: false });
        }
        var body = response.json();
        return body;
      })
      .then((body) => {
        this.setState({ profile: body });
      });
  }

  async getMyAthlete() {
    fetch("api/athlete/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${await this.props.auth0.getAccessTokenSilently({
          audience: window.location.origin,
        })}`,
      },
    })
      .then(async (response) => {
        if (response.status == 200) {
          this.setState({ loading: false });
        }
        var body = response.json();
        return body;
      })
      .then((body) => {
        this.setState({ athlete: body });
      });
  }

  async getAthlete(id) {
    fetch(`api/admin/athlete?id=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${await this.props.auth0.getAccessTokenSilently({
          audience: window.location.origin,
        })}`,
      },
    })
      .then(async (response) => {
        if (response.status == 200) {
          this.setState({ loading: false });
        }
        var body = response.json();
        return body;
      })
      .then((body) => {
        this.setState({ athlete: body });
      });
  }

  async updateProfile() {
    this.setState({ loading: true });
    if (this.state.registering) {
      fetch("api/admin/registerathlete", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await this.props.auth0.getAccessTokenSilently(
            {
              audience: window.location.origin,
            }
          )}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.athlete),
      }).then((response) => {
        if (response.status == 200) {
          this.props.history.goBack();
        } else {
          this.setState({ loading: false });
        }
      });
    } else if (this.state.updating) {
      fetch("api/admin/athlete", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${await this.props.auth0.getAccessTokenSilently(
            {
              audience: window.location.origin,
            }
          )}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.athlete),
      }).then((response) => {
        if (response.status == 200) {
          this.props.history.goBack();
        } else {
          this.setState({ loading: false });
        }
      });
    } else {
      fetch("api/athlete/update", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${await this.props.auth0.getAccessTokenSilently(
            {
              audience: window.location.origin,
            }
          )}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.athlete),
      }).then((response) => {
        if (response.status == 200) {
          this.props.history.goBack();
        } else {
          this.setState({ loading: false });
        }
      });
    }
  }

  async approve(id) {
    this.setState({ loading: true });
    fetch(`api/admin/approveathlete?id=${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await this.props.auth0.getAccessTokenSilently({
          audience: window.location.origin,
        })}`,
      },
    }).then((response) => {
      if (response.status == 200) {
        this.props.history.goBack();
      } else {
        this.setState({ loading: false });
      }
    });
  }

  async deny(id) {
    this.setState({ loading: true });
    fetch(`api/admin/denyathlete?id=${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await this.props.auth0.getAccessTokenSilently({
          audience: window.location.origin,
        })}`,
      },
    }).then((response) => {
      if (response.status == 200) {
        this.props.history.goBack();
      } else {
        this.setState({ loading: false });
      }
    });
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <BackBar history={this.props.history}>
          {this.state.registering ? "Register Athlete" : "Edit Profile"}
        </BackBar>
        <form>
          <div>
            First Name
            <input
              disabled={!this.state.editable}
              type="text"
              defaultValue={this.state.athlete?.firstName}
              onChange={(e) => {
                this.state.athlete.firstName = e.target.value;
              }}
            ></input>
          </div>
          <div>
            Middle Name
            <input
              disabled={!this.state.editable}
              type="text"
              defaultValue={this.state.athlete?.middleName}
              onChange={(e) => {
                this.state.athlete.middleName = e.target.value;
              }}
            ></input>
          </div>
          <div>
            Last Name
            <input
              disabled={!this.state.editable}
              type="text"
              defaultValue={this.state.athlete?.lastName}
              onChange={(e) => {
                this.state.athlete.lastName = e.target.value;
              }}
            ></input>
          </div>
          <div>
            Birthday
            <input
              disabled={!this.state.editable}
              type="date"
              defaultValue={this.state.athlete?.birthday}
              onChange={(e) => {
                this.state.athlete.birthday = e.target.value;
              }}
            />
          </div>
          <div>
            Phone Number
            <input
              disabled={!this.state.editable}
              type="text"
              defaultValue={this.state.athlete?.phoneNumber}
              onChange={(e) => {
                this.state.athlete.phoneNumber = e.target.value;
              }}
            ></input>
          </div>
          <div>
            Email
            <input
              disabled={!this.state.editable}
              type="email"
              defaultValue={this.state.athlete?.email}
              onChange={(e) => {
                this.state.athlete.email = e.target.value;
              }}
            ></input>
          </div>
        </form>
        {this.state.editable && (
          <button
            onClick={async () => {
              await this.updateProfile();
            }}
          >
            {this.state.registering ? "Register" : "Update Profile"}
          </button>
        )}
        {this.state.approvalButton && (
          <div>
            <button
              onClick={() => {
                this.approve(this.state.target);
              }}
            >
              Approve
            </button>
            <button
              onClick={() => {
                this.deny(this.state.target);
              }}
            >
              Deny
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default withAuth0(Profile);
