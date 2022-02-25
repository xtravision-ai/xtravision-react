declare var React: any;

declare global {
  interface Window {
    Pose?: any; //mediapipe pose
    Camera?: any; //mediapipe camera
  }
}

interface Navigator {
  deviceMemory?: any;
}