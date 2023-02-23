import React, { useEffect, useRef, useState } from "react";
import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import CallEndIcon from "@material-ui/icons/CallEnd";
import {
  useXtraVisionAssessmentContext,
  XtraVisionAssessmentProvider,
} from "xtravision-react";
import { AppRoute } from "../Routes";

declare global {
  interface Window {
    stream?: any;
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    background: "#1E1E1E",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
  },
  left: {
    width: "70%",
    background: "grey",
    borderRadius: "0px 40px 40px 0px",
  },
  right: {
    width: "30%",
    background: "#1E1E1E",
  },
  videoFrame: {
    position: "absolute",
    zIndex: 1,
    marginRight: "calc(100%/3)",
    width: "calc(100%/2)",
    height: "calc(100%/1.1)",
    left: "calc(70%/8)",
    top: "5vh",
    opacity: "0.5",
    boxShadow:
      "0px 0px 41px #FFB44F, 0px 0px 17.8734px rgba(24, 255, 255, 0.22275), 0px 0px 6.6625px #FFB44F, 0px 0px 2.37031px rgba(24, 255, 255, 0.10725)",
    borderRadius: "8px",
  },
  leaveBtn: {
    right: "20px",
    top: "30px",
    position: "absolute",
    fontSize: "bold",
    cursor: "pointer",
  },
  logoDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  featureCntr: {
    position: "absolute",
    right: "5%",
    top: "15%",
    borderRadius: "10px",
    background: "#2C2F3A",
    boxShadow:
      "0px 0px 34px rgba(0, 0, 0, 0.26), 0px 0px 17.7344px rgba(0, 0, 0, 0.188032), 0px 0px 8.3232px rgba(0, 0, 0, 0.146016), 0px 0px 3.6448px rgba(0, 0, 0, 0.113984), 0px 0px 1.5776px rgba(0, 0, 0, 0.071968)",
    minHeight: "80vh", //'({ innerHeight }: any) => innerHeight - innerHeight / 3',
    width: ({ innerWidth }: any) => innerWidth - innerWidth / 1.4,
    zIndex: 999,
    display: "flex",
    flexDirection: "column",
  },
  vid: {
    height: "100%",
    objectFit: "cover",
    width: "100%",
    transform: "rotateY(180deg)",
    borderRadius: "40px 0px 0px 4px",
  },
  canvasVid: {
    height: "100vh", //({ innerHeight }: any) => innerHeight,
    width: "70%", // ({ innerWidth }: any) => innerWidth,
    transform: "rotateY(180deg)",
    position: "absolute",
    // objectFit: 'cover', //
    left: 0,
    top: 0,
    borderRadius: "40px 0px 0px 4px",
  },
  eduMsgCntr: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "50px",
    lineHeight: "120%",
    letterSpacing: "-0.0368em",
    color: "#FBFBFB",
    padding: "20px",
    height: "50%",
    [theme.breakpoints.down("md")]: {
      fontSize: "30px",
    },
  },
  prejoinCountContainer: {
    position: "absolute",
    zIndex: 9,
    left: "40%",
    bottom: "40%",
    color: "#fff",
  },
  prejoinCount: {
    borderRadius: "50%",
    height: "300px",
    width: "300px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  prejoinCountTxt: {
    fontSize: "200px",
    fontWeight: "bold",
  },
  actionButtons: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: "20px",
    paddingBottom: "20px",
    bottom: "0",
    right: "0",
    position: "absolute",
  },
  bodyAnglesItm: {
    display: "flex",
    flexDirection: "column",
    padding: "5px 20px 5px 10px",
  },
  bodyAnglesTxt: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    fontSize: "20px",
    color: "#fff",
    marginBottom: "5px",
  },
  bodyAnglesVal: {
    display: "flex",
    justifyContent: "space-between",
  },
  bodyAnglesSubVal: {
    display: "flex",
    fontSize: "30px",
    gap: "10px",
  },
  bodyAnglesInfo: {
    marginTop: "-10px",
  },
  bodyAnglesContainer: {
    position: "absolute",
    bottom: "75px",
    right: "25px",
    height: "650px",
    width: "380px",
    background: "rgba(0, 0, 0, 0.4)",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    borderRadius: "20px",
    fontFamily: "CircularStd",
    border: "2px solid #fff",
  },
  correctiveFB: {
    background: "#2C2F3A",
    color: "#FBFBFB",
    fontWeight: "bold",
    fontSize: "65px",
    lineHeight: "120%",
    zIndex: 999,
    position: "absolute",
    bottom: "50px",
    left: "10px",
    padding: "0px 5px 0px 5px",
    maxWidth: "68%",
  },
  svgLine: {
    stroke: "#ffb44f",
    strokeWidth: "10px",
  },
  educationCircleContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // marginTop: '15vh',
    height: "inherit",
    transform: "translateY(15vh)",
  },
  educationCircle: {
    position: "absolute",
    background: "#FF823C",
    opacity: "0.1",
    justifyContent: "center",
    borderRadius: "300px",
  },
  instructionMsgContainer: {
    background: "#2C2F3A",
    color: "#FBFBFB",
    fontWeight: "bold",
    fontSize: "58px",
    lineHeight: "120%",
    zIndex: 999,
    position: "absolute",
    bottom: "50px",
    left: "10px",
    padding: "0px 5px 0px 5px",
    maxWidth: "68%",
  },
}));

type AppContainerProps = {
  classes: any;
  history: any;
  videoElementRef: any;
  canvasElementRef: any;
  assessmentName: string;
  //   setDisplayText: any;
  //   displayText: string;
};
const AppContainer = ({
  classes,
  history,
  videoElementRef,
  canvasElementRef,
  assessmentName,
}: //   displayText,
//   setDisplayText,
AppContainerProps) => {
  //   const classes = useStyles();

  const { lastJsonMessage, isCamOn, setIsCamOn } =
    useXtraVisionAssessmentContext();

  if (lastJsonMessage?.error) {
    // console.log("lastJsonMessage: ", lastJsonMessage?.error);
  } else {
    // console.log("lastJsonMessage: ", lastJsonMessage?.data);

    const additional_response = lastJsonMessage?.data?.additional_response;
    const assessment = lastJsonMessage?.data?.assessment;

    switch (assessment) {
      // add more cases as per the assessment
      case "GLUTE_BRIDGE":
      case "PUSH_UPS":
      case "JUMPING_SQUAT":
      case "BURPEES":
      default:
      // setDisplayText(
      //   `In-Pose: ${additional_response?.in_pose ?? "false"} Reps-Count: ${
      //     additional_response?.reps?.total ?? 0
      //   } `
      // );
    }
  }

  useEffect(() => {
    getCam();

    // if (!videoFileName) setVideoFileName(nanoid()); //generate video filename

    return () => {
      //   aiResRef.current = {};
    };
  }, []);

  const onCancel = () => {
    // if (classEnded) return;

    // setPlaySound(CUE.TEST_ENDED);

    // stopRecording();
    stopCam();

    // // setClassEnded(true);
    // clearCanvas();

    // aiResRef.current = results;

    // setIsTestLoading(true);
    setTimeout(() => history?.push(AppRoute.HomePage), 500);
    // setIsShowResDialog(true);
  };

  const getCam = () => {
    navigator?.mediaDevices
      ?.getUserMedia({
        video: {},
      })
      .then((stream) => {
        const video = videoElementRef.current;
        if (video) {
          if (!video.srcObject) {
            window.stream = stream;
            video.srcObject = stream;
            video?.play();

            setIsCamOn(true);
          }
        }
      })
      .catch((err) => {
        console.error(`Can't connect to webcam:`, err);
        setIsCamOn(false);
      });
  };

  const stopCam = () => {
    window?.stream?.getTracks()?.forEach((track) => track.stop());

    if (videoElementRef.current === null) return;
    const stream = videoElementRef.current.srcObject as MediaStream;
    stream?.getTracks()?.forEach((track) => track.stop());
    videoElementRef.current.srcObject = null;
  };

  const startCamera = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      const deviceInfos = await navigator.mediaDevices.enumerateDevices();
      let defaultCamId;

      for (let i = 0; i !== deviceInfos.length; ++i) {
        const deviceInfo = deviceInfos[i];
        if (deviceInfo.kind === "videoinput") {
          defaultCamId = deviceInfo.deviceId;
          break;
        }
      }

      if (!defaultCamId) return;

      const constraints = {
        video: {
          deviceId: { exact: defaultCamId },
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoElementRef.current.stream = stream;
      videoElementRef.current.srcObject = stream;
      videoElementRef.current.play();
      setIsCamOn(true);
    } catch (err) {
      console.log(err);
      setIsCamOn(false);
    }
  };

  const stopCamera = () => {
    var stream = videoElementRef.current.srcObject;
    var tracks = stream.getTracks();

    for (var i = 0; i < tracks.length; i++) {
      var track = tracks[i];
      track.stop();
    }

    videoElementRef.current.srcObject = null;
  };

  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <video
          ref={videoElementRef}
          className={classes.vid} /* style={{ border: "1px solid red" }} */
        />
        <canvas ref={canvasElementRef} className={classes.canvasVid}></canvas>
      </div>
      <div className={classes.right}>
        <div className={classes.logoDiv}>
          <img
            src={`/assets/logo-new.svg`}
            alt="logo"
            width="150px"
            style={{ marginLeft: "15px", padding: "30px" }}
          />
        </div>

        <CallEndIcon
          onClick={onCancel}
          className={classes.leaveBtn}
          fontSize="large"
          color="secondary"
          style={{ color: "red" }}
        />
      </div>
      <div className={classes.featureCntr}></div>
    </div>
    // <div style={{ backgroundColor: "#D3D3D3", padding: "30px" }}>
    //   <div style={{ display: "flex", flexDirection: "row" }}>
    //     <button
    //       onClick={() => {
    //         startCamera();
    //       }}
    //       disabled={isCamOn}
    //     >
    //       START
    //     </button>
    //     <button
    //       onClick={() => {
    //         setIsCamOn(false);
    //         stopCamera();
    //       }}
    //       disabled={!isCamOn}
    //     >
    //       STOP
    //     </button>
    //   </div>

    //   <div>
    //     <div>Assessment: {assessmentName} </div>
    //     <div>{displayText}</div>
    //   </div>
    // </div>
  );
};

const Workout = ({ history }) => {
  const feature = history?.location?.state?.feature;

  const { innerHeight, innerWidth } = window;
  const classes = useStyles({ innerHeight, innerWidth });

  //   console.log("feature > ", feature);

  //   const [displayText, setDisplayText] = useState() as any;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const isPreJoin = false;
  const assessment_name = "SQUATS"; // enter your assessment name here
  const auth_token = process.env.REACT_APP_XTRA_AUTH_TOKEN
    ? process.env.REACT_APP_XTRA_AUTH_TOKEN
    : "__AUTH_TOKEN__";
  let assessment_config = {};
  let user_config = {};

  // adjust these as per time based assessment requirement
  assessment_config = {
    // reps_threshold: 5,
    // grace_time_threshold: 20,
  };

  const connectionData = {
    assessment_name,
    auth_token,
    assessment_config,
    user_config,
    session_id: null,
  };

  const requestData = {
    isPreJoin,
  };

  return (
    <XtraVisionAssessmentProvider
      videoElementRef={videoRef}
      canvasElementRef={canvasRef}
      connectionData={connectionData}
      requestData={requestData}
    >
      <AppContainer
        classes={classes}
        history={history}
        videoElementRef={videoRef}
        canvasElementRef={canvasRef}
        assessmentName={assessment_name}
        //   displayText={displayText}
        //   setDisplayText={setDisplayText}
      />
    </XtraVisionAssessmentProvider>
  );
};

export default Workout;
