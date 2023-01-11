import React, { createContext, ReactNode, useState } from "react";
import useWebSocket from "react-use-websocket";
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
    session_id?: string | null;
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

  let tempQueryParam = {}
  
  tempQueryParam['auth_token'] = connectionData.auth_token;
  tempQueryParam['session_id'] = connectionData.session_id ? connectionData.session_id : null ;
  tempQueryParam['requested_at'] = Date.now();

  if (connectionData.user_config) {
    tempQueryParam['user_config'] = encodeURIComponent(`${JSON.stringify(connectionData.user_config)}`);
  }

  if (connectionData.assessment_config) {
    tempQueryParam['assessment_config'] = encodeURIComponent(`${JSON.stringify(connectionData.assessment_config)}`);
  }

  // IMP: set only once  
  const [queryParams] = useState(tempQueryParam)

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(
    `${WS_URL}/assessment/fitness/${connectionData.assessment_name}`,
    {
      queryParams: queryParams,
      shouldReconnect: (e) => true, // will attempt to reconnect on all close events
      // reconnectInterval: 1000, //in 1 sec
      // reconnectAttempts: 5,
      // retryOnError: true,
      // onOpen: (event: WebSocketEventMap['open']) => console.log("WS Open ===>", event),
      // onClose: (event: WebSocketEventMap['close']) => console.log("WS Close ===>", event),
      onError: (event: WebSocketEventMap['error']) => console.error("WS Error ===>", event),
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
