import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AssessmentPage from "./pages/AssessmentPage";
import HomePage from "./pages/HomePage";
import OnDemand from "./pages/OnDemand";
import Workout from "./pages/Workout";

export const AppRoute = Object.freeze({
  HomePage: "/app/",
  Assessment: "/app/assessment",
  OnDemand: "/app/ondemand",
  Workout: "/app/workout",
});

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Assessment} render={() => <AssessmentPage />} />
        <Route path={AppRoute.OnDemand} render={() => <OnDemand />} />
        <Route path={AppRoute.Workout} render={(p) => <Workout {...p} />} />

        <Route render={(p) => <HomePage {...p} />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
