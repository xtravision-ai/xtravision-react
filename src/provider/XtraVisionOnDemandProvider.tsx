import usePoseClassification from "../hooks/usePoseClassification";
import useOnDemandSocket from "../hooks/useOnDemandSocket";
import React, { createContext, ReactNode, useState } from "react";
import useWebSocket from "react-use-websocket";
import { ClassCategory, Features } from "../constants";
import { WS_URL } from "./constants";

export interface IXtraVisionOnDemandContext {
  lastJsonMessage: JSON;
  onDemandResultsCallback: any;
  onDemandLastJsonMessage: any;
  onDemandUserEducation: any;
  isCamOn: boolean;
  setIsCamOn: (isCamOn: boolean) => void;
}

export const XtraVisionOnDemandContext =
  createContext<IXtraVisionOnDemandContext>(null!);

interface XtraAppProviderProps {
  children: ReactNode;
  classCategory: ClassCategory;
  features: Features[];
  authToken: string;
  sessionId: string;
  isOnDemand: boolean;
  videoElementRef: any;
  classStartTime: Date;
  isEduScreen: boolean;
  isTestRunning: boolean;
}

const XtraVisionOnDemandProvider = ({
  authToken, // Auth token
  sessionId,
  classCategory,
  isOnDemand,
  features, // Array of features
  children,
  videoElementRef,
  classStartTime,
  isEduScreen,
  isTestRunning,
}: XtraAppProviderProps) => {
  const [isCamOn, setIsCamOn] = useState<boolean>(false);
  console.log("isEduScreen:", isEduScreen);

  const featuresStr = encodeURIComponent(JSON.stringify(features));

  const queryParams = {
    authToken,
    isOnDemand: isOnDemand.toString(),
    features: featuresStr,
    classStartTime: classStartTime.getTime(),
  };

  // connect ws
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(
    `${WS_URL}/${classCategory}/${sessionId}`,
    {
      onOpen: (e) => console.log(" ws connected"),
      shouldReconnect: (e) => true, // will attempt to reconnect on all close events
      onError: (e) => console.log(e),
      queryParams,
    }
  );

  // pose -> send keypoints 1s
  usePoseClassification(videoElementRef, isCamOn, sendJsonMessage);

  const {
    onDemandResultsCallback,
    onDemandLastJsonMessage,
    onDemandUserEducation,
  } = useOnDemandSocket(
    classCategory,
    features,
    sessionId,
    authToken,
    isEduScreen,
    isTestRunning,
  );

  return (
    <XtraVisionOnDemandContext.Provider
      value={{
        lastJsonMessage,
        onDemandResultsCallback,
        onDemandLastJsonMessage,
        onDemandUserEducation,
        isCamOn,
        setIsCamOn,
      }}
    >
      {children}
    </XtraVisionOnDemandContext.Provider>
  );
};

export default XtraVisionOnDemandProvider;
