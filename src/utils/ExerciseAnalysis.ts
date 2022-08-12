import { Pose, Results } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';

// To store reference to pose estimation model object
let poseObj: any;

const initPose = async () => {
  console.log('-----> USER POSE ESTIMATION MODEL INITIALIZED <-----');

  poseObj = new Pose({
    locateFile: (file) => {
      return `https://d1z30on9khcjrk.cloudfront.net/@mediapipe/${file}`;
    },
  });

  poseObj.setOptions({
    modelComplexity:
      navigator?.deviceMemory <= 2 ? 0 : navigator?.deviceMemory <= 4 ? 1 : 2,
    smoothLandmarks: true,
    enableSegmentation: false,
    smoothSegmentation: true,
    minDetectionConfidence: 0.2,
    minTrackingConfidence: 0.2,
  });

  await poseObj.initialize();
};

// Initialise the pose object
// initPose();

let videoElement: any;

// Used to check if camera needs to be started or not
let start_camera = true;
let camera: any;

export const startUserExerciseAnalysis = async (
  _videoElement: HTMLVideoElement,
  onResultsCallback: (results: Results) => Promise<void> | void
) => {
  console.log('Initializing pose object');
  await initPose();

  videoElement = _videoElement;

  poseObj.onResults(onResultsCallback);

  // Ajay test code. Don't delete this. : Start
  // start_camera = false;
  // const processFrames = () => {
  //   videoElement.requestVideoFrameCallback(async () => {
  //     await poseObj.send({ image: videoElement });
  //     processFrames();
  //   });
  // };
  // processFrames();
  // Ajay test code. Don't delete this. : End

  if (start_camera) {
    camera = new Camera(videoElement, {
      onFrame: async () => {
        await poseObj.send({ image: videoElement });
      },
      width: 640,
      height: 480,
    });
    camera.start();
    start_camera = false;
  }
};

export const stopUserExerciseAnalysis = () => {
  if (videoElement) {
    start_camera = true;
    videoElement = null;
  }

  // stop the camera if on
  if (camera) camera.stop();
  camera = null;

  if (poseObj) poseObj.close();
};
