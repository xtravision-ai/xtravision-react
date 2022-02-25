import { Pose } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';

// To store reference to pose estimation model object
let poseObj: any;
export const initPose = async () => {
  // console.log('-----> USER POSE ESTIMATION MODEL INITIALIZED <-----');
  if (!poseObj) {
    poseObj = await new Pose({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
      },
    });

    poseObj.setOptions({
      modelComplexity: navigator?.deviceMemory <= 4 ? 1 : 2,
      smoothLandmarks: true,
      enableSegmentation: false,
      smoothSegmentation: true,
      minDetectionConfidence: 0.2,
      minTrackingConfidence: 0.2,
    });
  }
};

// Initialise the pose object
initPose();

let videoElement: any;

// Used to check if camera needs to be started or not
let start_camera = true;
let camera: any;

const checkUserPose = (
  _videoElement: HTMLVideoElement,
  onResultsCallback?: Function
) => {
  console.log('PoseController >> checkUserPose');
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

  return {
    stop() {
      if (camera) camera.stop();
    },
  };
};

export const stopUserPoseEstimation = () => {
  if (videoElement) {
    start_camera = true;
    videoElement = null;
  }

  // stop the camera if on
  if (camera) camera.stop();

  camera = null;
};

export default checkUserPose;
