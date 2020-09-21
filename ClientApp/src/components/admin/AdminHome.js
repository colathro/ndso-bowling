import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import DataAccess from "../../utils/DataAccess";

class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.state = { enableAdmin: false, user: undefined };
  }

  render() {
    return <div>AdminHome</div>;
  }
}

export default withAuth0(AdminHome);
