import { Features } from '../constants';
import _ from 'lodash';
import { useEffect, useState } from 'react';

export default function useParseResponse(lastJsonMessage: any) {
  // const [vortex, setVortex] = useState<IVortex | null>(null);

  const [intensity, setIntensity] = useState<any>(null);
  const [calBurned, setCalBurned] = useState<any>(null);
  const [bodyMuscleGroup, setBodyMuscleGroup] = useState<any>(null);
  const [muscleGroupRepsCount, setMuscleGroupRepsCount] = useState<any>(null);
  const [yogaPoseAlignmentScore, setYogaPoseAlignmentScore] =
    useState<any>(null);
  const [yogaPosegroup, setYogaPosegroup] = useState<any>(null);
  const [yogaTotalPoses, setYogaTotalPoses] = useState<any>(null);

  useEffect(() => {
    if (!lastJsonMessage) return;

    // intensity
    if (lastJsonMessage[Features.INTENSITY])
      setIntensity(_.last(lastJsonMessage[Features.INTENSITY]));

    // Cal burned
    if (lastJsonMessage[Features.CALORIES_BURNED])
      setCalBurned(lastJsonMessage[Features.CALORIES_BURNED]);

    // Yoga score
    if (lastJsonMessage[Features.YOGA_POSE_ALIGNMENT_SCORE])
      setYogaPoseAlignmentScore(
        _.last(lastJsonMessage[Features.YOGA_POSE_ALIGNMENT_SCORE])
      );

    // Vortex
    // if (lastJsonMessage?.vortex) setVortex(lastJsonMessage?.vortex);
  }, [lastJsonMessage]);

  return {
    intensity,
    calBurned,
    bodyMuscleGroup,
    muscleGroupRepsCount,
    yogaPoseAlignmentScore,
    yogaPosegroup,
    yogaTotalPoses,
  };
}
