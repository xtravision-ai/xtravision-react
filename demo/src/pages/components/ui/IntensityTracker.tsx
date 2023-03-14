import { makeStyles } from '@material-ui/core';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  txt: {
    display: 'flex',
    color: '#FBFBFB',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '10px',
    fontSize: '15px',
    fontWeight: 'bold',
  },
  progressBar: {
    width: '25px',
    height: '64vh',
    borderRadius: 50,
    position: 'relative',
    overflow: 'hidden',
    [theme.breakpoints.down('md')]: {
      height: '60vh',
    }
  },
  progressBarChild: {
    width: '100%',
    height: '100%',
  },
  mask: {
    backgroundColor: '#1E1E1E',
    position: 'absolute',
    top: 0,
    right: 0,
    transition: `all 1s ease`,
    height: ({ val }: any) => `${100 - val}%`,
  },
  progress: {
    animationDirection: 'reverse',
    background: 'linear-gradient(to top, #FFC857 29.69%, #00B0FF 100%)',
  },
}));

export const IntensityTracker = ({ val }) => {
  const classes = useStyles({ val });
  return (
    <div className={classes.root}>
      <div className={classes.txt}>
        <div>Power</div>
        <div>Cardio</div>
        <div>Tone</div>
      </div>
      <div className={classes.progressBar}>
        <span
          style={{
            color: 'red',
            fontWeight: 'bold',
            borderRadius: 50,
            width: '100%',
            background: '#FEFEFE',
            boxShadow: '0px 0px 4px #FFB44F, 0px 0px 10px #18FFFF',
            display: 'list-item',
            padding: '2px',
            position: 'absolute',
            top: val < 2 ? '94%' : val >= 98 ? '0%' : `${97 - val}%`,
            zIndex: 999,
            transition: 'all 1s ease',
          }}
        ></span>
        <div className={clsx(classes.progressBarChild, classes.progress)}></div>
        <div className={clsx(classes.progressBarChild, classes.mask)}></div>
      </div>
    </div>
  );
};

export default IntensityTracker;
