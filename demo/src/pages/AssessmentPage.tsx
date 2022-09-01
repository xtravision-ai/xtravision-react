import React, { useRef, useState } from "react";
import {
  Assessment,
  useXtraVisionAssessmentContext,
  XtraVisionAssessmentProvider,
} from "xtravision-react";

const assessmentList = [
  "BANDED_ALTERNATING_DIAGNOLS",
  "BANDED_BOW_AND_ARROW",
  "BANDED_EXTERNAL_ROTATION",
  "BANDED_T",
  "DOUBLE_LEG_KNEE_HUGS",
  "GLUTE_BRIDGE",
  "HALF_SQUAT",
  "OVERHEAD_STRETCH",
  "QUADS_STRETCH",
  "SHOULDER_SCAPTION",
  "SINGLE_LEG_KNEE_HUGS",
];

type AppContainerProps = {
  videoElementRef: any;
  assessmentName: string;
  setAssessmentName: any;
  authToken: string;
  setAuthToken: any;
};
const AppContainer = ({
  videoElementRef,
  assessmentName,
  setAssessmentName,
  authToken,
  setAuthToken,
}: AppContainerProps) => {
  const { lastJsonMessage, isCamOn, setIsCamOn } =
    useXtraVisionAssessmentContext();

  if (lastJsonMessage?.error) {
    console.log("lastJsonMessage: ", lastJsonMessage?.error);
  } else console.log("lastJsonMessage: ", lastJsonMessage?.data);

  const assessment = lastJsonMessage?.assessment;
  const repCount = lastJsonMessage?.rep_count;

  const startCamera = async () => {
    try {
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
      <div
        style={{ display: "flex", flexDirection: "column", maxWidth: "300px" }}
      >
        <label>select your assessment: </label>
        <select
          value={assessmentName}
          onChange={(e) => setAssessmentName(e.target.value)}
        >
          {assessmentList.map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <br />
        <label>Enter your Auth Token: </label>
        <input
          type="text"
          id="authToken"
          name="authToken"
          onChange={(e) => setAuthToken(e.target.value)}
        />
        <br />
      </div>
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

      {isCamOn && (
        <div>
          <div>assessment: {assessment ?? ""} </div>
          <div>rep count: {repCount}</div>
        </div>
      )}
    </div>
  );
};

const AssessmentPage = () => {
  const videoElementRef = useRef<any>(null);
  const isEduScreen = false;
  const [assessmentName, setAssessmentName] = useState("");
  const [authToken, setAuthToken] = useState("");

  return (
    <XtraVisionAssessmentProvider
      authToken={authToken}
      videoElementRef={videoElementRef}
      isEduScreen={isEduScreen}
      assessmentName={assessmentName}
    >
      <video ref={videoElementRef} style={{ border: "1px solid red" }} />
      <AppContainer
        videoElementRef={videoElementRef}
        assessmentName={assessmentName}
        setAssessmentName={setAssessmentName}
        authToken={authToken}
        setAuthToken={setAuthToken}
      />
    </XtraVisionAssessmentProvider>
  );
};

export default AssessmentPage;
