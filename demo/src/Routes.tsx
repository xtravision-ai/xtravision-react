import { BrowserRouter, Route, Switch } from "react-router-dom";
import AssessmentPage from "./pages/AssessmentPage";
import HomePage from "./pages/HomePage";
import OnDemand from "./pages/OnDemand";

export const AppRoute = Object.freeze({
  Assessment: "/app/assessment",
  OnDemand: "/app/ondemand",
});

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
