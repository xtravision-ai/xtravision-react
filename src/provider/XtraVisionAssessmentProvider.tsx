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
  connectionData: {
    assessment_name: string;
    auth_token: string;
    assessment_config?: object;
    user_config?: object;
  };
  requestData: {
    isPreJoin?: boolean;
  };
}

const XtraVisionAssessmentProvider = ({
  children,
  videoElementRef,
  connectionData,
  requestData
}: XtraVisionAssessmentAppProps) => {
  const [isCamOn, setIsCamOn] = useState<boolean>(false);

  let queryParams: { [key: string]: any } = {};

  if (connectionData.auth_token) {
    queryParams['auth_token'] = connectionData.auth_token;
  }

  if (connectionData.user_config) {
    queryParams['user_config'] = encodeURIComponent(`${JSON.stringify(connectionData.user_config)}`);
  }

  if (connectionData.assessment_config) {
    queryParams['assessment_config'] = encodeURIComponent(`${JSON.stringify(connectionData.assessment_config)}`);
  }

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(
    `${WS_URL}/assessment/fitness/${connectionData.assessment_name}`,
    {
      queryParams: queryParams,
      shouldReconnect: (e) => true, // will attempt to reconnect on all close events
    },
  );

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
