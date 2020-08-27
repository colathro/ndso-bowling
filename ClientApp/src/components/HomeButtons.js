import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../auth/LogoutButton";
import Button from "./ui/Button";
import DataAccess from "../utils/DataAccess";

class HomeButtons extends Component {
  constructor(props) {
    super(props);
    this.state = { enableAdmin: false, me: undefined };
  }

  async componentDidMount() {
    DataAccess.getNoData("api/admin/amiadmin", () => {
      this.setState({ enableAdmin: true });
    });

    DataAccess.getData("api/user/me", () => {
      DataAccess.getData("api/athlete/me", (me) => {
        console.log(me);
        this.setState({ me: me });
      });
    });
  }

  render() {
    return (
      <div id="menu" role="main">
        <img
          className="image"
          src="/images/SO_NorthDakota_Mark_resized.png"
          alt="Special Olympics ND Logo"
        ></img>
        <div className="welcome">
          {this.state.me != undefined && this.state.me.firstName != "" && (
            <span>Welcome back {this.state.me?.firstName}!</span>
          )}
          {this.state.me != undefined && this.state.me.firstName == "" && (
            <span>Start with setting up your profile!</span>
          )}{" "}
        </div>
        <Button emoji="😀" onClick={() => this.props.history.push("/profile")}>
          My Profile
        </Button>
        <Button emoji="📝" onClick={() => this.props.history.push("/logscore")}>
          New Score Entry
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
