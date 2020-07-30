import React from "react";
import Button from "./ui/Button";
import BackBar from "./ui/BackBar";

const Admin = (props) => {
  return (
    <div>
      <BackBar history={props.history}>Admin Portal</BackBar>
      <div id="admin">
        <div className="admin-buttons">
          <Button
            emoji="🚴‍♀️"
            onClick={() => props.history.push("/admin/athletes")}
          >
            Athletes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
