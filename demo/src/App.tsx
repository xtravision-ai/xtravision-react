import { useRef } from "react";
import {
  ClassCategory,
  Features,
  Assessment,
  // XtraVisionOnDemandProvider,
  // useXtraVisionOnDemandContext,
  useXtraVisionAssessmentContext,
  XtraVisionAssessmentProvider,
} from "xtravision-react";

type AppContainerProps = {
  videoElementRef: any;
};
const AppContainer = ({ videoElementRef }: AppContainerProps) => {
  const { lastJsonMessage, isCamOn, setIsCamOn } =
    useXtraVisionAssessmentContext();

  if (lastJsonMessage?.error) {
    console.log("lastJsonMessage: ", lastJsonMessage?.error);
  } else console.log("lastJsonMessage: ", lastJsonMessage?.data);

  const intensity = lastJsonMessage?.intensity;
  const calBurned = lastJsonMessage?.calBurned;
  const assessmentName = lastJsonMessage?.data?.assessment;
  const repCount = lastJsonMessage?.data?.reps;

  const startCamera = async () => {
    try {
      const deviceInfos = await navigator.mediaDevices.enumerateDevices();
      let defaultCamId;

      for (let i = 0; i !== deviceInfos.length; ++i) {
        const deviceInfo = deviceInfos[i];
        if (deviceInfo.kind === "videoinput") {
          defaultCamId = deviceInfo.deviceId;
          break;
        }
      }

      if (!defaultCamId) return;

      const constraints = {
        video: {
          deviceId: { exact: defaultCamId },
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoElementRef.current.stream = stream;
      videoElementRef.current.srcObject = stream;
      videoElementRef.current.play();
      setIsCamOn(true);
    } catch (err) {
      console.log(err);
      setIsCamOn(false);
    }
  };

  const stopCamera = () => {
    var stream = videoElementRef.current.srcObject;
    var tracks = stream.getTracks();

    for (var i = 0; i < tracks.length; i++) {
      var track = tracks[i];
      track.stop();
    }

    videoElementRef.current.srcObject = null;
  };

  return (
    <div style={{ backgroundColor: "#D3D3D3", padding: "30px" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <button
          onClick={() => {
            startCamera();
          }}
          disabled={isCamOn}
        >
          START
        </button>
        <button
          onClick={() => {
            setIsCamOn(false);
            stopCamera();
          }}
          disabled={!isCamOn}
        >
          STOP
        </button>
      </div>

      {isCamOn && (
        <div>
         <div>Intensity: {intensity ?? 0}</div>
          <div>Cal burned: {calBurned ?? 0}</div>
          <div>Assessment: {assessmentName ?? ''} </div>
          <div>Rep Count: {repCount ?? 0}</div>
        </div>
      )}
    </div>
  );
};

function App() {
  const category = ClassCategory.Yoga; // change as per our need
  const features = [
    Features.YOGA_QUALITY,
    Features.YOGA_SCORE,
    Features.VORTEX,
  ];
  // const clientScheduleId = "SOME-SCHEDULE-ID";
  const sessionId = "SESSIONID";

  const videoElementRef = useRef<any>(null);
  const isEduScreen = false;
  // assessment name you want
  const assessmentName = Assessment.SQUATS;
  const authToken ="_AUTH_TOKEN_";


  return (
    <XtraVisionAssessmentProvider
      authToken={authToken}
      videoElementRef={videoElementRef}
      isEduScreen={isEduScreen}
      assessmentName={assessmentName}
    >
      <video ref={videoElementRef} style={{ border: "1px solid red" }} />
      <AppContainer videoElementRef={videoElementRef} />
    </XtraVisionAssessmentProvider>
  );
}

export default App;

// return (
//   <XtraVisionOnDemandProvider
//     classCategory={category}
//     features={features}
//     // authToken="AUTH_TOKEN"
//     authToken={authToken}
//     sessionId={sessionId}
//     videoElementRef={videoElementRef}
//     isEduScreen={isEduScreen}
//   >
//     <video ref={videoElementRef} style={{ border: "1px solid red" }} />
//     <AppContainer videoElementRef={videoElementRef} />
//   </XtraVisionOnDemandProvider>
