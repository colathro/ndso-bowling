import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import DataAccess from "../utils/DataAccess";
import CoachHome from "./coach/CoachHome";
import AdminHome from "./admin/AdminHome";
import AthleteHome from "./athlete/AthleteHome";
import { Spin } from "antd";
import SignUpHome from "./signup/SignUpHome";
import CoachSignUpHome from "./signup/CoachSignUpHome";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { enableAdmin: false, user: null };
  }

  async componentDidMount() {
    this.fetchSetUser();
    DataAccess.RefetchPlayer = this.fetchSetUser.bind(this);
  }

  fetchSetUser() {
    DataAccess.getData("api/user/me", (me) => {
      this.setState({ user: me, admin: me.isAdmin });
      this.forceUpdate();
    });
  }

  render() {
    console.log(this.state.user);
    if (this.state.user) {
      if (
        document.location.href.indexOf("coach") != -1 &&
        this.state.user.coach?.firstName == null
      ) {
        console.log(this.state.user);
        return (
          <CoachSignUpHome
            history={this.props.history}
            user={this.state.user}
          ></CoachSignUpHome>
        );
      } else if (
        this.state.user.athlete?.firstName == null &&
        this.state.user.coach?.firstName == null
      ) {
        return (
          <SignUpHome history={this.props.history} user={this.state.user} />
        );
      } else if (this.state.user.isAdmin) {
        return (
          <AdminHome
            history={this.props.history}
            user={this.state.user}
          ></AdminHome>
        );
      } else if (this.state.user.coach) {
        return (
          <CoachHome
            history={this.props.history}
            user={this.state.user}
          ></CoachHome>
        );
      } else {
        return (
          <AthleteHome
            history={this.props.history}
            user={this.state.user}
          ></AthleteHome>
        );
      }
    } else {
      return (
        <div className="loader">
          <Spin size="large"></Spin>
        </div>
      );
    }
  }
}

export default Home;
