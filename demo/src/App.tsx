import { useRef } from 'react';
import {
  CalBurned,
  ClassCategory,
  Features,
  PowerIntensityMeter,
  XButton,
  XtraVisionUserProvider,
  useXtraVisionUserContext,
} from 'xtravision-react';

type AppContainerProps = {
  videoElementRef: any;
};
const AppContainer = ({ videoElementRef }: AppContainerProps) => {
  const { intensity, calBurned, isCamOn, setIsCamOn } =
    useXtraVisionUserContext();

  const startCamera = async () => {
    try {
      const deviceInfos = await navigator.mediaDevices.enumerateDevices();
      let defaultCamId;

      for (let i = 0; i !== deviceInfos.length; ++i) {
        const deviceInfo = deviceInfos[i];
        if (deviceInfo.kind === 'videoinput') {
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
    <div style={{ backgroundColor: '#D3D3D3', padding: '30px' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
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
  const category = ClassCategory.HIIT;
  const features = [Features.INTENSITY, Features.CALORIES_BURNED];
  const clientScheduleId = 'SOME-SCHEDULE-ID';
  const videoElementRef = useRef<any>(null);
  const classStartTime = new Date();

  return (
    <XtraVisionUserProvider
      classCategory={category}
      features={features}
      isOnDemand
      authToken="AUTH_TOKEN"
      clientScheduleId={clientScheduleId}
      videoElementRef={videoElementRef}
      classStartTime={classStartTime}
    >
      <video ref={videoElementRef} style={{ border: '1px solid red' }} />
      <AppContainer videoElementRef={videoElementRef} />
    </XtraVisionUserProvider>
  );
}

export default App;
