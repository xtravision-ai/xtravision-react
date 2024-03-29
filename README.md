# xtravision-react

A React SDK for XtraVision API

# What is xtraVision-react?

It is an sdk for fitness related data assessments like calories, rep-count, yoga pose-matching etc

# How to install

``npm install @xtravision/xtravision-react``  
or  
``yarn add @xtravision/xtravision-react``

# Example

[Demo](https://github.com/xtravision-ai/xtravision-react/tree/main/demo)

# API Reference

- import the relevant features you want:

```javascript
import {
    ClassCategory,
    Features,
    Assessment,
    XtraVisionOnDemandProvider,
    useXtraVisionOnDemandContext,
    useXtraVisionAssessmentContext,
    XtraVisionAssessmentProvider,
    XtraVisionEventEmitter, // optional
} from "@xtravision/xtravision-react";
```

- use the context to get the values:

```javascript
const { lastJsonMessage, isCamOn, setIsCamOn } = useXtraVisionAssessmentContext();
  const videoElementRef = useRef<any>(null);
  // use for draw skeleton
  const canvasRef = useRef<any>(null);

  const isEduScreen = false;
  // assessment name you want
  const assessment_name = 'SQUATS';
  const auth_token ="__AUTH_TOKEN__";

  const connectionData = {
    assessment_name,
    auth_token,
  }

  const requestData = {
    isPreJoin
  }

```

- wrap the component in the context provider and pass the results from the previous context:

```javascript
    <XtraVisionAssessmentProvider
      videoElementRef={videoElementRef}
      connectionData={connectionData}
      requestData={requestData}
      canvasElementRef={canvasRef}
    >
      {children}
    </XtraVisionAssessmentProvider>
```

- `{children}` elements must have below code and need to connected media input devices using `navigator.mediaDevices`. Please take further reference from demo app. 
```javascript
        <video ref={videoElementRef} ></video>
        <!-- <canvas ref={canvasElementRef}></canvas>  // use canvas if you need skeleton -->
  ```


  - If you need live user key-points then you can use `XtraVisionEventEmitter`
  ```javascript
      XtraVisionEventEmitter.on('onUserKeyPoints', (data: any) => {console.log('data.toString()');})

  ```

**NOTE:** For the full detailed code refer demo app
