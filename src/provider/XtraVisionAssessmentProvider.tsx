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
  // authToken: string;
  // assessmentName: Assessment;
  // isEduScreen: boolean;

  connectionData: {
    assessment_name: string;
    auth_token: string;
    assessment_config?: object;
    user_config?: object;
  };
  requestData: {
    isPreJoin?: boolean;
  };
  // libData: {
  //   onServerResponse(serverResponse: any): void;
  //   cameraPosition: 'front' | 'back';
  // }
}

const XtraVisionAssessmentProvider = ({
  children,
  videoElementRef,
  connectionData,
  requestData
}: XtraVisionAssessmentAppProps) => {
  const [isCamOn, setIsCamOn] = useState<boolean>(false);

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(
    `${WS_URL}/assessment/fitness/${connectionData.assessment_name}?authToken=${connectionData.auth_token}&user_config=${connectionData.user_config}&assessment_config=${connectionData.assessment_config}`,
    {
      shouldReconnect: (e) => true, // will attempt to reconnect on all close events
    }
  );

  console.log('lastJsonMessage:', lastJsonMessage);

  usePoseClassification(videoElementRef, isCamOn, sendJsonMessage, requestData.isPreJoin);

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
