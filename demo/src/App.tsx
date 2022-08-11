import { useRef } from "react";
import {
  CalBurned,
  ClassCategory,
  Features,
  PowerIntensityMeter,
  XButton,
  XtraVisionOnDemandProvider,
  useXtraVisionOnDemandContext,
} from "xtravision-react";

type AppContainerProps = {
  videoElementRef: any;
};
const AppContainer = ({ videoElementRef }: AppContainerProps) => {
  const {
    lastJsonMessage,
    onDemandResultsCallback,
    onDemandLastJsonMessage,
    onDemandUserEducation,
    isCamOn,
    setIsCamOn,
  } = useXtraVisionOnDemandContext();

  console.log("lastJsonMessage: ", lastJsonMessage);
  console.log("onDemandLastJsonMessage: ", onDemandLastJsonMessage);
  console.log("onDemandUserEducation: ", onDemandUserEducation);

  const intensity = lastJsonMessage?.intensity;
  const calBurned = lastJsonMessage?.calBurned;

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
        <XButton
          text="START"
          onClick={() => {
            startCamera();
          }}
          disabled={isCamOn}
        />
        <XButton
          text="STOP"
          onClick={() => {
            setIsCamOn(false);
            stopCamera();
          }}
          disabled={!isCamOn}
        />
      </div>

      {isCamOn && (
        <div>
          <PowerIntensityMeter power={intensity} />
          {calBurned && <CalBurned calBurned={calBurned} />}
          {/* {vortex && <Vortex vortex={vortex} />}  */}

          {/* <YogaPoseQuality yogaScore={yogaScore} /> */}
          <div>Cal burned: {calBurned ?? 0}</div>
        </div>
      )}
    </div>
  );
};

function App() {
  const category = ClassCategory.YOGA; // change as per our need
  const features = [
    Features.YOGA_QUALITY,
    Features.YOGA_SCORE,
    Features.VORTEX
  ];
  // const clientScheduleId = "SOME-SCHEDULE-ID";

  const sessionId = "b822b731-e8f5-4fd3-9e05-aa5db0736e70";
  const videoElementRef = useRef<any>(null);
  const classStartTime = new Date();
  const isEduScreen = false;

  const authToken = `
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjMwN2JkZi0yNjVmLTQxM2ItODU2ZC1mMDcyODVhMzc3NjkiLCJhcHBJZCI6Ijk1ZWFjZDQ1LTgyZjUtMTFlYy1hOWY1LWE0YmI2ZDZlZGM0ZSIsIm9yZ0lkIjoiZGQ4MzA1OWMtODJmMy0xMWVjLWE5ZjUtYTRiYjZkNmVkYzRlIiwiaWF0IjoxNjYwMDQzNzAxLCJleHAiOjE2OTE2MDEzMDF9.czzQWj22X6FY9wjTkWCDPvvDUgBWT-UgpjLfCKGxbRE`;

  return (
    <XtraVisionOnDemandProvider
      classCategory={category}
      features={features}
      isOnDemand
      // authToken="AUTH_TOKEN"
      authToken={authToken}
      sessionId={sessionId}
      videoElementRef={videoElementRef}
      classStartTime={classStartTime}
      isEduScreen={isEduScreen}
    >
      <video ref={videoElementRef} style={{ border: "1px solid red" }} />
      <AppContainer videoElementRef={videoElementRef} />
    </XtraVisionOnDemandProvider>
  );
}

export default App;
