import React from "react";

const Admin = (props) => {
  return (
    <div>
      <button onClick={() => props.history.push("/admin/logscore")}>
        Log Score
      </button>
      <button onClick={() => props.history.push("/admin/athletes")}>
        Athletes
      </button>
      <button onClick={() => props.history.push("/admin/scores")}>
        View/Edit Scores
      </button>
    </div>
  );
};

export default Admin;
