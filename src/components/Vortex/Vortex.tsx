import React from 'react';
import { Box, Typography } from '@mui/material';
import { chartTheme, xtraZoneColor } from '../../styles/theme';
import { IVortex } from './Vortex.types';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  circularMeter: {
    position: 'relative',
    width: '100px',
    height: '100px',
  },
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
    padding: '5px',
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
}));

interface IVortexProps {
  vortex: IVortex;
}

const Vortex = ({ vortex }: IVortexProps) => {
  const classes = useStyles();
  if (!vortex?.firstCircle?.name) return <></>;

  const { firstCircle, secondCircle, thirdCircle, fourthCircle, circleUnit } =
    vortex;

  const ActivityZoneInfo = ({ name, value, color }) => (
    <div>
      <div className={classes.activityZoneCaption} style={{ color }}>
        {name}
      </div>
      <Box display="flex" alignItems="flex-end">
        <Typography variant="h6" style={{ color: 'white' }}>
          {Math.round(value)}
        </Typography>
        <div className={classes.activityZoneUnit}>{circleUnit}</div>
      </Box>
    </div>
  );

  const getDashArray = (dashFraction, dashConstant) => {
    const circleDasharray = `${(dashFraction * dashConstant).toFixed(0)} 283`;
    return circleDasharray;
  };

  const strokeOpacity = '40%';
  const strokeWidth = '10px';

  return (
    <div className={classes.activityProgressContainer}>
      <Box pr={4}>
        <ActivityZoneInfo
          name={firstCircle.name}
          value={firstCircle.value}
          color={chartTheme.green}
        />
        <ActivityZoneInfo
          name={secondCircle.name}
          value={secondCircle.value}
          color={xtraZoneColor.tone}
        />
        <ActivityZoneInfo
          name={thirdCircle.name}
          value={thirdCircle.value}
          color={xtraZoneColor.cardio}
        />
        <ActivityZoneInfo
          name={fourthCircle.name}
          value={fourthCircle.value}
          color={xtraZoneColor.power}
        />
      </Box>
      <Box>
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
                style={{ stroke: chartTheme.green, strokeWidth }}
                strokeOpacity={strokeOpacity}
              ></circle>
              <path
                id="base-timer-path-remaining1"
                strokeDasharray={getDashArray(firstCircle.dashFraction, 283)}
                className={classes.circularMeterSvgPathRemaining}
                style={{ stroke: chartTheme.green, strokeWidth }}
                d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0"
              ></path>

              <circle
                cx="50"
                cy="50"
                r="35"
                style={{ stroke: xtraZoneColor.tone, strokeWidth }}
                strokeOpacity={strokeOpacity}
              ></circle>
              <path
                id="base-timer-path-remaining2"
                strokeDasharray={getDashArray(secondCircle.dashFraction, 220)}
                className={classes.circularMeterSvgPathRemaining}
                style={{ stroke: xtraZoneColor.tone, strokeWidth }}
                d="M 50, 50 m -35, 0 a 35,35 0 1,0 70,0 a 35,35 0 1,0 -70,0"
              ></path>

              <circle
                cx="50"
                cy="50"
                r="25"
                style={{ stroke: xtraZoneColor.cardio, strokeWidth }}
                strokeOpacity={strokeOpacity}
              ></circle>
              <path
                id="base-timer-path-remaining2"
                strokeDasharray={getDashArray(thirdCircle.dashFraction, 160)}
                className={classes.circularMeterSvgPathRemaining}
                style={{ stroke: xtraZoneColor.cardio, strokeWidth }}
                d="M 50, 50 m -25, 0 a 25,25 0 1,0 50,0 a 25,25 0 1,0 -50,0"
              ></path>

              <circle
                cx="50"
                cy="50"
                r="15"
                style={{ stroke: xtraZoneColor.power, strokeWidth }}
                strokeOpacity={strokeOpacity}
              ></circle>
              <path
                id="base-timer-path-remaining2"
                strokeDasharray={getDashArray(fourthCircle.dashFraction, 90)}
                className={classes.circularMeterSvgPathRemaining}
                style={{ stroke: xtraZoneColor.power, strokeWidth }}
                d="M 50, 50 m -15, 0 a 15,15 0 1,0 30,0 a 15,15 0 1,0 -30,0"
              ></path>
            </g>
          </svg>
        </div>
      </Box>
    </div>
  );
};

export default Vortex;
