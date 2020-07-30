import React from "react";
import Button from "./ui/Button";
import BackBar from "./ui/BackBar";

const Admin = (props) => {
  return (
    <div>
      <BackBar history={props.history}>Admin Portal</BackBar>
      <div id="menu">
        <Button
          emoji="🚴‍♀️"
          onClick={() => props.history.push("/admin/athletes")}
        >
          Athletes
        </Button>
        <Button emoji="📄" onClick={() => props.history.push("/admin/exports")}>
          Export Data
        </Button>
      </div>
    </div>
  );
};

export default Admin;
