import { makeStyles } from '@material-ui/core';
import React from 'react';
import Timer from './ui/Timer';

const useStyles = makeStyles((theme) => ({
  root: {},
  head: {
    width: '100%',
    justifyContent: 'center',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '50px',
    lineHeight: '120%',
    letterSpacing: '-0.0368em',
    color: '#FBFBFB',
    padding: '20px',
    [theme.breakpoints.down('md')]: {
      fontSize: '33px',
    },
  },
  body: {
    marginTop: '-10px',
  },
  cntrMsg: {
    color: '#FBFBFB',
    fontSize: '60px',
    fontWeight: 'bold',
    padding: '20px',
    marginTop: '30px',
    [theme.breakpoints.down('lg')]: {
      fontSize: '40px',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '30px',
    },
  },
  exerciseName: {
    width: '100%',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: '20%',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '80px',
    lineHeight: '120%',
    letterSpacing: '-0.0368em',
    color: '#FBFBFB',
    padding: '20px',
    [theme.breakpoints.down('lg')]: {
      fontSize: '40px',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '30px',
    },
  },
}));

const TimeUnderLoad = ({ timeLeft, restTimeLeft, prediction }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.body}>
        <div>
          <Timer val={timeLeft === 999 ? 60 : timeLeft} />
        </div>
        {/* <div>
          <PauseBtn onClick={onClick} />
        </div> */}
        {timeLeft !== 999 && (
          <div className={classes.cntrMsg}>
            Please go into the original position to get started!
          </div>
        )}
        {/* {restTimeLeft > 0 && !prediction && (
          <div className={classes.cntrMsg}>{`You've ${restTimeLeft} seconds to return to the pose!`}</div>
        )} */}
      </div>
    </div>
  );
};

export default TimeUnderLoad;
