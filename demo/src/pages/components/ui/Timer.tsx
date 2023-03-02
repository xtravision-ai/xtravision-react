import React from 'react';
import { makeStyles } from '@material-ui/core';
import { CircularProgressbar } from 'react-circular-progressbar';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    background: '#2C2F3A',
  },
  txt: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    color: '#FBFBFB',
    alignItems: 'center',
    marginTop: '120px',
  },
  txtSm: {
    display: 'flex',
    fontSize: '30px',
    fontWeight: 'bold',
    marginTop: '10px',
  },
  txtLg: {
    fontSize: '60px',
    fontWeight: 'bold',
    lineHeight: '30px',
  },
}));

const Timer = ({ val }) => {
  const classes = useStyles();

  const percent = ((60 - val) * 100) / 60; //60s

  return (
    <div className={classes.root}>
      <div className={classes.txt}>
        <div className={classes.txtLg}>{val}</div>
        <div className={classes.txtSm}>seconds</div>
      </div>
      <div style={{ height: '250px', width: '250px' }}>
        <svg style={{ height: 0 }}>
          <defs>
            <linearGradient id={'gradient'}>
              <stop offset="18.29%" stopColor="#00B0FF" />
              <stop offset="83.56%" stopColor="#FFC857" />
            </linearGradient>
          </defs>
        </svg>
        <CircularProgressbar
          strokeWidth={8}
          value={percent}
          styles={{
            path: { stroke: `url(#gradient)`, height: '100%' },
            trail: {
              stroke: '#1E1E1E',
            },
          }}
        />
      </div>
    </div>
  );
};

export default Timer;
