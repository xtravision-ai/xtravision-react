import "./styles.css";
import React from "react";
import Routes from "./Routes";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      height: "100%",
      backgroundColor: "#17191F",
    },
  })
);

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Routes />
    </div>
  );
}

// eslint-disable-next-line no-undef
export default App;
