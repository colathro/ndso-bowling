import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../auth/LogoutButton";
import Button from "./ui/Button";

class HomeButtons extends Component {
  constructor(props) {
    super(props);
    this.state = { enableAdmin: false };
  }

  async componentDidMount() {
    fetch("api/admin/amiadmin", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${await this.props.auth0.getAccessTokenSilently({
          audience: window.location.origin,
        })}`,
      },
    }).then(async (response) => {
      if (response.status == 200) {
        this.setState({ enableAdmin: true });
      }
    });

    fetch("api/user/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${await this.props.auth0.getAccessTokenSilently({
          audience: window.location.origin,
        })}`,
      },
    }).then(async () => {
      fetch("api/athlete/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${await this.props.auth0.getAccessTokenSilently(
            {
              audience: window.location.origin,
            }
          )}`,
        },
      });
    });
  }

  render() {
    return (
      <div id="menu">
        <Button emoji="😀" onClick={() => this.props.history.push("/profile")}>
          My Profile
        </Button>
        <Button emoji="📝" onClick={() => this.props.history.push("/logscore")}>
          Log Score
        </Button>
        <Button emoji="📜" onClick={() => this.props.history.push("/myscores")}>
          My Scores
        </Button>
        {this.state.enableAdmin && (
          <Button emoji="📱" onClick={() => this.props.history.push("/admin")}>
            Admin Portal
          </Button>
        )}
        <LogoutButton></LogoutButton>
      </div>
    );
  }
}

export default withAuth0(HomeButtons);
