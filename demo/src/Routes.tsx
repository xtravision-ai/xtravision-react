import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Workout from "./pages/Workout";

export const AppRoute = Object.freeze({
  HomePage: "/app/",
  Workout: "/app/workout",
});

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Workout} render={(p) => <Workout {...p} />} />
        <Route render={(p) => <HomePage {...p} />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
