import React, { createContext, ReactNode, useState } from "react";
import useWebSocket from "react-use-websocket";
import usePoseClassification from "../hooks/usePoseClassification";
import { WS_URL } from "../provider/constants";

export interface IXtraVisionAssessmentContext {
  lastJsonMessage: JSON;
  isCamOn: boolean;
  setIsCamOn: (isCamOn: boolean) => void;
  isPreJoin: boolean;
  setIsPreJoin: (isPreJoin: boolean) => void;
  keyPoints: any;
}

export const XtraVisionAssessmentContext =
  createContext<IXtraVisionAssessmentContext>(null!);

interface XtraVisionAssessmentAppProps {
  children: ReactNode;
  videoElementRef: any;
  canvasElementRef: any;
  connectionData: {
    assessment_name: string;
    auth_token: string;
    assessment_config?: object;
    user_config?: object;
    session_id?: string | null;
  };
  frameSize: {
    width: number;
    height: number;
  };
  requestData: {
    isPreJoin?: boolean;
  };
}

const XtraVisionAssessmentProvider = ({
  children,
  videoElementRef,
  canvasElementRef,
  connectionData,
  requestData,
  frameSize,
}: XtraVisionAssessmentAppProps) => {
  const [isCamOn, setIsCamOn] = useState<boolean>(false);
  const [isPreJoin, setIsPreJoin] = useState<boolean>(
    requestData?.isPreJoin ?? true
  );
  const [keyPoints, setKeyPoints] = useState(null);

  let tempQueryParam = {}

  tempQueryParam['auth_token'] = connectionData.auth_token;
  tempQueryParam['session_id'] = connectionData.session_id ? connectionData.session_id : null;
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

  usePoseClassification(
    videoElementRef,
    canvasElementRef,
    isCamOn,
    sendJsonMessage,
    keyPoints,
    setKeyPoints,
    isPreJoin,
    // frame data
    frameSize
  );

  return (
    <XtraVisionAssessmentContext.Provider
      value={{
        lastJsonMessage,
        isCamOn,
        setIsCamOn,
        isPreJoin,
        setIsPreJoin,
        keyPoints
      }}
    >
      {children}
    </XtraVisionAssessmentContext.Provider>
  );
};

export default XtraVisionAssessmentProvider;
