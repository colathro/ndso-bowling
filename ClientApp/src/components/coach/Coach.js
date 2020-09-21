import React from "react";
import Button from "../ui/Button";
import BackBar from "../ui/BackBar";

const Coach = (props) => {
  return (
    <div>
      <BackBar history={props.history}>Coach Portal</BackBar>
      <div id="menu">
        <Button
          emoji="🚴‍♀️"
          onClick={() => props.history.push("/coach/athletes")}
        >
          Athletes
        </Button>
      </div>
    </div>
  );
};

export default Coach;
