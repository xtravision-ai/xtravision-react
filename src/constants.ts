export enum Features {
  INTENSITY = 'INTENSITY', // 0 - 100
  CALORIES_BURNED = 'CALORIES_BURNED', // Kilo calories burned
  BODY_MUSCLE_GROUP = 'BODY_MUSCLE_GROUP', // Core, Upper body, Full Body, Legs & Glutes

  MUSCLE_GROUP_REPS_COUNT = 'MUSCLE_GROUP_REPS_COUNT', // Reps count per body muscle group (Cumulative for the class)

  YOGA_POSE_ALIGNMENT_SCORE = 'YOGA_POSE_ALIGNMENT_SCORE',
  YOGA_POSE_GROUP = 'YOGA_POSE_GROUP', // Mindfulness, Flexibility, Tone
  YOGA_TOTAL_POSES = 'YOGA_TOTAL_POSES',
}

export enum ClassCategory {
  YOGA = 'YOGA',
  STRENGTH = 'STRENGTH',
  HIIT = 'HIIT',
}
