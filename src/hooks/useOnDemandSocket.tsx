// # 1. getOnDemandSessionId() => session_id
// # 2. /wss/ondemand/{session_id}/{category}
// # 3. getOnDemandStats(session_id) => statsData

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
    // `${WS_URL}/ondemand/${sessionId}/${category}?authToken=${authToken}&features=${features}`,
    `${WS_URL}/ondemand/b822b731-e8f5-4fd3-9e05-aa5db0736e70/Yoga?authToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjMwN2JkZi0yNjVmLTQxM2ItODU2ZC1mMDcyODVhMzc3NjkiLCJhcHBJZCI6Ijk1ZWFjZDQ1LTgyZjUtMTFlYy1hOWY1LWE0YmI2ZDZlZGM0ZSIsIm9yZ0lkIjoiZGQ4MzA1OWMtODJmMy0xMWVjLWE5ZjUtYTRiYjZkNmVkYzRlIiwiaWF0IjoxNjYwMDQzNzAxLCJleHAiOjE2OTE2MDEzMDF9.czzQWj22X6FY9wjTkWCDPvvDUgBWT-UgpjLfCKGxbRE
    &features=['YOGA_QUALITY','YOGA_SCORE', 'VORTEX']`,

    {
      shouldReconnect: (e) => true, // will attempt to reconnect on all close events
    }
  );

  const resultsCallback = useCallback((landmarks, segmentationMask) => {
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
