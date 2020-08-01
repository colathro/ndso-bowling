import React, { Component } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./Login";
import { Router, Switch, Route } from "react-router";
import Profile from "./Profile";
import LogScore from "./LogScore";
import MyScores from "./MyScores";
import Admin from "./Admin";
import AdminAthletes from "./AdminAthletes";
import AdminExports from "./AdminExports";
import AdminLogScore from "./AdminLogScore";
import HomeButtons from "./HomeButtons";
import DataAccess from "../utils/DataAccess";

const Home = (props) => {
  const { isAuthenticated } = useAuth0();

  console.log(DataAccess);

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
        <Route path="/admin/logscore" exact component={AdminLogScore} />
        <Route path="/admin/exports" exact component={AdminExports} />
      </Switch>
    </div>
  );
};

export default Home;
