import React, { createContext, ReactNode, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { ClassCategory, Features } from '../constants';
import useParseResponse from '../hooks/useParseResponse';
import usePoseClassification from '../hooks/usePoseClassification';
import { WS_URL } from './constants';

export interface IXtraVisionUserContext {
  intensity: number;
  calBurned: number;

  bodyMuscleGroup: string;
  muscleGroupRepsCount: number;

  yogaPoseAlignmentScore: number;
  yogaPosegroup: string;
  yogaTotalPoses: number;

  isCamOn: boolean;
  setIsCamOn: (isCamOn: boolean) => void;
}

export const XtraVisionUserContext = createContext<IXtraVisionUserContext>(
  null!
);

interface XtraAppProviderProps {
  children: ReactNode;
  classCategory: ClassCategory;
  features: Features[];
  authToken: string;
  clientScheduleId: string;
  isOnDemand: boolean;
  trainerId?: string;
  videoElementRef: any;
  classStartTime: Date;
}

const XtraVisionUserProvider = ({
  authToken, // Auth token
  clientScheduleId,
  classCategory,
  isOnDemand,
  features, // Array of features
  trainerId,
  children,
  videoElementRef,
  classStartTime,
}: XtraAppProviderProps) => {
  const [isCamOn, setIsCamOn] = useState<boolean>(false);

  const featuresStr = encodeURIComponent(JSON.stringify(features));

  const queryParams = {
    authToken,
    isOnDemand: isOnDemand.toString(),
    features: featuresStr,
    classStartTime: classStartTime.getTime(),
  };

  if (trainerId) queryParams['trainerId'] = trainerId;

  // connect ws
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(
    `${WS_URL}/${classCategory}/${clientScheduleId}`,
    {
      onOpen: (e) => console.log(' ws connected'),
      shouldReconnect: (e) => true, // will attempt to reconnect on all close events
      onError: (e) => console.log(e),
      queryParams,
    }
  );

  // pose -> send keypoints 1s
  usePoseClassification(videoElementRef, isCamOn, sendJsonMessage);

  // receive data from server
  const {
    intensity,
    calBurned,
    bodyMuscleGroup,
    muscleGroupRepsCount,
    yogaPoseAlignmentScore,
    yogaPosegroup,
    yogaTotalPoses,
  } = useParseResponse(lastJsonMessage);

  return (
    <XtraVisionUserContext.Provider
      value={{
        intensity,
        calBurned,
        bodyMuscleGroup,
        muscleGroupRepsCount,
        yogaPoseAlignmentScore,
        yogaPosegroup,
        yogaTotalPoses,
        isCamOn,
        setIsCamOn,
      }}
    >
      {children}
    </XtraVisionUserContext.Provider>
  );
};

export default XtraVisionUserProvider;
