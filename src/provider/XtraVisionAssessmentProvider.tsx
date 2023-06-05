import React, { createContext, ReactNode, useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { runtimeConfig } from "../config";
import usePoseClassification from "../hooks/usePoseClassification";
import { API_SERVER_URL, WS_URL } from "../provider/constants";

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
  const [initialSendingDone, setInitialSendingDone] = useState(false);

  const [connectionDetails, setConnectionDetails] = useState() as any;

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
  const [queryParams] = useState<any>(tempQueryParam)

  useEffect(() => {

    //TODO: change implementation later
    const fetchData = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/')
        const data = await response.json();
        setConnectionDetails({
          ipAddress: data?.ip,
          location: `${data}`
        })
      } catch (err) {
        console.log("fetch ip details error:", err);
      }
    };
    fetchData();
  }, [])

  const deviceDetails = {
    osDetails: {
      name: window.navigator.platform || "Unknown OS",
      version: window.navigator.userAgent || "Unknown OS Version",
      apiVersion: window.navigator.appVersion || "Unknown OS apiVersion",
    },
    // ignoring for now:
    // manufacturerDetails: {
    //   make: "Samsung",
    //   model: "Galaxy S10",
    //   variant: "SM-G973U"
    // }
  };

  const sdkDetails = {
    name: runtimeConfig.PACKAGE_NAME || "Unknown SDK",
    version: runtimeConfig.PACKAGE_VERSION || "Unknown SDK Version",
  };

  const apiRequest = {
    query: `mutation userSessionSaveMetaData($metaData: JSON, $requestedAt: Float) { 
              userSessionSaveMetaData(metaData: $metaData, requestedAt: $requestedAt) { 
                id
              } 
            }`,
    variables: {
      metaData: {
        connectionDetails: connectionDetails,
        deviceDetails: deviceDetails,
        sdkDetails: sdkDetails
      },
      requestedAt: queryParams.requested_at
    }
  }

  const WebSocketOpenHandler = async () => {
    if (apiRequest && !initialSendingDone) {
      try {
        const response = await fetch(API_SERVER_URL, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${connectionData.auth_token}`,
          },
          body: JSON.stringify(apiRequest),
        })

        if (response.ok) {
          // setting this so that we dont send multiple times when wss dissconnects and reconnects
          setInitialSendingDone(true);
        } else {
          console.error("Server returned an error :", response.status, response.statusText)
        }
      } catch (err) {
        console.error("Error on server API request:", err);
      }
    }
  };

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(
    `${WS_URL}/assessment/fitness/${connectionData.assessment_name}`,
    {
      queryParams: queryParams,
      shouldReconnect: (e) => true, // will attempt to reconnect on all close events
      // reconnectInterval: 1000, //in 1 sec
      // reconnectAttempts: 5,
      // retryOnError: true,
      onOpen: (event: WebSocketEventMap['open']) => {
        console.log("WS Open ===>", event);
        WebSocketOpenHandler();
      },
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
