import React, { useEffect, useRef, useState } from "react";
import {
  useXtraVisionAssessmentContext,
  XtraVisionAssessmentProvider,
} from "xtravision-react";

type AppContainerProps = {
  videoElementRef: any;
  assessmentName: string;
};
const AppContainer = ({
  videoElementRef,
  assessmentName,
}: AppContainerProps) => {
  const { lastJsonMessage, isCamOn, setIsCamOn } =
    useXtraVisionAssessmentContext();

  if (lastJsonMessage?.error) {
    console.log("lastJsonMessage: ", lastJsonMessage?.error);
  } else console.log("lastJsonMessage: ", lastJsonMessage?.data);

  const assessment = lastJsonMessage?.data?.assessment;
  const repCount = lastJsonMessage?.data?.reps;

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
        <div>rep count: {repCount}</div>
      </div>
    </div>
  );
};

const AssessmentPage = () => {
  const videoElementRef = useRef<any>(null);
  const isEduScreen = false;
  const assessmentName = "BANDED_ALTERNATING_DIAGNOLS"; // enter your assessment name here
  const AUTH_TOKEN = "_AUTH_TOKEN_";

  return (
    <XtraVisionAssessmentProvider
      authToken={AUTH_TOKEN}
      videoElementRef={videoElementRef}
      isEduScreen={isEduScreen}
      assessmentName={assessmentName}
    >
      <video ref={videoElementRef} style={{ border: "1px solid red" }} />
      <AppContainer
        videoElementRef={videoElementRef}
        assessmentName={assessmentName}
      />
    </XtraVisionAssessmentProvider>
  );
};

export default AssessmentPage;
