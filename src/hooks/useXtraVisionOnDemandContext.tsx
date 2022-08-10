import { useContext } from 'react';
import { XtraVisionOnDemandContext } from '../provider/XtraVisionOnDemandProvider';

export default function useXtraVisionOnDemandContext() {
  const context = useContext(XtraVisionOnDemandContext);
  if (!context) {
    throw new Error(
      'useXtraVisionOnDemandContext must be used within a XtraVisionOnDemandProvider'
    );
  }
  return context;
}
