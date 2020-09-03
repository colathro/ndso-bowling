import React, { Component } from "react";
import LogScore from "./LogScore";

class CoachLogScore extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Coach log score
        <LogScore coach={true}></LogScore>
      </div>
    );
  }
}

export default CoachLogScore;
