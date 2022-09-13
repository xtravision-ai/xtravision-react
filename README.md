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

```
import {
    ClassCategory,
    Features,
    Assessment,
    XtraVisionOnDemandProvider,
    useXtraVisionOnDemandContext,
    useXtraVisionAssessmentContext,
    XtraVisionAssessmentProvider,
} from "@xtravision/xtravision-react";
```

- use the context to get the values:

```
const { lastJsonMessage, isCamOn, setIsCamOn } = useXtraVisionAssessmentContext();
  const videoElementRef = useRef<any>(null);
  const isEduScreen = false;
  // assessment name you want
  const assessmentName = Assessment.SQUATS;
  const authToken ="__AUTH_TOKEN__";

```

- wrap the component in the context provider and pass the results from the previous context:

```
    <XtraVisionAssessmentProvider
      authToken={authToken}
      videoElementRef={videoElementRef}
      isEduScreen={isEduScreen}
      assessmentName={assessmentName}
    >
      {children}
    </XtraVisionAssessmentProvider>
```

- for On-Demand Yoga assessment, use useXtraVisionOnDemandContext and XtraVisionOnDemandProvider

For the full detailed code refer the example above
