import React from "react";
import { AppRoute } from "../Routes";
import { makeStyles, Theme, Box } from "@material-ui/core";
import { Features } from "../common";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    height: "100%",
    width: "100%",
    flexDirection: "column",
    overflowX: "hidden",
  },

  PageheaderContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "calc(100vh/15)",
    height: "fit-content",
  },

  mainText: {
    textTransform: "uppercase",
    fontFamily: "Fjalla One",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "48px",
    lineHeight: "120%",
    letterSpacing: "-0.0368em",
    color: "#FBFBFB",
    margin: "20px 30px",
  },
  headerlogo: {
    margin: "20px 30px",
  },
  dashBoardContainer: {
    display: "flex",
    flexDirection: "row",
    margin: "calc(100vh/15)",
    height: "fit-content",
    alignSelf: "center",
  },

  dashBoardLeft: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    marginRight: "calc(100vw/30)",
    marginLeft: "calc(100vw/20)",
  },
  styleMeter: {
    width: "500px",
    height: "250px",
    background: "#2c2f3a33",
    borderRadius: "8px",
    boxShadow:
      "0px 0px 34px rgba(0, 0, 0, 0.26), 0px 0px 17.7344px rgba(0, 0, 0, 0.188032), 0px 0px 8.3232px rgba(0, 0, 0, 0.146016), 0px 0px 3.6448px rgba(0, 0, 0, 0.113984), 0px 0px 1.5776px rgba(0, 0, 0, 0.071968)",
    "& div": {
      margin: "20px",
      color: "#FBFBFB",
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: 700,
      lineHeight: "120%",
      letterSpacing: "-0.0368em",
      fontSize: "30px",
    },
  },
  lastExerciseBox: {
    width: "500px",
    height: "200px",
    marginTop: "20px",
    borderRadius: "8px",
    border: "1px solid",
    borderColor: "#1DE9B6 #00B0FF #00B8D4 #18FFFF",
    flexDirection: "column",
    justifyContent: "space-between",
    display: "flex",
    backgroundImage: `url('/Xtra Cards/card.png')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },

  dashBoardRight: {
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    marginLeft: "calc(100vw/30)",
  },
  scoreBox: {
    width: "500px",
    height: "fit-content",
    background: "#2c2f3a33",
    borderRadius: "8px",
    boxShadow:
      "0px 0px 41px rgba(24, 255, 255, 0.33), 0px 0px 17.8734px rgba(24, 255, 255, 0.22275), 0px 0px 6.6625px rgba(24, 255, 255, 0.165), 0px 0px 2.37031px rgba(24, 255, 255, 0.10725)",
  },
  startExerciseButton: {
    marginLeft: "20px",
    marginBottom: "10vh",
    alignSelf: "center",
    transform: "translateY(40%)",
    letterSpacing: "0.0068em",
    fontSize: "16px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "0px",
    width: "250px",
    height: "48px",
    borderRadius: "8px",
    flex: "none",
    order: 1,
    flexGrow: 0,
    border: "1px solid",
    color: "#090909",
    background: "linear-gradient(91.77deg, #00B0FF 29.69%, #18FFFF 100%)",

    boxShadow:
      "0px 0px 34px rgba(0, 0, 0, 0.26), 0px 0px 17.7344px rgba(0, 0, 0, 0.188032), 0px 0px 8.3232px rgba(0, 0, 0, 0.146016), 0px 0px 3.6448px rgba(0, 0, 0, 0.113984), 0px 0px 1.5776px rgba(0, 0, 0, 0.071968)",
    "&:hover": {
      cursor: "pointer",
      background: "linear-gradient(91.77deg, #18FFFF 29.69%, #18FFFF 100%)",
    },
  },
  startExerciseInitialButton: {
    letterSpacing: "0.0068em",
    fontSize: "16px",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0px",
    width: "250px",
    height: "48px",
    borderRadius: "8px",
    border: "1px solid",
    color: "#090909",
    background: "linear-gradient(91.77deg, #00B0FF 29.69%, #18FFFF 100%)",
    marginTop: "50px",

    boxShadow:
      "0px 0px 34px rgba(0, 0, 0, 0.26), 0px 0px 17.7344px rgba(0, 0, 0, 0.188032), 0px 0px 8.3232px rgba(0, 0, 0, 0.146016), 0px 0px 3.6448px rgba(0, 0, 0, 0.113984), 0px 0px 1.5776px rgba(0, 0, 0, 0.071968)",
    "&:hover": {
      cursor: "pointer",
      background: "linear-gradient(91.77deg, #18FFFF 29.69%, #18FFFF 100%)",
    },
  },
  scoreBoxHeading: {
    fontSize: "20px",
    fontFamily: "Inter",
    color: "#FBFBFB",
    fontWeight: 600,
  },
  scoreBoxValue: {
    fontSize: "45px",
    fontFamily: "Fjalla One",
    color: "#FBFBFB",
    fontWeight: 600,
  },
  cardContainer: {
    // marginTop: '10px',
    height: "400px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    padding: "24px",
    gap: "20px",
    position: "relative",
    width: "280px",
    marginLeft: "30px",
    marginBottom: "30px",
    borderRadius: "8px",
    border: "1px solid",
    borderColor: "#17191F",
    boxShadow:
      "0px 0px 41px rgba(24, 255, 255, 0.33), 0px 0px 17.8734px rgba(24, 255, 255, 0.22275), 0px 0px 6.6625px rgba(24, 255, 255, 0.165), 0px 0px 2.37031px rgba(24, 255, 255, 0.10725)",
    color: "#FBFBFB",
    "&:hover": {
      borderColor: "#1DE9B6 #00B0FF #00B8D4 #18FFFF",
      border: "2px solid",
      padding: "1vw",
    },
  },
  cardHeader: {
    marginLeft: "auto",
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "32px",
    lineHeight: "135%",
    [theme.breakpoints.down("md")]: {
      fontSize: "20px",
    },
  },
  cardButton: {
    letterSpacing: "0.0068em",
    fontSize: "16px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "0px",
    width: "233px",
    height: "48px",
    borderRadius: "8px",
    flex: "none",
    order: 1,
    flexGrow: 0,
    border: "1px solid",
    borderColor: "#1DE9B6 #00B0FF #00B8D4 #18FFFF",
    "&:hover": {
      cursor: "pointer",
      border: "2px solid transparent",
      background: "linear-gradient(91.77deg, #18FFFF 29.69%, #18FFFF 100%)",
      color: "#17191F",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "14px",
    },
  },

  menuContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  cardInfo: {
    // marginTop: '28%',
    height: "81%",
  },
  menuOption: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "32px",
    lineHeight: "135%",

    [theme.breakpoints.down("md")]: {
      fontSize: "24px",
    },
  },
  menuDescription: {
    letterSpacing: "-0.016em",
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "18px",
    lineHeight: "135%",
    height: "70px",
    [theme.breakpoints.down("md")]: {
      fontSize: "14px",
    },
  },
  requestInfo: {
    height: "fit-content",
    width: "370px",
    padding: theme.spacing(3),
    borderRadius: "10px",
    backgroundColor: "white",
    marginTop: "20px",
    boxShadow:
      "0px 0px 41px rgba(24, 255, 255, 0.33), 0px 0px 17.8734px rgba(24, 255, 255, 0.22275), 0px 0px 6.6625px rgba(24, 255, 255, 0.165), 0px 0px 2.37031px rgba(24, 255, 255, 0.10725)",
  },
  requestInfoTxt: {
    fontSize: "18px",
    fontWeight: "bold",
    lineHeight: "120%",
    marginBottom: "25px",
  },
  requestInfoSubtxt: {
    fontSize: "16px",
    lineHeight: "20px",
    marginBottom: "30px",
  },
  chatWithUsBtn: {
    borderRadius: "10px",
    fontSize: "16px",
    lineHeight: "20px",
    color: "#256993",
    border: `1px solid ${"#256993"}`,
    padding: "10px 20px",
    textAlign: "center",
    width: "100%",

    "&:hover": {
      backgroundColor: "#256993",
      color: "#fff",
      cursor: "pointer",
    },
  },
}));

const Dashboard = ({ history }) => {
  const classes = useStyles();

  const lastExMenu = {
    header: "",
    menuOption: `Repetitions`,
    description: "Do 10 squats to see the stats",
    feature: Features.REPETITIONS,
    backgroundImage: `url('/Xtra Cards/strength.jpg')`,
  };

  return (
    <Box className={classes.dashBoardContainer}>
      <div style={{ fontSize: "50px", fontWeight: "bold", color: "#FBFBFB" }}>
        Welcome to XTRA demo, try the reps feature to get started!
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "30px",
            justifyContent: "space-between",
          }}
        >
          <div
            className={classes.cardContainer}
            style={{
              backgroundImage: lastExMenu.backgroundImage,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div className={classes.cardInfo}>
              <div className={classes.menuOption}> {lastExMenu.menuOption}</div>
              {/* <div className={classes.menuDescription}>{lastExMenu.description}</div> */}
            </div>

            <div
              className={classes.cardButton}
              onClick={(e) => {
                e.preventDefault();

                history.push(AppRoute.Workout, {
                  feature: lastExMenu.feature,
                });
              }}
            >
              Try Workout
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

const HomePage = ({ history }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Dashboard history={history} />
    </Box>

    // old - Assessment | OnDemand
    // <div className="homepage-root">
    //   <div className="homepage-button-container">
    //     <button
    //       className="button"
    //       id="assessment"
    //       onClick={() => {
    //         window.location.href = AppRoute.Assessment;
    //       }}
    //     >
    //       Assessment
    //     </button>
    //     <button
    //       id="on-demand"
    //       className="button"
    //       onClick={() => {
    //         window.location.href = AppRoute.OnDemand;
    //       }}
    //     >
    //       On Demand
    //     </button>
    //   </div>
    // </div>
  );
};

export default HomePage;
