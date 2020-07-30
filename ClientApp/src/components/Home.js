import React, { Component } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./Login";
import { Router, Switch, Route } from "react-router";
import Profile from "./Profile";
import LogScore from "./LogScore";
import MyScores from "./MyScores";
import Admin from "./Admin";
import AdminAthletes from "./AdminAthletes";
import AdminLogScore from "./AdminLogScore";
import AdminScores from "./AdminScores";
import HomeButtons from "./HomeButtons";

const Home = (props) => {
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return <Login></Login>;
  }

  return (
    <div>
      <Switch>
        <Route path="/" exact component={HomeButtons} />
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
