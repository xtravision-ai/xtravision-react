import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AssessmentPage from "./pages/AssessmentPage";
import OnDemand from "./pages/OnDemand";
import "./styles.css";

const AppRoute = Object.freeze({
  Assessment: "/app/assessment",
  OnDemand: "/app/ondemand",
});

const HomePage = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <button
        className="button"
        onClick={() => {
          window.location.href = AppRoute.Assessment;
        }}
      >
        Assessment
      </button>
      <button
        className="button"
        onClick={() => {
          window.location.href = AppRoute.OnDemand;
        }}
      >
        On Demand
      </button>
    </div>
  );
};

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Assessment} render={() => <AssessmentPage />} />
        <Route path={AppRoute.OnDemand} render={() => <OnDemand />} />
        <Route render={() => <HomePage />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
