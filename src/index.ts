// init mediapipe pose
import './utils/ExerciseAnalysis';

// exports

// provider
export { default as XtraVisionUserProvider } from './provider/XtraVisionUserProvider';
export { default as XtraVisionTrainerProvider } from './provider/XtraVisionTrainerProvider';
export { default as XtraVisionOnDemandProvider } from './provider/XtraVisionOnDemandProvider';
export { default as XtraVisionAssessmentProvider } from './provider/XtraVisionAssessmentProvider';
// Use for some Specific use cases
export  {default as XtraVisionEventEmitter} from './provider/XtraVisionEventEmitter'


// hooks
export * from './hooks';

// constants
export { Features, ClassCategory, Assessment } from './constants';
