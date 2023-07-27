import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import CallEndIcon from '@material-ui/icons/CallEnd';
import {
  useXtraVisionAssessmentContext,
  XtraVisionAssessmentProvider,
} from 'xtravision-react';
import { AppRoute } from '../Routes';
import Repetitions from './components/Repetitions';
import { Assessment } from '../common';
import RangeOfMotion from './components/RangeOfMotion';
import TimeUnderLoad from './components/TimeUnderLoad';

// Example of XtraVisionEventEmitter data
// import { XtraVisionEventEmitter } from 'xtravision-react';
// XtraVisionEventEmitter.on('onUserKeyPoints', (data: any) => {console.log('data.toString()');})

declare global {
  interface Window {
    stream?: any;
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    background: '#1E1E1E',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
  },
  left: {
    width: '70%',
    background: 'grey',
    borderRadius: '0px 40px 40px 0px',
  },
  right: {
    width: '30%',
    background: '#1E1E1E',
  },
  videoFrame: {
    position: 'absolute',
    zIndex: 1,
    marginRight: 'calc(100%/3)',
    width: 'calc(100%/2)',
    height: 'calc(100%/1.1)',
    left: 'calc(70%/8)',
    top: '5vh',
    opacity: '0.5',
    boxShadow:
      '0px 0px 41px #FFB44F, 0px 0px 17.8734px rgba(24, 255, 255, 0.22275), 0px 0px 6.6625px #FFB44F, 0px 0px 2.37031px rgba(24, 255, 255, 0.10725)',
    borderRadius: '8px',
  },
  leaveBtn: {
    right: '20px',
    top: '30px',
    position: 'absolute',
    fontSize: 'bold',
    cursor: 'pointer',
  },
  logoDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureCntr: {
    position: 'absolute',
    right: '5%',
    top: '15%',
    borderRadius: '10px',
    background: '#2C2F3A',
    boxShadow:
      '0px 0px 34px rgba(0, 0, 0, 0.26), 0px 0px 17.7344px rgba(0, 0, 0, 0.188032), 0px 0px 8.3232px rgba(0, 0, 0, 0.146016), 0px 0px 3.6448px rgba(0, 0, 0, 0.113984), 0px 0px 1.5776px rgba(0, 0, 0, 0.071968)',
    minHeight: '80vh', //'({ innerHeight }: any) => innerHeight - innerHeight / 3',
    width: ({ innerWidth }: any) => innerWidth - innerWidth / 1.4,
    zIndex: 999,
    display: 'flex',
    flexDirection: 'column',
  },
  vid: {
    height: '100%',
    objectFit: 'cover',
    width: '100%',
    transform: 'rotateY(180deg)',
    borderRadius: '40px 0px 0px 4px',
  },
  canvasVid: {
    height: '100vh', //({ innerHeight }: any) => innerHeight,
    width: '70%', // ({ innerWidth }: any) => innerWidth,
    transform: 'rotateY(180deg)',
    position: 'absolute',
    // objectFit: 'cover', //
    left: 0,
    top: 0,
    borderRadius: '40px 0px 0px 4px',
  },
  eduMsgCntr: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '50px',
    lineHeight: '120%',
    letterSpacing: '-0.0368em',
    color: '#FBFBFB',
    padding: '20px',
    height: '50%',
    [theme.breakpoints.down('md')]: {
      fontSize: '30px',
    },
  },
  prejoinCountContainer: {
    position: 'absolute',
    zIndex: 9,
    left: '40%',
    bottom: '40%',
    color: '#fff',
  },
  prejoinCount: {
    borderRadius: '50%',
    height: '300px',
    width: '300px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  prejoinCountTxt: {
    fontSize: '200px',
    fontWeight: 'bold',
  },
  actionButtons: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: '20px',
    paddingBottom: '20px',
    bottom: '0',
    right: '0',
    position: 'absolute',
  },
  bodyAnglesItm: {
    display: 'flex',
    flexDirection: 'column',
    padding: '5px 20px 5px 10px',
  },
  bodyAnglesTxt: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    fontSize: '20px',
    color: '#fff',
    marginBottom: '5px',
  },
  bodyAnglesVal: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  bodyAnglesSubVal: {
    display: 'flex',
    fontSize: '30px',
    gap: '10px',
  },
  bodyAnglesInfo: {
    marginTop: '-10px',
  },
  bodyAnglesContainer: {
    position: 'absolute',
    bottom: '75px',
    right: '25px',
    height: '650px',
    width: '380px',
    background: 'rgba(0, 0, 0, 0.4)',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '20px',
    fontFamily: 'CircularStd',
    border: '2px solid #fff',
  },
  correctiveFB: {
    background: '#2C2F3A',
    color: '#FBFBFB',
    fontWeight: 'bold',
    fontSize: '65px',
    lineHeight: '120%',
    zIndex: 999,
    position: 'absolute',
    bottom: '50px',
    left: '10px',
    padding: '0px 5px 0px 5px',
    maxWidth: '68%',
  },
  svgLine: {
    stroke: '#ffb44f',
    strokeWidth: '10px',
  },
  educationCircleContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: '15vh',
    height: 'inherit',
    transform: 'translateY(15vh)',
  },
  educationCircle: {
    position: 'absolute',
    background: '#FF823C',
    opacity: '0.1',
    justifyContent: 'center',
    borderRadius: '300px',
  },
  instructionMsgContainer: {
    background: '#2C2F3A',
    color: '#FBFBFB',
    fontWeight: 'bold',
    fontSize: '58px',
    lineHeight: '120%',
    zIndex: 999,
    position: 'absolute',
    bottom: '50px',
    left: '10px',
    padding: '0px 5px 0px 5px',
    maxWidth: '68%',
  },
}));

type AppContainerProps = {
  classes: any;
  history: any;
  videoElementRef: any;
  canvasElementRef: any;
  assessmentName: string;
};
const AppContainer = ({
  classes,
  history,
  videoElementRef,
  canvasElementRef,
  assessmentName,
}: AppContainerProps) => {
  //   const classes = useStyles();

  const { lastJsonMessage, isCamOn, setIsCamOn, isPreJoin, setIsPreJoin } =
    useXtraVisionAssessmentContext();

  if (lastJsonMessage?.error) {
    console.error('lastJsonMessage-error: ', lastJsonMessage.error);
  } else {
    console.log('lastJsonMessage: ', lastJsonMessage?.data);

    // const additional_response = lastJsonMessage?.data?.additional_response;
    // console.log(additional_response);
    // const assessment = lastJsonMessage?.data?.assessment;
  }

  useEffect(() => {
    getCam();
  }, []);

  useEffect(() => {
    if (lastJsonMessage?.isPassed) setTimeout(() => setIsPreJoin(false), 2000);

    if (lastJsonMessage?.data?.additional_response?.reps?.total === 10)
      history.push(AppRoute.HomePage);
  }, [lastJsonMessage]);

  const onCancel = () => {
    stopCam();
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

  return (
    <div className={classes.root}>
      <div className={classes.left}>
        {isPreJoin && (
          <>
            <div
              style={{
                position: 'absolute',
                height: 'calc(100%/1.1)',
                left: 'calc(70%/8)',
                top: '5%',
                width: 'calc(100%/2)',
                zIndex: 999,
              }}
            >
              <svg
                width="100%"
                height={`calc(100%)`}
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="calc(100% - 75%)"
                  className={classes.svgLine}
                />
                <line
                  x1="0"
                  x2="calc(100% - 85%)"
                  y1="0"
                  y2="0"
                  className={classes.svgLine}
                />

                <line
                  x1="calc(100%)"
                  x2="calc(100%)"
                  y1="0"
                  y2="calc(100% - 75%)"
                  className={classes.svgLine}
                  style={{ strokeWidth: '10px' }}
                />
                <line
                  x1="calc(100%)"
                  x2="calc(100% - 15%)"
                  y1="0"
                  y2="0"
                  className={classes.svgLine}
                />

                <line
                  x1="0"
                  x2="calc(100% - 85%)"
                  y1="calc(100%)"
                  y2="calc(100%)"
                  className={classes.svgLine}
                />
                <line
                  x1="0"
                  x2="0"
                  y1="calc(100%)"
                  y2="calc(100% - 25%)"
                  className={classes.svgLine}
                />

                <line
                  x1="calc(100%)"
                  x2="calc(100% - 15%)"
                  y1="calc(100%)"
                  y2="calc(100%)"
                  className={classes.svgLine}
                />
                <line
                  x1="calc(100%)"
                  x2="calc(100%)"
                  y1="calc(100%)"
                  y2="calc(100% - 25%)"
                  className={classes.svgLine}
                  style={{ strokeWidth: '10px' }}
                />
              </svg>
            </div>
            <div
              className={classes.videoFrame}
              style={{
                background: !lastJsonMessage?.isPassed
                  ? 'linear-gradient(156.43deg, rgba(255, 180, 79, 0.21) 0%, rgba(255, 60, 71, 0.65) 100%)'
                  : 'linear-gradient(156.43deg, rgba(24, 255, 255, 0.22275) 0%, #00B8D4 100%)',
              }}
            ></div>
          </>
        )}

        <video ref={videoElementRef} className={classes.vid}></video>
        <canvas ref={canvasElementRef} className={classes.canvasVid}></canvas>
      </div>
      <div className={classes.right}>
        <div className={classes.logoDiv}>
          <img
            src={`/assets/logo-new.svg`}
            alt="logo"
            width="150px"
            style={{ marginLeft: '15px', padding: '30px' }}
          />
        </div>

        <CallEndIcon
          onClick={onCancel}
          className={classes.leaveBtn}
          fontSize="large"
          color="secondary"
          style={{ color: 'red' }}
        />
      </div>
      <div className={classes.featureCntr}>
        {isPreJoin ? (
          <>
            <div className={classes.eduMsgCntr}>{lastJsonMessage?.message}</div>
            <div className={classes.educationCircleContainer}>
              <div
                className={classes.educationCircle}
                style={{
                  width: 'calc(100vw/7.5)',
                  height: 'calc(100vw/7.5)',
                }}
              ></div>
              <div
                className={classes.educationCircle}
                style={{
                  width: 'calc(100vw/9.5)',
                  height: 'calc(100vw/9.5)',
                }}
              ></div>
              <div
                className={classes.educationCircle}
                style={{
                  width: 'calc(100vw/13.5)',
                  height: 'calc(100vw/13.5)',
                }}
              ></div>
            </div>
            <Box className={classes.actionButtons}>
              <Button
                color="primary"
                onClick={() => setIsPreJoin(false)}
                variant="outlined"
              >
                <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>
                  Skip Education
                </Typography>
              </Button>
            </Box>
          </>
        ) : assessmentName === Assessment.SQUATS ? (
          <Repetitions
            reps={lastJsonMessage?.data?.additional_response?.reps?.total ?? 0}
          />
        ) : assessmentName === Assessment.RANGE_OF_MOTION ? (
          <RangeOfMotion angles={lastJsonMessage?.data?.angles ?? {}} />
        ) : assessmentName === Assessment.SIDE_FLAMINGO ? (
          <TimeUnderLoad
            timeLeft={
              60 - (lastJsonMessage?.data?.additional_response?.seconds ?? 0)
            }
            restTimeLeft={0}
            prediction={'prediction'}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const Workout = ({ history }) => {
  const { innerHeight, innerWidth } = window;
  const classes = useStyles({ innerHeight, innerWidth });

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const isPreJoin = true;
  const assessment_name = history?.location?.state?.assessment_name ?? 'SQUATS'; // enter your assessment name here
  const auth_token = process.env.REACT_APP_XTRA_AUTH_TOKEN
    ? process.env.REACT_APP_XTRA_AUTH_TOKEN
    : '__AUTH_TOKEN__';
  let assessment_config = {};
  let user_config = {};
  const selectedOption = history?.location?.state?.selectedOption ?? {
    serverEnpoint: "production"
  }
  let libData = selectedOption;

  const [frameSize, setFrameSize] = useState({
    height: 480,
    width: 640,
  });

  useEffect(() => {
    const handleReSize = () => {
      setFrameSize({
        height: window.innerHeight,
        // the width of the vid element is set to 70% so matching that
        width: Number((window.innerWidth * 0.7).toFixed(2)),
      })
    }
    window.addEventListener('resize', handleReSize)
    handleReSize();
    return () => window.removeEventListener('resize', handleReSize)
  }, [])

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
      frameSize={frameSize}
      libData={libData}
    >
      <AppContainer
        classes={classes}
        history={history}
        videoElementRef={videoRef}
        canvasElementRef={canvasRef}
        assessmentName={assessment_name}
      />
    </XtraVisionAssessmentProvider>
  );
};

export default Workout;
