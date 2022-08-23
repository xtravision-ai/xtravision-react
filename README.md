# xtravision-react

A React SDK for XtraVision API

# What is xtraVision-react?

It is an sdk for fitness related data assessments like calories, rep-count, yoga pose-matching etc

# How to install

npm install xtravision-react or yarn add xtravision-react

# Example

[Demo](https://github.com/xtravision-ai/xtravision-react/tree/main/demo)

# API Reference

 * import the components:
```
import {
    ClassCategory,
    Features,
    Assessment,
    XtraVisionOnDemandProvider,
    useXtraVisionOnDemandContext,
    useXtraVisionAssessmentContext,
    XtraVisionAssessmentProvider,
} from "xtravision-react";
```

* use the context:
  const { lastJsonMessage, isCamOn, setIsCamOn } =
    useXtraVisionAssessmentContext();

* wrap the component in the context provider:

```
    <XtraVisionAssessmentContext.Provider
      value={{
        lastJsonMessage,
        isCamOn,
        setIsCamOn,
      }}
    >
      {children}
    </XtraVisionAssessmentContext.Provider>
```

For the full detailed code refer the example above
