import React, { createContext, ReactNode, useState } from "react";
import useWebSocket from "react-use-websocket";
import { Assessment } from "../constants";
import usePoseClassification from "../hooks/usePoseClassification";
import { WS_URL } from "../provider/constants";

export interface IXtraVisionAssessmentContext {
  lastJsonMessage: JSON;
  isCamOn: boolean;
  setIsCamOn: (isCamOn: boolean) => void;
}

export const XtraVisionAssessmentContext =
  createContext<IXtraVisionAssessmentContext>(null!);

interface XtraVisionAssessmentAppProps {
  children: ReactNode;
  videoElementRef: any;
  authToken: string;
  assessmentName: Assessment;
  isEduScreen: boolean;
}

const XtraVisionAssessmentProvider = ({
  children,
  authToken,
  assessmentName,
  videoElementRef,
  isEduScreen,
}: XtraVisionAssessmentAppProps) => {
  const [isCamOn, setIsCamOn] = useState<boolean>(false);

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(
    `${WS_URL}/assessment/fitness/${assessmentName}?authToken=${authToken}`,
    {
      shouldReconnect: (e) => true, // will attempt to reconnect on all close events
    }
  );

  usePoseClassification(videoElementRef, isCamOn, sendJsonMessage, isEduScreen);

  return (
    <XtraVisionAssessmentContext.Provider
      value={{
        lastJsonMessage,
        isCamOn,
        setIsCamOn,
      }}
    >
      {children}
    </XtraVisionAssessmentContext.Provider>
  );
};

export default XtraVisionAssessmentProvider;
