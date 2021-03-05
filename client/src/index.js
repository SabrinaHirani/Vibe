import React from "react";
import ReactDOM from "react-dom";

import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import Home from "./components/Home.jsx";
import Dashboard from "./components/Dashboard";
import Class from "./components/Class";
import Lesson from "./components/Lesson";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/home" component={Home} />
      <Route path="/mission-control" component={Dashboard} />
      <Route path="/class" component={Class} />
      <Route path="/learn" component={Lesson} />
      <Redirect to="/home" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
