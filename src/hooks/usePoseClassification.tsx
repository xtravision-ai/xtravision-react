import _ from 'lodash';
import { useCallback, useEffect, useRef } from 'react';
import checkUserPose, { stopUserPoseEstimation } from '../utils/PoseController';

export default function usePoseClassification(
  videoEleRef: any,
  isCamOn: boolean,
  sendJsonMessage: (msg: any) => void
) {
  const tempKeyPointsRef = useRef<any>({}); // hold KPs temporarily

  const resultsCallback = useCallback((results) => {
    const landmarks = results.poseLandmarks ?? {};
    tempKeyPointsRef.current[Date.now()] = { landmarks };
  }, []);

  useEffect(() => {
    if (isCamOn && videoEleRef?.current?.stream) {
      const { stop } = checkUserPose(videoEleRef?.current, resultsCallback);

      return () => {
        stop();
      };
    } else {
      stopUserPoseEstimation();
    }
  }, [isCamOn, videoEleRef, resultsCallback]);

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
      if (!_.isEmpty(keyPoints)) {
        // WS SEND Kps -> 1s
        sendJsonMessage({
          timestamp: Date.now(),
          user_keypoints: keyPoints,
        });
      }
    }, 1000);

    return () => {
      cleanUp();
    };
  }, [isCamOn, sendJsonMessage]);

  return {};
}
