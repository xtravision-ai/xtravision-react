import React, { createContext, ReactNode, useState } from "react";
import useWebSocket from "react-use-websocket";
import { ClassCategory, Features } from "../constants";
import usePoseClassification from "../hooks/usePoseClassification";
import { WS_URL } from "../provider/constants";

export interface IXtraVisionOnDemandContext {
  lastJsonMessage: JSON;
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
  videoElementRef: any;
  isEduScreen: boolean;
}

const XtraVisionOnDemandProvider = ({
  authToken, // Auth token
  sessionId,
  classCategory,
  features, // Array of features
  children,
  videoElementRef,
  isEduScreen,
}: XtraAppProviderProps) => {
  const [isCamOn, setIsCamOn] = useState<boolean>(false);

  const featuresStr = encodeURIComponent(JSON.stringify(features));

  // connect ws
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(
    `${WS_URL}/ondemand/${sessionId}/${classCategory}?authToken=${authToken}&features=${featuresStr}`,
    {
      shouldReconnect: (e) => true, // will attempt to reconnect on all close events
    }
  );

  // pose -> send keypoints 1s
  usePoseClassification(videoElementRef, isCamOn, sendJsonMessage, isEduScreen);

  return (
    <XtraVisionOnDemandContext.Provider
      value={{
        lastJsonMessage,
        isCamOn,
        setIsCamOn,
      }}
    >
      {children}
    </XtraVisionOnDemandContext.Provider>
  );
};

export default XtraVisionOnDemandProvider;
