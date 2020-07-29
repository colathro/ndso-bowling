import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./Login";
import { Router, Switch, Route } from "react-router";
import LogoutButton from "../auth/LogoutButton";
import Profile from "./Profile";
import LogScore from "./LogScore";
import MyScores from "./MyScores";
import Admin from "./Admin";
import AdminAthletes from "./AdminAthletes";
import AdminLogScore from "./AdminLogScore";
import AdminScores from "./AdminScores";

import Button from "./ui/Button";

const Main = (props) => {
  return (
    <div id="home">
      <Button emoji="😀" onClick={() => props.history.push("/profile")}>
        My Profile
      </Button>
      <Button emoji="📝" onClick={() => props.history.push("/logscore")}>
        Log Score
      </Button>
      <Button emoji="📜" onClick={() => props.history.push("/myscores")}>
        My Scores
      </Button>
      <Button emoji="📱" onClick={() => props.history.push("/admin")}>
        Admin Portal
      </Button>
      <LogoutButton></LogoutButton>
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
        <Route path="/profile" exact component={Profile} />
        <Route path="/logscore" exact component={LogScore} />
        <Route path="/myscores" exact component={MyScores} />
        <Route path="/admin" exact component={Admin} />
        <Route path="/admin/athlete*" exact component={AdminAthletes} />
        <Route path="/admin/scores*" exact component={AdminScores} />
        <Route path="/admin/logscore" exact component={AdminLogScore} />
      </Switch>
    </div>
  );
};

export default Home;
