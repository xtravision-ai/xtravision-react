import { useRef, useState } from "react";
import {
  useXtraVisionAssessmentContext,
  XtraVisionAssessmentProvider,
} from "xtravision-react";

type AppContainerProps = {
  videoElementRef: any;
  assessmentName: string;
  setDisplayText: any;
  displayText: string;
};
const AppContainer = ({
  videoElementRef,
  assessmentName,
  displayText,
  setDisplayText,
}: AppContainerProps) => {
  const { lastJsonMessage, isCamOn, setIsCamOn } =
    useXtraVisionAssessmentContext();

  if (lastJsonMessage?.error) {
    console.log("lastJsonMessage: ", lastJsonMessage?.error);
  }
  else {
    console.log("lastJsonMessage: ", lastJsonMessage?.data);

    const additional_response = lastJsonMessage?.data?.additional_response;
    const assessment = lastJsonMessage?.data?.assessment;

    switch (assessment) {
      // add more cases as per the assessment 
      case 'GLUTE_BRIDGE':
      case 'PUSH_UPS':
      case 'JUMPING_SQUAT':
      case 'BURPEES':
      default:
        setDisplayText(`In-Pose: ${additional_response?.in_pose ?? 'false'} Reps-Count: ${additional_response?.reps?.total ?? 0} `);
    }

  }

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
      // turn camera on after vid ref has been set
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

    if (videoElementRef.current === null) return;
    videoElementRef.current.stream = null;
    videoElementRef.current.srcObject = null;
    setIsCamOn(false);
  };

  return (
    <div style={{ backgroundColor: "#D3D3D3", padding: "30px" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <button
          onClick={() => {
            startCamera();
          }}
          disabled={isCamOn}
        >
          START
        </button>
        <button
          onClick={() => {
            setIsCamOn(false);
            stopCamera();
          }}
          disabled={!isCamOn}
        >
          STOP
        </button>
      </div>

      <div>
        <div>Assessment: {assessmentName} </div>
        <div>{displayText}</div>
      </div>
    </div>
  );
};

const AssessmentPage = () => {
  const [displayText, setDisplayText] = useState() as any;

  const videoElementRef = useRef<any>(null);
  const isPreJoin = false;
  const assessment_name = "SQUATS"; // enter your assessment name here
  // const auth_token = process.env.REACT_APP_XTRA_AUTH_TOKEN ? process.env.REACT_APP_XTRA_AUTH_TOKEN : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkOTU1NTVkNS0wNmFhLTExZWQtOGJkYy0xMmZhYjRmZmFiZWQiLCJhcHBJZCI6IjY5YTdmMmU2LTA2YWEtMTFlZC04YmRjLTEyZmFiNGZmYWJlZCIsIm9yZ0lkIjoiNmQ5MWZlN2YtMDZhOS0xMWVkLThiZGMtMTJmYWI0ZmZhYmVkIiwiaWF0IjoxNjYwMTA3MjI0LCJleHAiOjE2OTE2NjQ4MjR9._i4MJbwPznHzxoStcRAcK7N7k_xGdUjvKwmHXv1zixM";
  const auth_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkOTU1NTVkNS0wNmFhLTExZWQtOGJkYy0xMmZhYjRmZmFiZWQiLCJhcHBJZCI6IjY5YTdmMmU2LTA2YWEtMTFlZC04YmRjLTEyZmFiNGZmYWJlZCIsIm9yZ0lkIjoiNmQ5MWZlN2YtMDZhOS0xMWVkLThiZGMtMTJmYWI0ZmZhYmVkIiwiaWF0IjoxNjYwMTA3MjI0LCJleHAiOjE2OTE2NjQ4MjR9._i4MJbwPznHzxoStcRAcK7N7k_xGdUjvKwmHXv1zixM'
  let assessment_config = {}
  let user_config = {}

  // adjust these as per time based assessment requirement 
  assessment_config = {
    reps_threshold: 5,
    grace_time_threshold: 20,
  }

  const connectionData = {
    assessment_name,
    auth_token,
    assessment_config,
    user_config,
    session_id: null
  }

  const requestData = {
    isPreJoin
  }

  return (
    <XtraVisionAssessmentProvider
      videoElementRef={videoElementRef}
      connectionData={connectionData}
      requestData={requestData}
    >
      <video ref={videoElementRef} style={{ border: "1px solid red", transform: 'rotateY(180deg)', }} />
      <AppContainer
        videoElementRef={videoElementRef}
        assessmentName={assessment_name}
        displayText={displayText}
        setDisplayText={setDisplayText}
      />
    </XtraVisionAssessmentProvider>


  );
};

export default AssessmentPage;
