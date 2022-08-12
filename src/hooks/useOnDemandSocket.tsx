import { useCallback, useEffect, useRef, useState } from "react";
import { ClassCategory } from "../constants";
import { WS_URL } from "../provider/constants";
import useWebSocket from "react-use-websocket";
import _ from "lodash";

export default function useOnDemandSocket(
  category: ClassCategory,
  features: any,
  sessionId: string,
  authToken: string,
  isEduScreen: boolean,
  isTestRunning: boolean
) {
  const tempKeyPointsRef = useRef<any>({}); // hold KPs temporarily
  const tempKeySegMaskRef = useRef<any>({}); // hold Side Mask temporarily
  const [userEducation, setUserEducation] = useState<any>({
    message: "Let's find the right place for you!",
    type: "DEFAULT",
    isPassed: false,
  });

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(
    `${WS_URL}/v1/ondemand/${sessionId}/${category}?authToken=${authToken}&features=${features}`,
    {
      shouldReconnect: (e) => true, // will attempt to reconnect on all close events
    }
  );

  const resultsCallback = useCallback((landmarks, segmentationMask) => {
    console.log("landmarks: ", landmarks);
    if (!_.isEmpty(landmarks)) {
      tempKeyPointsRef.current[Date.now()] = { landmarks };
      tempKeySegMaskRef.current = segmentationMask;
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    const cleanUp = () => interval && clearInterval(interval);

    if (!isTestRunning) {
      cleanUp();
      return;
    }

    interval = setInterval(() => {
      const keyPoints = Object.assign(tempKeyPointsRef.current, {});
      console.log("keyPoints: ", keyPoints)

      // for only body posture test send segmentation mask
      let mask: any = null;
      // if (assessment === Assessment.BODY_POSTURE)
      //   mask = bitmapToBase64(Object.assign(tempKeySegMaskRef.current, {}));

      tempKeyPointsRef.current = {};
      tempKeySegMaskRef.current = {};

      if (!_.isEmpty(keyPoints)) {
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
  }, [isTestRunning, isEduScreen]);

  useEffect(() => {
    if (!lastJsonMessage) return;

    // for education only edu checks are returned
    if (isEduScreen) setUserEducation(lastJsonMessage);
  }, [lastJsonMessage]);

  return {
    onDemandResultsCallback: resultsCallback,
    onDemandLastJsonMessage: lastJsonMessage,
    onDemandUserEducation: userEducation,
  };
}
