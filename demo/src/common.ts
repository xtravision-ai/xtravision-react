export const skeletonPoseConnections: Array<[number, number]> = [
  [11, 12],
  [11, 13],
  [13, 15],
  [12, 14],
  [14, 16],
  [11, 23],
  [12, 24],
  [23, 25],
  [23, 24],
  [24, 26],
  [25, 27],
  [26, 28],
  // [29, 31],
  // [30, 32],
];

export const backPoseConnections: Array<[number, number]> = [
  [11, 12],
  [11, 23],
  [12, 24],
  [23, 24],
];

// new demo feature based
export enum Assessment {
  SQUATS = 'SQUATS_T4',
  HALF_SQUAT = 'HALF_SQUAT',
  BANDED_ALTERNATING_DIAGNOLS = 'BANDED_ALTERNATING_DIAGNOLS',
  SIT_WALL = 'SIT_WALL',
  PUSH_UPS = 'PUSH_UPS',
  SIT_AND_REACH_T2 = 'SIT_AND_REACH_T2',
  SIT_UPS_T2 = 'SIT_UPS_T2',
  RANGE_OF_MOTION = 'RANGE_OF_MOTION',
  SIDE_FLAMINGO = 'SIDE_FLAMINGO'
}
