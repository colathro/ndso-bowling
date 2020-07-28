import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";

class MyProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      profile: null,
      athlete: null,
      image: null,
      review: null,
    };
  }

  async componentDidMount() {
    await this.getMyProfile();
    this.getMyAthlete();
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

  async updateProfile() {
    fetch("api/athlete/update", {
      method: "Put",
      headers: {
        Authorization: `Bearer ${await this.props.auth0.getAccessTokenSilently({
          audience: window.location.origin,
        })}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.athlete),
    });
  }

  render() {
    return (
      <div>
        <h1>My Profile</h1>
        <form
          onSubmit={async () => {
            await this.updateProfile();
          }}
        >
          <div>
            First Name
            <input
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
              type="date"
              value={this.state.athlete?.birthday}
              onChange={(e) => {
                this.state.athlete.birthday = e.target.value;
              }}
            />
          </div>
          <div>
            Phone Number
            <input
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
              type="email"
              defaultValue={this.state.athlete?.email}
              onChange={(e) => {
                this.state.athlete.email = e.target.value;
              }}
            ></input>
          </div>
          <input type="submit" value="Update Profile" />
        </form>
      </div>
    );
  }
}

export default withAuth0(MyProfile);
