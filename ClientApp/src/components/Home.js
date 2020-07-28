import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./Login";
import { Router, Switch, Route } from "react-router";
import LogoutButton from "../auth/LogoutButton";
import MyProfile from "./MyProfile";
import LogScore from "./LogScore";
import MyScores from "./MyScores";

const Main = (props) => {
  return (
    <div>
      <button onClick={() => props.history.push("/myprofile")}>
        My Profile
      </button>
      <button onClick={() => props.history.push("/logscore")}>Log Score</button>
      <button onClick={() => props.history.push("/myscores")}>My Scores</button>
    </div>
  );
};

const Home = (props) => {
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return <Login></Login>;
  }

  return (
    <div>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/myprofile" exact component={MyProfile} />
        <Route path="/logscore" exact component={LogScore} />
        <Route path="/myscores" exact component={MyScores} />
      </Switch>
    </div>
  );
};

export default Home;
