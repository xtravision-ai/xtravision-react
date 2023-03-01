import { makeStyles } from "@material-ui/core";
import React from "react";
import ArcMeter from "./ui/ArcMeter";

const useStyles = makeStyles((theme) => ({
  root: {},
  head: {
    width: "100%",
    justifyContent: "center",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "50px",
    lineHeight: "120%",
    letterSpacing: "-0.0368em",
    color: "#FBFBFB",
    padding: "20px",
  },
  body: {
    textAlign: "center",
    zIndex: 9999,
  },
  barPercent: {
    color: "#FBFBFB",
    fontSize: "20px",
    display: "flex",
    justifyContent: "flex-end",
    marginRight: "40px",
    marginTop: "-10px",
  },
  exerciseName: {
    width: "100%",
    justifyContent: "center",
    textAlign: "center",
    marginTop: "20%",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "90px",
    lineHeight: "120%",
    letterSpacing: "-0.0368em",
    color: "#FBFBFB",
    padding: "20px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "50px",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "40px",
    },
  },
}));

const Repetitions = ({ reps }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.head}>Reps</div>
      <div className={classes.body}>
        <ArcMeter reps={reps >= 10 ? 10 : reps} />
      </div>
      {/* <div className={classes.head}>Efficiency</div>
      <div className={classes.body}>
        <HorizontalBar />
        <div className={classes.barPercent}>100%</div>
      </div> */}
      {(!reps || reps < 10) && (
        <div className={classes.exerciseName}>Complete 10 Squats</div>
      )}
    </div>
  );
};

export default Repetitions;
