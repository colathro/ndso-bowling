import React from "react";

const Admin = (props) => {
  return (
    <div>
      <button onClick={() => props.history.push("/admin/logscore")}>
        Log Score
      </button>
      <button onClick={() => props.history.push("/admin/registerathlete")}>
        Register Athlete
      </button>
      <button onClick={() => props.history.push("/admin/viewscores")}>
        View Scores
      </button>
      <button onClick={() => props.history.push("/admin/athleteapproval")}>
        Athlete Approval
      </button>
    </div>
  );
};

export default Admin;
