import React, { Component } from "react";
import LogScore from "../LogScore";

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

export default AdminLogScore;
