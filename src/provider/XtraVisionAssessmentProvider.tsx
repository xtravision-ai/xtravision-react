import React, { createContext, ReactNode, useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import usePoseClassification from "../hooks/usePoseClassification";
import { WS_LOCAL_URL, WS_PROD_URL, WS_STAGING_URL } from "../provider/constants";
import _ from "lodash";

export interface IXtraVisionAssessmentContext {
  lastJsonMessage: JSON;
  isCamOn: boolean;
  setIsCamOn: (isCamOn: boolean) => void;
  isPreJoin: boolean;
  setIsPreJoin: (isPreJoin: boolean) => void;
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
    screener_chat_id?: string | null;
  };
  frameSize: {
    width: number;
    height: number;
  };
  requestData: {
    isPreJoin?: boolean;
  };
  libData?: {
    serverEndpoint?: string;
    sendDataFlag?: boolean
  };
}

const XtraVisionAssessmentProvider = ({
  children,
  videoElementRef,
  canvasElementRef,
  connectionData,
  requestData,
  frameSize,
  libData,
}: XtraVisionAssessmentAppProps) => {
  const [isCamOn, setIsCamOn] = useState<boolean>(false);
  const [isPreJoin, setIsPreJoin] = useState<boolean>(
    requestData?.isPreJoin ?? true
  );
  let WS_URL = WS_PROD_URL;

  const [internalLibVariable, setInternalLibVariable] = useState(libData);

  useEffect(() => {
    setInternalLibVariable(libData);
  }, [libData]);

  let sendDataFlag = true
  if (internalLibVariable && !_.isUndefined(internalLibVariable.sendDataFlag)){
    sendDataFlag = internalLibVariable.sendDataFlag
  }
  
  let  serverEndpoint = libData?.serverEndpoint?.toLowerCase();

  if ( serverEndpoint === "staging") {
    WS_URL = WS_STAGING_URL;
  } else if (serverEndpoint === "local") {
    WS_URL = WS_LOCAL_URL
  }

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

  let urlPath = `assessment/fitness/${connectionData.assessment_name}`

  // IMP: For MSK-Screening App
  // use for MSK screening app
  tempQueryParam['screener_chat_id'] =  connectionData.screener_chat_id
  if (connectionData.screener_chat_id) {
    urlPath = `msk_screener/${connectionData.assessment_name}`
  }

  // IMP: set only once  
  const [queryParams] = useState(tempQueryParam)

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(
    `${WS_URL}/${urlPath}`,
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
    isPreJoin,
    // frame data
    frameSize,
    sendDataFlag
  );

  return (
    <XtraVisionAssessmentContext.Provider
      value={{
        lastJsonMessage,
        isCamOn,
        setIsCamOn,
        isPreJoin,
        setIsPreJoin,
      }}
    >
      {children}
    </XtraVisionAssessmentContext.Provider>
  );
};

export default XtraVisionAssessmentProvider;
