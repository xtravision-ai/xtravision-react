import usePoseClassification from '../hooks/usePoseClassification';
import useParseResponse from '../hooks/useParseResponse';
import React, { createContext, ReactNode, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { ClassCategory, Features } from '../constants';
import { WS_URL } from "../provider/constants";

export interface IXtraVisionTrainerContext {
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

export const XtraVisionTrainerContext =
  createContext<IXtraVisionTrainerContext>(null!);

interface Props {
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

const XtraVisionTrainerProvider = ({
  authToken, // Auth token
  clientScheduleId,
  classCategory,
  isOnDemand,
  features, // Array of features
  children,
  videoElementRef,
  classStartTime,
}: Props) => {
  const [isCamOn, setIsCamOn] = useState<boolean>(false);

  const featuresStr = encodeURIComponent(JSON.stringify(features));

  const queryParams = {
    authToken,
    isOnDemand: isOnDemand.toString(),
    features: featuresStr,
    classStartTime: classStartTime.getTime(),
  };

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
  usePoseClassification(videoElementRef, isCamOn, sendJsonMessage, false);

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
    <XtraVisionTrainerContext.Provider
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
    </XtraVisionTrainerContext.Provider>
  );
};

export default XtraVisionTrainerProvider;
