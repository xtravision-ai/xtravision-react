import _ from "lodash";
import { Camera } from "@mediapipe/camera_utils";
import { Pose } from "@mediapipe/pose";
import { useCallback, useEffect, useRef } from "react";

declare global {
  interface Window {
    stream?: any;
  }
}

export default function usePoseClassification(
  videoEleRef: any,
  canvasEleRef: any,
  isCamOn: boolean,
  sendJsonMessage: (msg: any) => void,
  isEduScreen?: boolean
) {
  let pose: any;
  const medpipeURL =
    process.env.REACT_APP_MEDIAPIPE_CLOUDFRONT_URL ??
    `https://cdn.jsdelivr.net/npm/@mediapipe/pose`;
  const poseOptions = {
    modelComplexity: 2,
    smoothLandmarks: true,
    enableSegmentation: true,
    smoothSegmentation: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.2,
  };
  const tempKeyPointsRef = useRef<any>({}); // hold KPs temporarily

  // init Pose obj
  useEffect(() => {
    if (pose) return;

    pose = new Pose({
      locateFile: (file) => {
        return `${medpipeURL}/${file}`;
      },
    });

    pose.setOptions(poseOptions);
    pose.onResults(resultsCallback);
  }, []);

  const startPoseModel = useCallback(() => {
    if (videoEleRef.current && pose) {
      const camera = new Camera(videoEleRef.current, {
        onFrame: async () => {
          await pose?.send({ image: videoEleRef.current });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  }, [pose]);

  const stopCam = () => {
    window?.stream?.getTracks()?.forEach((track: any) => track.stop());

    if (videoEleRef.current === null) return;
    const stream = videoEleRef.current.srcObject as MediaStream;
    stream?.getTracks()?.forEach((track) => track.stop());
    videoEleRef.current.srcObject = null;
  };

  // mediapipe response fps
  const resultsCallback = useCallback((results) => {
    const landmarks = results.poseLandmarks ?? {};
    tempKeyPointsRef.current[Date.now()] = { landmarks };
  }, []);

  // start/stop pose model on `isCamOn`
  useEffect(() => {
    if (isCamOn) startPoseModel();
    else stopCam();

    return () => {
      stopCam();
    };
  }, [isCamOn, videoEleRef, resultsCallback]);

  // send KPs to WSS
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    const cleanUp = () => interval && clearInterval(interval);

    if (!isCamOn) {
      cleanUp();
      return;
    }

    interval = setInterval(() => {
      const keyPoints = Object.assign(tempKeyPointsRef.current, {});
      tempKeyPointsRef.current = {};
      if (!_.isEmpty(keyPoints) && !_.isUndefined(isEduScreen)) {
        // WS SEND Kps -> 1s
        sendJsonMessage({
          timestamp: Date.now(),
          user_keypoints: keyPoints,
          isprejoin: isEduScreen,
        });
      }
    }, 1000);

    return () => {
      cleanUp();
    };
  }, [isCamOn, sendJsonMessage]);

  return {};
}
