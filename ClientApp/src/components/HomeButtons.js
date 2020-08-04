import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../auth/LogoutButton";
import Button from "./ui/Button";
import DataAccess from "../utils/DataAccess";

class HomeButtons extends Component {
  constructor(props) {
    super(props);
    this.state = { enableAdmin: false };
  }

  async componentDidMount() {
    DataAccess.getNoData("api/admin/amiadmin", () => {
      this.setState({ enableAdmin: true });
    });

    DataAccess.getData("api/user/me", () => {
      DataAccess.getData("api/athlete/me", () => {});
    });
  }

  render() {
    return (
      <div id="menu" role="main">
        <h1>Menu</h1>
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
          <Button emoji="💻" onClick={() => this.props.history.push("/admin")}>
            Admin Portal
          </Button>
        )}
        <LogoutButton></LogoutButton>
      </div>
    );
  }
}

export default withAuth0(HomeButtons);
