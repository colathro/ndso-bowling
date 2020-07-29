import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import LogScore from "./LogScore";

class AdminLogScore extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        admin log score
        <LogScore admin={true}></LogScore>
      </div>
    );
  }
}

export default withAuth0(AdminLogScore);
