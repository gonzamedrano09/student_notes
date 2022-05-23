import React from "react";
import "./App.css";
import Login from "./LoginUser/Login";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import Student from "./Student/Student";

export function App() {
  //let { path } = useRouteMatch();

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/"><Login /></Route>
        <Route path="/students"><Student/></Route>
      </Switch>
    </BrowserRouter>
  );
}
