import React from 'react';
import clsx from 'clsx';
import { PowerIntensityProps } from './PowerIntensityMeter.types';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { xtraZoneColor } from '../../styles/theme';

const ActivityRange = Object.freeze({
  BelowAverage: {
    value: 35,
    color: xtraZoneColor.tone,
    name: 'Tone',
    calBurnedFactor: 0.7,
  },
  Average: {
    value: 75,
    color: xtraZoneColor.cardio,
    name: 'Cardio',
    calBurnedFactor: 1,
  },
  Good: {
    value: 75,
    color: xtraZoneColor.power,
    name: 'Power',
    calBurnedFactor: 1.3,
  },
});

const usePowerIntensityMeterStyles = makeStyles(() => ({
  powerIntensityBox: {
    width: '500px',
    height: '15px',
    marginTop: '10px',
    marginRight: '20px',
  },
  progressBarContainer: {
    width: '100%',
    height: ({ thickness = 4 }: any) => thickness,
    borderRadius: 2,
    position: 'relative',
    overflow: 'hidden',
  },
  progressBarChild: {
    width: '100%',
    height: '100%',
  },
  mask: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    right: 0,
    transition: `all 1s ease`,
    width: ({ power }: any) => `${100 - power}%`,
  },
  progress: {
    color: 'white',
    textAlign: 'center',
    lineHeight: 75,
    fontSize: 35,
    fontFamily: 'Segoe UI',
    animationDirection: 'reverse',
    backgroundColor: ({ power }: any) =>
      power <= ActivityRange.BelowAverage.value
        ? ActivityRange.BelowAverage.color
        : power <= ActivityRange.Average.value
        ? ActivityRange.Average.color
        : ActivityRange.Good.color,
  },
}));

const PowerIntensityMeter = ({
  power,
  variant = 'large',
}: PowerIntensityProps) => {
  let thickness = 0;
  if (!variant || variant === 'small') thickness = 4;
  else if (variant === 'large') thickness = 16;

  const classes = usePowerIntensityMeterStyles({ thickness, power });

  return (
    <Box display="flex">
      <Box className={classes.powerIntensityBox}>
        <div className={classes.progressBarContainer}>
          <div className={clsx(classes.progressBarChild, classes.progress)} />
          <div className={clsx(classes.progressBarChild, classes.mask)} />
        </div>
      </Box>
    </Box>
  );
};

export default PowerIntensityMeter;
