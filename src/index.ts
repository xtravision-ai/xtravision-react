// init mediapipe pose
import './utils/ExerciseAnalysis';

// exports

// provider
export { default as XtraVisionUserProvider } from './provider/XtraVisionUserProvider';
export { default as XtraVisionTrainerProvider } from './provider/XtraVisionTrainerProvider';
export { default as XtraVisionOnDemandProvider } from './provider/XtraVisionOnDemandProvider';
export { default as XtraVisionAssessmentProvider } from './provider/XtraVisionAssessmentProvider';


// hooks
export * from './hooks';

// constants
export { Features, ClassCategory, Assessment } from './constants';

// //configs
export { runtimeConfig } from "./config";
