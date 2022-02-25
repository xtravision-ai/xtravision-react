import { useContext } from 'react';
import { XtraVisionTrainerContext } from '../provider/XtraVisionTrainerProvider';

export default function useXtraVisionTrainerContext() {
  const context = useContext(XtraVisionTrainerContext);
  if (!context) {
    throw new Error(
      'useXtraVisionTrainerContext must be used within a XtraVisionTrainerProvider'
    );
  }
  return context;
}
