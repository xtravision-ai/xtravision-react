import { useContext } from 'react';
import { XtraVisionUserContext } from '../provider/XtraVisionUserProvider';

export default function useXtraVisionUserContext() {
  const context = useContext(XtraVisionUserContext);
  if (!context) {
    throw new Error(
      'useXtraVisionUserContext must be used within a XtraVisionUserProvider'
    );
  }
  return context;
}
