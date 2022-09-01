import "../styles.css";
import React from "react";
import { AppRoute } from "../Routes";

const HomePage = () => {
  return (
    <div className="homepage-root">
      <div className="homepage-button-container">
        <button
          className="button"
          id="assessment"
          onClick={() => {
            window.location.href = AppRoute.Assessment;
          }}
        >
          Assessment
        </button>
        <button
          id="on-demand"
          className="button"
          onClick={() => {
            window.location.href = AppRoute.OnDemand;
          }}
        >
          On Demand
        </button>
      </div>
    </div>
  );
};

export default HomePage;
