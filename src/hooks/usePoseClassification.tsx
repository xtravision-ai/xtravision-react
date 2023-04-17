import _ from 'lodash';
import { Camera } from '@mediapipe/camera_utils';
import { Pose } from '@mediapipe/pose';
import { useCallback, useEffect, useRef } from 'react';

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
  isEduScreen?: boolean,
  frameSize?: {
    width: number,
    height: number,
  },
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

    console.log('Model loaded');
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

    if (videoEleRef.current === null) {
      return
    };

    const stream = videoEleRef.current.srcObject as MediaStream;
    stream?.getTracks()?.forEach((track) => track.stop());
    videoEleRef.current.srcObject = null;
  };

  // mediapipe response fps
  const resultsCallback = useCallback((results) => {
    const landmarks = results.poseLandmarks ?? {};

    // do not send any request if landmark is empty
    if (!_.isEmpty(landmarks)) {
      tempKeyPointsRef.current[Date.now()] = { landmarks };
      drawLandmarksHandler(landmarks);
    }

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
          // frame data
          frame_width: _.isUndefined(frameSize) ? 640 : frameSize.width,
          frame_height: _.isUndefined(frameSize) ? 480 : frameSize.height,
        });
      }
    }, 1000);

    return () => {
      cleanUp();
    };
  }, [isCamOn, sendJsonMessage, isEduScreen]);

  // draw landmarks
  const drawLandmarksHandler = (landmarks: any) => {
    // no need to draw anything
    if (!canvasEleRef || !canvasEleRef.current) {
      return
    }

    const canvasEl = canvasEleRef.current;
    const ctx = canvasEl?.getContext('2d');

    if (canvasEl && ctx) {
      canvasEl.height = canvasEl.clientHeight;
      canvasEl.width = canvasEl.clientWidth;

      ctx.save();
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

      const width = canvasEl.width;
      const height = canvasEl.height;

      // calc x/y
      const l_eye = {
        x: landmarks[2]?.x * width,
        y: landmarks[2]?.y * height,
        key: 'l_eye',
      };
      const r_eye = {
        x: landmarks[5]?.x * width,
        y: landmarks[5]?.y * height,
        key: 'r_eye',
      };
      const l_mouth = {
        x: landmarks[9]?.x * width,
        y: landmarks[9]?.y * height,
        key: 'l_mouth',
      };
      const l_shoulder = {
        x: landmarks[11]?.x * width,
        y: landmarks[11]?.y * height,
        key: 'l_shoulder',
      };
      const r_shoulder = {
        x: landmarks[12]?.x * width,
        y: landmarks[12]?.y * height,
        key: 'r_shoulder',
      };
      const l_elbow = {
        x: landmarks[13]?.x * width,
        y: landmarks[13]?.y * height,
        key: 'l_elbow',
      };
      const r_elbow = {
        x: landmarks[14]?.x * width,
        y: landmarks[14]?.y * height,
        key: 'r_elbow',
      };
      const l_wrist = {
        x: landmarks[15]?.x * width,
        y: landmarks[15]?.y * height,
        key: 'l_wrist',
      };
      const r_wrist = {
        x: landmarks[16]?.x * width,
        y: landmarks[16]?.y * height,
        key: 'r_wrist',
      };
      const l_hip = {
        x: landmarks[23]?.x * width,
        y: landmarks[23]?.y * height,
        key: 'l_hip',
      };
      const r_hip = {
        x: landmarks[24]?.x * width,
        y: landmarks[24]?.y * height,
        key: 'r_hip',
      };
      const l_knee = {
        x: landmarks[25]?.x * width,
        y: landmarks[25]?.y * height,
        key: 'l_knee',
      };
      const r_knee = {
        x: landmarks[26]?.x * width,
        y: landmarks[26]?.y * height,
        key: 'r_knee',
      };
      const l_ankle = {
        x: landmarks[27]?.x * width,
        y: landmarks[27]?.y * height,
        key: 'l_ankle',
      };
      const r_ankle = {
        x: landmarks[28]?.x * width,
        y: landmarks[28]?.y * height,
        key: 'r_ankle',
      };

      // custom
      const neck = {
        x: (l_shoulder.x + r_shoulder.x) / 2,
        y: (l_shoulder.y + l_mouth.y) / 1.8,
        key: 'neck',
      };
      const pelvis = {
        x: (l_hip.x + r_hip.x) / 2,
        y: (l_hip.y + l_hip.y) / 2.1,
        key: 'pelvis',
      };
      const c_back = {
        x: (l_shoulder.x + r_shoulder.x) / 2,
        y: (neck.y + pelvis.y) / 2.1,
        key: 'c_back',
      };

      // draw connectors
      const gradLn = ctx.createLinearGradient(40, 210, 460, 290);
      gradLn.addColorStop(0, '#00B0FF');
      gradLn.addColorStop(1, '#18FFFF');

      ctx.beginPath();
      // ctx.moveTo(neck.x, neck.y);
      // ctx.lineTo(forehead.x, forehead.y);

      ctx.moveTo(neck.x, neck.y);
      ctx.lineTo(c_back.x, c_back.y);

      ctx.lineTo(c_back.x, c_back.y);
      ctx.lineTo(pelvis.x, pelvis.y);

      ctx.moveTo(l_shoulder.x, l_shoulder.y);
      ctx.lineTo(neck.x, neck.y);

      ctx.moveTo(neck.x, neck.y);
      ctx.lineTo(r_shoulder.x, r_shoulder.y);

      ctx.moveTo(r_shoulder.x, r_shoulder.y);
      ctx.lineTo(r_elbow.x, r_elbow.y);

      ctx.moveTo(l_shoulder.x, l_shoulder.y);
      ctx.lineTo(l_elbow.x, l_elbow.y);

      ctx.moveTo(l_elbow.x, l_elbow.y);
      ctx.lineTo(l_wrist.x, l_wrist.y);

      ctx.moveTo(r_elbow.x, r_elbow.y);
      ctx.lineTo(r_wrist.x, r_wrist.y);

      ctx.moveTo(l_hip.x, l_hip.y);
      ctx.lineTo(pelvis.x, pelvis.y);

      ctx.moveTo(pelvis.x, pelvis.y);
      ctx.lineTo(r_hip.x, r_hip.y);

      ctx.moveTo(l_hip.x, l_hip.y);
      ctx.lineTo(l_knee.x, l_knee.y);

      ctx.moveTo(r_hip.x, r_hip.y);
      ctx.lineTo(r_knee.x, r_knee.y);

      ctx.moveTo(l_knee.x, l_knee.y);
      ctx.lineTo(l_ankle.x, l_ankle.y);

      ctx.moveTo(r_knee.x, r_knee.y);
      ctx.lineTo(r_ankle.x, r_ankle.y);

      ctx.lineWidth = 10;
      ctx.strokeStyle = gradLn;
      ctx.lineCap = 'round';
      ctx.stroke();
      ctx.closePath();

      // draw points
      [
        neck,
        pelvis,
        c_back,
        l_shoulder,
        r_shoulder,
        l_elbow,
        r_elbow,
        l_wrist,
        r_wrist,
        l_hip,
        r_hip,
        l_knee,
        r_knee,
        l_ankle,
        r_ankle,
      ].forEach((el) => {
        ctx.beginPath();
        ctx.arc(el.x, el.y, 10, 0, 2 * Math.PI, false);
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#FFFFFF';
        ctx.stroke();
        ctx.closePath();
      });

      ctx.restore();
      // aiResRef.current = {};
    }
  };

  return {};
}
