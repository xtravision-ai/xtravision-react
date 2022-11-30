import React, { useRef, useState } from "react";
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
  } else console.log("lastJsonMessage: ", lastJsonMessage?.data);

  const additional_response = lastJsonMessage?.data?.additional_response;
  const assessment = lastJsonMessage?.data?.assessment;

  switch (assessment) {
    // add more cases as per the assessment 
    case 'GLUTE_BRIDGE':
      setDisplayText(`in Pose: ${additional_response?.in_pose}; Reps:${additional_response?.reps?.total}`);
      break;
    case 'PUSH_UPS':
      setDisplayText(`Reps: ${lastJsonMessage?.data?.reps} `);
      break;
    default:
      setDisplayText(`Reps: ${lastJsonMessage?.data?.reps ?? 0} `);
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
        <div>assessment: {assessmentName} </div>
        <div>{displayText}</div>
      </div>
    </div>
  );
};

const AssessmentPage = () => {
  const [displayText, setDisplayText] = useState() as any;

  const videoElementRef = useRef<any>(null);
  const isPreJoin = false;
  const assessment_name = "GLUTE_BRIDGE"; // enter your assessment name here
  const auth_token = "_AUTH_TOKEN_";
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
    user_config
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
      <video ref={videoElementRef} style={{ border: "1px solid red" }} />
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
