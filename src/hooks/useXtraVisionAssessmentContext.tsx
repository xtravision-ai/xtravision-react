import { useContext } from 'react';
import { XtraVisionAssessmentContext } from '../provider/XtraVisionAssessmentProvider';

export default function useXtraVisionAssessmentContext() {
  const context = useContext(XtraVisionAssessmentContext);
  if (!context) {
    throw new Error(
      'useXtraVisionAssessmentContext must be used within a XtraVisionAssessmentProvider'
    );
  }
  return context;
}
