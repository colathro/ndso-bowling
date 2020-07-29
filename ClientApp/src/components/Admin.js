import React from "react";
import Button from "./ui/Button";

const Admin = (props) => {
  return (
    <div id="admin">
      <div className="admin-buttons">
        <Button
          emoji="📝"
          onClick={() => props.history.push("/admin/logscore")}
        >
          Log Score
        </Button>
        <Button
          emoji="🚴‍♀️"
          onClick={() => props.history.push("/admin/athletes")}
        >
          Athletes
        </Button>
        <Button emoji="📃" onClick={() => props.history.push("/admin/scores")}>
          View/Edit Scores
        </Button>
      </div>
    </div>
  );
};

export default Admin;
