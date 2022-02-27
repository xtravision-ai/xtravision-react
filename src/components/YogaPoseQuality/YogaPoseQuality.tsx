import React from 'react';
import { YogaPoseQualityProps } from './YogaPoseQuality.types';
import { makeStyles } from '@mui/styles';
import { xtraZoneColor } from '../../styles/theme';

const YogaPoseEfficiency = Object.freeze({
  Beginner: {
    value: 20,
    color: xtraZoneColor.tone,
    name: 'Beginner',
  },
  Intermediate: {
    value: 40,
    color: xtraZoneColor.cardio,
    name: 'Intermediate',
  },
  Advanced: {
    value: 40,
    color: xtraZoneColor.power,
    name: 'Advanced',
  },
});

const useStyles = makeStyles(() => ({
  circularMeterSvg: {
    borderRadius: '90px',
    backgroundColor: 'black',
    transform: 'scaleX(-1)',
  },
  circularMeterSvgCircle: {
    fill: 'none',
    stroke: 'none',
  },
  circularMeterSvgPathElapsed: {
    strokeWidth: '6px',
  },
  circularMeterSvgPathRemaining: {
    strokeWidth: '6px',
    strokeLinecap: 'round',
    transform: 'rotate(90deg)',
    transformOrigin: 'center',
    transition: '1s linear all',
    fillRule: 'evenodd',
  },
  circularMeterLabel: {
    position: 'absolute',
    width: '100px',
    height: '100px',
    top: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    color: 'white',
    fontWeight: 'bold',
  },
  activityProgressContainer: {
    padding: '10px',
    backgroundColor: '#000',
    opacity: 0.9,
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
  },
  activityZoneCaption: {
    color: 'white',
    fontSize: '16px',
  },
  activityZoneUnit: {
    color: 'white',
    fontSize: '12px',
    marginBottom: '3px',
    marginLeft: '7px',
  },
  cardioProgressMeter: {
    position: 'relative',
    width: '160px',
    height: '160px',
  },
  poseEffLabel: {
    position: 'absolute',
    // width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    color: 'white',
    fontWeight: 'bold',
    left: '75px',
    textAlign: 'center',
  },
}));

const YogaPoseQuality = ({ yogaScore }: YogaPoseQualityProps) => {
  const classes = useStyles();

  const FULL_DASH_ARRAY = 283;

  const getDashArray = (val: number) => {
    const rawTimeFraction = (val === 0 ? 1 : val) / 100;
    const timeFraction = rawTimeFraction - (1 / 100) * (1 - rawTimeFraction);
    const circleDasharray = `${(timeFraction * FULL_DASH_ARRAY).toFixed(
      0
    )} 283`;
    return circleDasharray;
  };

  const strokeOpacity = '40%';
  const strokeWidth = '10px';

  const strokeColor =
    yogaScore <= YogaPoseEfficiency.Beginner.value
      ? YogaPoseEfficiency.Beginner.color
      : yogaScore <= YogaPoseEfficiency.Intermediate.value
      ? YogaPoseEfficiency.Intermediate.color
      : YogaPoseEfficiency.Advanced.color;

  return (
    <div className={classes.activityProgressContainer}>
      <div className={classes.cardioProgressMeter}>
        <svg
          className={classes.circularMeterSvg}
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className={classes.circularMeterSvgCircle}>
            <circle
              cx="50"
              cy="50"
              r="45"
              style={{ stroke: strokeColor, strokeWidth }}
              strokeOpacity={strokeOpacity}
            ></circle>
            <path
              id="base-timer-path-remaining1"
              strokeDasharray={getDashArray(yogaScore)}
              className={classes.circularMeterSvgPathRemaining}
              style={{ stroke: strokeColor, strokeWidth }}
              d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0"
            ></path>
          </g>
        </svg>
      </div>
      <span id="base-timer-label" className={classes.poseEffLabel}>
        Pose
        <br />
        Efficiency
      </span>
    </div>
  );
};

export default YogaPoseQuality;
